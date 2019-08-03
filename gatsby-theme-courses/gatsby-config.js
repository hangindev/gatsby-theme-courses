const config = options => {
  const { mdx = true } = options;
  return {
    siteMetadata: {
      title: `@hagnindev/gatsby-theme-courses`,
      author: `HanginDev`,
      description: `A Gatsby theme for building course platform. Use Youtube as video host.`,
      social: [
        {
          name: `GitHub`,
          url: `https://github.com/hangindev`,
        },
      ],
    },
    plugins: [
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1380,
                linkImagesToOriginal: false,
              },
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-numbered-footnotes` },
            { resolve: `gatsby-remark-smartypants` },
          ],
          remarkPlugins: [require(`remark-slug`)],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.contentPath || `content/courses`,
          name: options.contentPath || `content/courses`,
        },
      },
      `gatsby-plugin-styled-components`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-react-helmet`,
    ].filter(Boolean),
  };
};
module.exports = config;
// module.exports = config({});
