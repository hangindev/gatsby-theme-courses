import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Lesson from '../components/Lesson';
import { PageProvider } from '../context/PageContext';

function LessonPage({
  location,
  pageContext: { currentCourse, previousLesson, nextLesson },
  data: { currentLesson },
}) {
  return (
    <PageProvider
      value={{
        location,
        currentCourse,
        currentLesson,
        previousLesson,
        nextLesson,
      }}
    >
      <Lesson />
    </PageProvider>
  );
}

LessonPage.propTypes = {
  pageContext: PropTypes.shape({
    currentCourse: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string,
      premium: PropTypes.string,
      lessons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          slug: PropTypes.string,
          duration: PropTypes.number,
        })
      ),
    }).isRequired,
    previousLesson: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string,
      duration: PropTypes.number,
    }),
    nextLesson: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string,
      duration: PropTypes.number,
    }),
  }),
  data: PropTypes.shape({
    currentLesson: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
      duration: PropTypes.number,
      youtubeId: PropTypes.string,
      premium: PropTypes.string,
    }),
  }),
};
export default LessonPage;

export const pageQuery = graphql`
  query($id: String!) {
    currentLesson: lesson(id: { eq: $id }) {
      id
      body
      title
      duration
      youtubeId
      premium
    }
  }
`;
