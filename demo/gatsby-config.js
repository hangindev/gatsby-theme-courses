module.exports = {
  plugins: [
    {
      resolve: `@hangindev/gatsby-theme-courses`,
      options: {
        contentPath: "content/courses",
        assetPath: "content/assets",
      },
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `My Course Title`,
    author: `Hangindev`,
    description: `My site description...`,
    social: [
      {
        name: `github`,
        url: `https://github.com/hangindev`,
      },
    ],
  },
}