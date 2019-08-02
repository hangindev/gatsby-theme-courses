import React from 'react';
import styled from 'styled-components';
import Youtube from 'react-youtube';
import useLocalStorage from '../hooks/useLocalStorage';

const Player = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
`;
const StyledYoutube = styled(Youtube)`
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
function LessonPlayer({ lesson, ...props }) {
  const [autoplay] = useLocalStorage('gatsby-theme-courses/autoplay', false);
  return (
    <Player>
      <StyledYoutube
        videoId={lesson.youtubeId}
        opts={{
          playerVars: { autoplay: autoplay ? 1 : 0 },
          width: '100%',
          height: '100%',
        }}
        {...props}
      />
    </Player>
  );
}

export default LessonPlayer;
