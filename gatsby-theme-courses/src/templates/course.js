import React from "react"
import { graphql } from "gatsby"

import Classroom from "../components/Classroom"

export default ({
  location,
  data: { course }
}) => {
  return (
  <Classroom course={course} location={location}/>
)
}
export const pageQuery = graphql`
  query($id: String!) {
    course(id: { eq: $id }){
      id
      body
      title
      lastUpdated(formatString: "MMMM DD, YYYY")
      lessons {
        slug
        title
        duration
      }
      coverImage {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`