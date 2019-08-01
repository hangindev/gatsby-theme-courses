import React from "react"
import { graphql } from "gatsby"

import Classroom from "../components/Classroom"

export default ({
  location,
  pageContext: { course },
  data: { lesson }
}) => {
  return (
  <Classroom course={course} lesson={lesson} location={location}/>
)
}
export const pageQuery = graphql`
  query($id: String!) {
    lesson(id: { eq: $id }){
      id
      body
      title
      duration
      youtubeId
    }
  }
`