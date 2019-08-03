import React from 'react';
import Layout from './Layout';
import SEO from './seo';
import Classroom from './Classroom';

function Course({ location, course }) {
  return (
    <Layout>
      <SEO title={course.title} keywords={course.tags} />
      <Classroom course={course} location={location} />
    </Layout>
  );
}

export default Course;
