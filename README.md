<h1 align="center">
  The Gatsby course theme
</h1>

A Gatsby theme for creating a course platform, using Youtube as video host.

Courses are consisted of lessons and are represented in the folder structure(see demo). Every directory in the contentPath represent a course. Course info(title, tags, description) and lesson info(title, youtubeId, note) are stored as `.mdx` file under the course directory.

Authenication logic can be add to the `Classroom` component to separte restricted access materials.

## Installation

### Use the course theme starter

This will generate a new site that pre-configures use of the course theme.

### Manually add to your site

```sh
npm install --save @hangindev/gatsby-theme-courses
```

## Usage

### Theme options

| Key           | Default value     | Description                                                                                               |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| `basePath`    | `/`               | Root url for all course courses                                                                           |
| `contentPath` | `content/courses` | Location of course courses                                                                                |
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
