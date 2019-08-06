const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const crypto = require(`crypto`);
const Debug = require(`debug`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const sortBy = require(`lodash/sortBy`);

const debug = Debug(`gatsby-theme-blog`);

// These are customizable theme options we only need to check once
let basePath;
let contentPath;

// These templates are simply data-fetching wrappers that import components
const CourseTemplate = require.resolve(`./src/templates/coursePage`);
const CoursesTemplate = require.resolve(`./src/templates/coursesPage`);
const LessonTemplate = require.resolve(`./src/templates/lessonPage`);

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();

  basePath = themeOptions.basePath || `/`;
  contentPath = themeOptions.contentPath || `content/courses`;

  const dirs = [path.join(program.directory, contentPath)];

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};
exports.sourceNodes = async ({ getNodesByType, actions, schema }) => {
  const { createTypes } = actions;
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
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`),
        },
        premium: {
          type: `String`,
          resolve: (source, args, context) => {
            const courses = context.nodeModel.getAllNodes({
              type: 'Course',
            });
            const courseSlug = `/${
              source.slug.split('/')[source.slug.split('/').length - 3]
            }/`;
            const course = courses.filter(c => c.slug === courseSlug)[0];
            return course.premium;
          },
        },
      },
      interfaces: [`Node`],
    })
  );
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
        premium: {
          type: `String`,
        },
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
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`),
        },
        lessons: {
          type: `[Lesson!]`,
          resolve: source =>
            sortBy(
              getNodesByType(`Lesson`).filter(lesson =>
                lesson.slug.startsWith(source.slug)
              ),
              ['slug']
            ),
        },
        coverImage: {
          type: `File`,
        },
      },
      interfaces: [`Node`],
    })
  );
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
        }
      }
      allCourse(sort: { fields: [lastUpdated, title], order: ASC }) {
        edges {
          node {
            id
            title
            slug
            premium
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
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // Create Courses and Course pages.
  const {
    allCourse,
    site: { siteMetadata },
  } = result.data;
  const courses = allCourse.edges;
  const { title: siteTitle } = siteMetadata;

  // Create a page for each Course
  courses.forEach(({ node: course }, i) => {
    const nextCourse = i === courses.length - 1 ? null : courses[i + 1];
    const previousCourse = i === 0 ? null : courses[i - 1];
    const { slug, lessons, premium } = course;
    createPage({
      path: slug,
      component: CourseTemplate,
      context: {
        id: course.id,
        course,
        previousCourse,
        nextCourse,
        premium,
      },
    });
    // Create a page for each Lesson
    lessons.forEach((lesson, j) => {
      const nextLesson = j === lessons.length - 1 ? null : lessons[j + 1];
      const previousLesson = j === 0 ? null : lessons[j - 1];
      const lessonPage = {
        path: lesson.slug,
        component: LessonTemplate,
        context: {
          id: lesson.id,
          lesson,
          currentCourse: course,
          previousLesson,
          nextLesson,
          premium,
        },
      };
      createPage(lessonPage);
    });
  });

  // // Create the Courses page
  createPage({
    path: basePath,
    component: CoursesTemplate,
    context: {
      siteTitle,
    },
  });
};

// Create fields for course slugs and source
// This will change with schema customization with work
exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions;

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  // Make sure the source is contentPath
  if (source !== contentPath) {
    return;
  }

  if (fileNode.name === `index`) {
    // create course node
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: contentPath,
    });
    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags,
      lastUpdated: node.frontmatter.lastUpdated,
      coverImage: node.frontmatter.coverImage,
      premium: node.frontmatter.premium,
      slug,
    };
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
    });
    createParentChildLink({ parent: fileNode, child: node });
  } else {
    // create lesson node
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: contentPath,
    });
    const { title, youtubeId, duration } = node.frontmatter;
    let videoDuration;
    if (youtubeId && !duration) {
      // TODO: get video duration
      videoDuration = 1000;
    }
    const fieldData = {
      title,
      duration: duration || videoDuration,
      youtubeId,
      slug,
    };
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
    });
    createParentChildLink({ parent: fileNode, child: node });
  }
};
