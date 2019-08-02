import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Classroom from '../components/Classroom';

function LessonPage({ location, pageContext: { course }, data: { lesson } }) {
  return (
    <Layout>
      <SEO title={course.title} />
      <Classroom course={course} lesson={lesson} location={location} />
    </Layout>
  );
}

export default LessonPage;

export const pageQuery = graphql`
  query($id: String!) {
    lesson(id: { eq: $id }) {
      id
      body
      title
      duration
      youtubeId
    }
  }
`;
