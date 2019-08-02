module.exports = {
  plugins: [
    {
      resolve: `@hangindev/gatsby-theme-courses`,
      options: {
        contentPath: "content/courses",
      },
    },
  ],
  siteMetadata: {
    title: `@hangindev/gatsby-theme-courses`,
    author: `Hangindev`,
    description: `Demo site of gatsby theme @hangindev/gatsby-theme-courses`,
    social: [
      {
        name: `github`,
        url: `https://github.com/hangindev`,
      },
    ],
  },
}