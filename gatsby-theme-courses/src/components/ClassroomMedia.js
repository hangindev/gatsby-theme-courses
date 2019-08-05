import React from 'react';
import Img from 'gatsby-image';
import { navigate } from 'gatsby';
import YoutubePlayer from './YoutubePlayer';
import { useAppValue } from '../context/AppContext';
import { usePageValue } from '../context/PageContext';

function ClassroomMedia() {
  const [{ autoplay }, dispatch] = useAppValue();
  const { currentCourse, currentLesson, nextLesson } = usePageValue();

  function handleVideoEnd() {
    dispatch({
      type: 'addToWatched',
      id: currentLesson.id,
    });
    if (nextLesson && autoplay) {
      navigate(nextLesson.slug);
    }
  }

  if (currentLesson && currentLesson.youtubeId) {
    return (
      <YoutubePlayer
        autoplay={autoplay}
        id={currentLesson.youtubeId}
        onEnd={handleVideoEnd}
      />
    );
  }

  if (currentCourse.coverImage) {
    return (
      <Img
        fluid={currentCourse.coverImage.childImageSharp.fluid}
        alt={
          currentLesson && currentLesson.title
            ? currentLesson.title
            : currentCourse.title
        }
      />
    );
  }

  return <div />;
}

export default ClassroomMedia;
