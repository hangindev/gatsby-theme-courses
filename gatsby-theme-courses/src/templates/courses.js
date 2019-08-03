import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import CourseList from '../components/CourseList';
import CoursesHeader from '../components/CoursesHeader';
import CoursesFooter from '../components/CoursesFooter';

const Wrapper = styled.div`
  padding: 0 1rem;
`;

function CoursesPage({ location, data: { allCourse } }) {
  const courses = allCourse.edges;
  return (
    <Layout location={location}>
      <SEO title="Courses" />
      <Wrapper>
        <CoursesHeader />
        <h3>Courses</h3>
        <CourseList courses={courses} />
        <CoursesFooter />
      </Wrapper>
    </Layout>
  );
}
export default CoursesPage;

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
          tags
          restricted
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
