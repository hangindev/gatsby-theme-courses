import React from 'react';
import { graphql } from 'gatsby';
import Course from '../components/Course';

function CoursePage({ location, data: { course } }) {
  return <Course location={location} course={course} />;
}

export default CoursePage;

export const pageQuery = graphql`
  query($id: String!) {
    course(id: { eq: $id }) {
      id
      tags
      body
      title
      slug
      restricted
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
`;
