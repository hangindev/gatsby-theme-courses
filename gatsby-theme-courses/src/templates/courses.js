import React from "react"

import Courses from "../components/Courses"

export default ({
  location, data: { allCourse }
}) => (
  <Courses location={location} courses={allCourse.edges} />
)

export const pageQuery = graphql`
  query {
    allCourse(
      sort: { fields: [lastUpdated, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          excerpt
          slug
          title
          lastUpdated(formatString: "MMMM DD, YYYY")
          lessons {
            id
            duration
          }
          coverImage {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`