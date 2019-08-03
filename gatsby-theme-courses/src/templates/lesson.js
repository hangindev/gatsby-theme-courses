import React from 'react';
import { graphql } from 'gatsby';
import Lesson from '../components/Lesson';

function LessonPage({
  location,
  pageContext: { course, nextLesson },
  data: { currentLesson },
}) {
  return (
    <Lesson
      location={location}
      course={course}
      currentLesson={currentLesson}
      nextLesson={nextLesson}
    />
  );
}

export default LessonPage;

export const pageQuery = graphql`
  query($id: String!) {
    currentLesson: lesson(id: { eq: $id }) {
      id
      body
      title
      duration
      youtubeId
    }
  }
`;
