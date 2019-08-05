import React from 'react';
import { graphql } from 'gatsby';
import Courses from '../components/Courses';
import { PageProvider } from '../context/PageContext';

function CoursesPage({ location, data: { allCourse } }) {
  const courses = allCourse.edges.map(({ node }) => node);
  return (
    <PageProvider value={{ location, courses }}>
      <Courses />
    </PageProvider>
  );
}
export default CoursesPage;

export const pageQuery = graphql`
  query {
    allCourse(sort: { fields: [lastUpdated, title], order: DESC }, limit: 100) {
      edges {
        node {
          id
          excerpt
          slug
          title
          tags
          premium
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
`;
