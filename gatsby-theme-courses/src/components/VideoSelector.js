import React from 'react';
import styled from 'styled-components';
import VideoSelectorHeader from './VideoSelectorHeader';
import VideoNav from './VideoNav';
import VideoList from './VideoList';

const Selector = styled.div`
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ theme }) => `
    ${theme.media.desktop} {
      width: 380px;
    }
  `}
  p {
    margin: 0;
  }
`;

function VideoSelector({ className }) {
  return (
    <Selector className={className}>
      <VideoSelectorHeader />
      <VideoNav />
      <VideoList />
    </Selector>
  );
}

export default VideoSelector;
