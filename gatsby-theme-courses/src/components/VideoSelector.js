import React from 'react';
import styled from 'styled-components';
import findIndex from 'lodash/findIndex';
import VideoNav from './VideoNav';
import VideoList from './VideoList';

const Selector = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  ${({ theme }) => `
    ${theme.media.desktop} {
      width: 380px;
    }
  `}
  p {
    margin: 0;
  }
`;
const Header = styled.div`
  margin-bottom: 0.5rem;
  .title {
    margin: 0;
  }
`;

function VideoSelector({ location, course: { title, lessons }, className }) {
  let nowPlaying;
  let prev;
  let next;
  const nowPlayingIndex = findIndex(lessons, ['slug', location.pathname]);
  if (nowPlayingIndex !== -1) {
    nowPlaying = lessons[nowPlayingIndex];
    if (nowPlayingIndex > 0) {
      prev = lessons[nowPlayingIndex - 1];
    }
    if (nowPlayingIndex < lessons.length - 1) {
      next = lessons[nowPlayingIndex + 1];
    }
  }
  return (
    <Selector className={className}>
      <Header>
        {nowPlaying && (
          <>
            <small>
              Now playing {nowPlayingIndex + 1}/{lessons.length}
            </small>
            <h3 className="title">{nowPlaying.title}</h3>
          </>
        )}
        {!nowPlaying && <h3 className="title">{title}</h3>}
      </Header>
      <VideoNav prev={prev} next={next} />
      <VideoList lessons={lessons} />
    </Selector>
  );
}

export default VideoSelector;
