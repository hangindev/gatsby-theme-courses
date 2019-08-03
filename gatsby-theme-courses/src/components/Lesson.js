import React from 'react';
import Layout from './Layout';
import SEO from './seo';
import Classroom from './Classroom';

function Lesson({ location, course, currentLesson, nextLesson }) {
  return (
    <Layout>
      <SEO title={course.title} />
      <Classroom
        location={location}
        course={course}
        currentLesson={currentLesson}
        nextLesson={nextLesson}
      />
    </Layout>
  );
}

export default Lesson;
