const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const crypto = require(`crypto`)
const Debug = require(`debug`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const debug = Debug(`gatsby-theme-blog`)

// These are customizable theme options we only need to check once
let basePath
let contentPath
let assetPath

// These templates are simply data-fetching wrappers that import components
const CourseTemplate = require.resolve(`./src/templates/course`)
const CoursesTemplate = require.resolve(`./src/templates/courses`)
const LessonTemplate = require.resolve(`./src/templates/lesson`)

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()

  basePath = themeOptions.basePath || `/`
  contentPath = themeOptions.contentPath || `content/courses`
  assetPath = themeOptions.assetPath || `content/assets`

  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, assetPath),
  ]

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}
exports.sourceNodes = async ({ getNodesByType, actions, schema }) => {
  const { createTypes } = actions
  createTypes(
    schema.buildObjectType({
      name: `Lesson`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        youtubeId: {
          type: `String`,
        },
        duration: {
          type: `Int`,
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`],
    })
  )
  createTypes(
    schema.buildObjectType({
      name: `Course`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        lastUpdated: { type: `Date`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 180,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
        lessons: {
          type: `[Lesson!]`,
          resolve: source => getNodesByType(`Lesson`)
            .filter(lesson => lesson.slug.startsWith(source.slug))
            .sort((a,b) => (a.slug > b.slug) ? 1 : ((b.slug > a.slug) ? -1 : 0))
        },
        coverImage: {
          type: `File`,
        },
      },
      interfaces: [`Node`],
    })
  )
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
        }
      }
      allCourse(
        sort: { fields: [lastUpdated, title], order: DESC }
      ) {
        edges {
          node {
            id 
            title
            slug
            lessons {
              id
              title
              slug
              duration
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create Courses and Course pages.
  const {
    allCourse,
    site: { siteMetadata },
  } = result.data
  const courses = allCourse.edges
  const { title: siteTitle } = siteMetadata

  // Create a page for each Course
  courses.forEach(({ node: course }, index) => {
    const previous = index === courses.length - 1 ? null : courses[index + 1]
    const next = index === 0 ? null : courses[index - 1]
    const { slug, lessons } = course
    createPage({
      path: slug,
      component: CourseTemplate,
      context: {
        ...course,
        siteTitle,
        previous,
        next,
      },
    })
    // Create a page for each Lesson
    lessons.forEach((lesson, index) => {
      const previous = index === lessons.length - 1 ? null : lessons[index + 1]
      const next = index === 0 ? null : lessons[index - 1]
      createPage({
        path: lesson.slug,
        component: LessonTemplate,
        context: {
          ...lesson, 
          course,
          siteTitle,
          previous,
          next,
        },
      })
    })
  })

  // // Create the Courses page
  createPage({
    path: basePath,
    component: CoursesTemplate,
    context: {
      siteTitle,
    },
  })
  
}

// Create fields for course slugs and source
// This will change with schema customization with work
exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // Make sure the source is contentPath
  if (source !== contentPath) {
    return
  }

  if (fileNode.name === `index`) {
    // create course node
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: contentPath,
    })
    const { title, tags, lastUpdated, coverImage } = node.frontmatter
    const fieldData = {
      title, 
      tags, 
      lastUpdated, 
      coverImage,
      slug,
    }
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Course`),
      parent: node.id,
      children: [],
      internal: {
        type: `Course`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Courses`,
      },
    })
    createParentChildLink({ parent: fileNode, child: node })
  } else {
    // create lesson node
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: contentPath,
    })
    const { title, youtubeId, duration } = node.frontmatter
    let videoDuration
    if(youtubeId && !duration) {
      // TODO: get video duration
      videoDuration = 1000
    }
    const fieldData = {
      title,
      duration: duration || videoDuration,
      youtubeId,
      slug,
    }
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Lesson`),
      parent: node.id,
      children: [],
      internal: {
        type: `Lesson`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Lessons`,
      },
    })
    createParentChildLink({ parent: fileNode, child: node })
  }
}
