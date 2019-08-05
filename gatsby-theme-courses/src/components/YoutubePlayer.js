import React from 'react';
import styled from 'styled-components';
import Youtube from 'react-youtube';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: ${({ aspectRatio }) => `${100 / aspectRatio}%`};
`;
const StyledYoutube = styled(Youtube)`
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
function YoutubePlayer({ autoplay, className, id, aspectRatio, ...props }) {
  return (
    <Container aspectRatio={aspectRatio} className={className}>
      <StyledYoutube
        videoId={id}
        opts={{
          playerVars: { autoplay: autoplay ? 1 : 0 },
          width: '100%',
          height: '100%',
        }}
        {...props}
      />
    </Container>
  );
}
YoutubePlayer.propTypes = {
  id: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  aspectRatio: PropTypes.number,
};
YoutubePlayer.defaultProps = {
  autoplay: false,
  aspectRatio: 16 / 9,
};

export default YoutubePlayer;
