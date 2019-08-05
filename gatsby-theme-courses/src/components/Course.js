import React from 'react';
import Layout from './Layout';
import SEO from './SEO';
import Classroom from './Classroom';
import { usePageValue } from '../context/PageContext';

function Course() {
  const { currentCourse } = usePageValue();
  return (
    <Layout>
      <SEO title={currentCourse.title} keywords={currentCourse.tags} />
      <Classroom />
    </Layout>
  );
}

export default Course;
