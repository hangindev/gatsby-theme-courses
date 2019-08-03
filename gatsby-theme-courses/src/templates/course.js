import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Classroom from '../components/Classroom';

function CoursePage({ location, data: { course } }) {
  return (
    <Layout>
      <SEO title={course.title} keywords={course.tags} />
      <Classroom course={course} location={location} />
    </Layout>
  );
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
