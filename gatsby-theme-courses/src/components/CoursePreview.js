import React from "react"
import { Link, } from "gatsby"
import { css } from "theme-ui"
import Img from "gatsby-image"

import { durationInWords } from '../utils'

const CoursePreview = ({ title, slug, lastUpdated, excerpt, coverImage, lessons }) => {
  const totalDuration = durationInWords(lessons.reduce((pv,cv)=> pv+cv.duration,0))
  return (
    <Link
      to={slug}
      css={css({
        color: `text`,
        textDecoration: `none`,
      })}
    >
      <div
      css={css({
        display: `flex`,
        mb: 4,
      })}>
        <div
          css={css({
            minWidth: 300,
            height: 200,
            flex: 1,
            mr: 3
          })}
        >
          <Img 
            css={css({
              width: `100%`,
              height: `100%`
            })}
            fluid={coverImage.childImageSharp.fluid} alt={title}/>
        </div>
        <div>
          <h3
            css={css({
              color: `primary`,
              my: 1,
            })}
          >{title}</h3>
          <p
            css={css({
              my: 1,
            })}>{excerpt}</p>
          <small>
            <span css={css({ mr: 3})}>{lessons.length} lessons</span>
            <span css={css({ mr: 3})}>{totalDuration}</span>
            <span>Last updated: {lastUpdated}</span>
          </small>
        </div>
      </div>
    </Link>
  )
}

export default CoursePreview
