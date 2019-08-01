import React from "react"
import {Link} from "gatsby"
import { css, Styled } from "theme-ui"

export default ({ course: { title, lessons } }) => (
  <div css={css({
    width: 500,
    px: 2,
    py: 2
  })}>
    <Styled.h3>{title}</Styled.h3>
    <ul>
      {lessons.map(lesson =>
        <li>
          <Link to={lesson.slug} key={lesson.slug} 
            activeStyle={{ fontWeight: "bold" }}>
            {lesson.title}
          </Link>
        </li>    
      )}
    </ul>
  </div>
)