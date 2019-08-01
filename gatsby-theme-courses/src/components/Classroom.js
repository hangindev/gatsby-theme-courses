import React from "react"
import { css, Styled } from "theme-ui"
import Img from "gatsby-image"
import LessonControl from "./LessonControl"
import Player  from "./Player"
import Note  from "./Note"
import SEO from "./seo"

export default ({ location, course, lesson }) => {
  const title = lesson && lesson.title? lesson.title: course.title
  function renderContent() {
    if(lesson && lesson.youtubeId) {
      return <Player id={lesson.youtubeId} />
    }
    else if (course.coverImage) {
      return <Img fluid={course.coverImage.childImageSharp.fluid} alt={title}/>
    }
    return <div/>;
  }
  function renderBody() {
    const body = lesson && lesson.body? lesson.body: course.body
    return <Note title={title} body={body}></Note>
  }
  return (
  <Styled.root>
    <SEO title={title} />
    <main css={css({
        maxWidth: 1400,
        mx: `auto`
      })}>
      <section css={css({
        display: `flex`,
        mb: 3,
        px: 1,
        py: 1,
      })}>
      <div css={css({
        flex:1 ,
      })}>
        {renderContent()}
      </div>
        <LessonControl course={course} location={location}/>
      </section>
      <section>
        {renderBody()}
      </section>
    </main>
  </Styled.root>
)}
