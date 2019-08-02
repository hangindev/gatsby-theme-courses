<h1 align="center">
  A Gatsby course theme
</h1>

![hangindev gatsby-theme-courses](https://raw.githubusercontent.com/hangindev/gatsby-theme-courses/master/demo.jpg)

A Gatsby theme for creating a course platform, using Youtube as video host.

## Features

- Save learning progress

- Autoplay option

## Installation

```sh
npm install --save @hangindev/gatsby-theme-courses
```

## Usage

### Theme options

| Key           | Default value     | Description                                                                                               |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| `basePath`    | `/`               | Root url for all course courses                                                                           |
| `contentPath` | `content/courses` | Location of course courses                                                                                |
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

### Data layer

Courses are consisted of lessons and the relationships are represented by the folder structure. Every directory in the contentPath represent a course.

Course info (title, tags, cover image, description) and lesson info(title, youtubeId, note) are stored as `.mdx` file under the course directory.

See demo for the required metadata of the `.mdx` file.

#### Example course folder structure

```sh
content
  |
  └─courses
      |
      ├─bitcoin-and-cryptocurrency  # slug of course "Bitcoin and Cryptocurrency"
      │      index.mdx  # course info should be written in index.mdx
      │      01-intro.mdx  # other .mdx files will be interpreted as lessons
      │      02-how-bitcoin-achieves-decentralization.mdx
      │      03-mechanics-of-bitcoin.mdx
      │      04-how-to-store-and-use-bitcoins.mdx
      │      cover.jpg  # related course materials/images can be stored in the same directory
      │
      └─how-to-start-a-startup
              index.mdx
              01-how-to-start-a-startup.mdx
              02-team.mdx
              cover.jpg
```

### Override theme

This theme used `styled-components`. You can override the theme settings in `src/styled` folder or directly override the components in `src/components` folder.

### Additional configuration

In addition to the theme options, there are a handful of items you can customize via the `siteMetadata` object in your site's `gatsby-config.js` for SEO.

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `My course Title`,
    author: `My Name`,
    description: `My site description...`,
    social: [
      {
        name: `GitHub`,
        url: `https://github.com/hangindev`
      }
    ]
  }
};
```

### Roadmap

[ ] Read Youtube video duration with API

[ ] Restriced access
