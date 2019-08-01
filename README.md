<h1 align="center">
  The Gatsby course theme
</h1>

A Gatsby theme for creating a course platform.

## Installation

### Use the course theme starter

This will generate a new site that pre-configures use of the course theme.

### Manually add to your site

```sh
npm install --save gatsby-theme-courses
```

## Usage

### Theme options

| Key           | Default value     | Description                                                                                               |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| `basePath`    | `/`               | Root url for all course posts                                                                             |
| `contentPath` | `content/courses` | Location of course posts                                                                                  |
| `assetPath`   | `content/assets`  | Location of assets                                                                                        |
| `mdx`         | `true`            | Configure `gatsby-plugin-mdx` (if your website already is using the plugin pass `false` to turn this off) |

#### Example usage

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-course`,
      options: {
        basePath: `/courses`
      }
    }
  ]
};
```

### Additional configuration

In addition to the theme options, there are a handful of items you can customize via the `siteMetadata` object in your site's `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    // Used for the site title and SEO
    title: `My course Title`,
    // Used to provide alt text for your avatar
    author: `My Name`,
    // Used for SEO
    description: `My site description...`,
    // Used for social links in the root footer
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/gatsbyjs`
      },
      {
        name: `GitHub`,
        url: `https://github.com/gatsbyjs`
      }
    ]
  }
};
```
