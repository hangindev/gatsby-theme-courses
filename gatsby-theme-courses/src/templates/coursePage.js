import React from 'react';
import { graphql } from 'gatsby';
import Course from '../components/Course';
import { PageProvider } from '../context/PageContext';

function CoursePage({ location, data: { currentCourse } }) {
  return (
    <PageProvider value={{ location, currentCourse }}>
      <Course />
    </PageProvider>
  );
}

export default CoursePage;

export const pageQuery = graphql`
  query($id: String!) {
    currentCourse: course(id: { eq: $id }) {
      id
      tags
      body
      title
      slug
      premium
      lastUpdated(formatString: "MMMM DD, YYYY")
      lessons {
        id
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
