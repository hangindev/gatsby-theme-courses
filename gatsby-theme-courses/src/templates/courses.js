import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import CourseList from '../components/CourseList';
import CoursePreview from '../components/CoursePreview';
import CoursesHeader from '../components/CoursesHeader';
import CoursesFooter from '../components/CoursesFooter';

function CoursesPage({ location, data: { allCourse } }) {
  const courses = allCourse.edges;
  return (
    <Layout location={location}>
      <SEO title="Courses" />
      <CoursesHeader />
      <h3>Courses</h3>
      <CourseList>
        {courses.length === 0 && <p>No courses.</p>}
        {courses.map(({ node }) => (
          <CoursePreview key={node.id} {...node} />
        ))}
      </CourseList>
      <CoursesFooter />
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
