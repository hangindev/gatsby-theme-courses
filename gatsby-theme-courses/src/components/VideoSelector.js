import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import findIndex from 'lodash/findIndex';
import VideoNav from './VideoNav';
import VideoList from './VideoList';
import NowPlaying from './NowPlaying';

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
const ButtonText = styled.h6`
  margin: 0;
  background-color: ${({ theme }) => theme.colors.primary700};
  color: white;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 99px;
  padding: 0.2rem;
  line-height: 2;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 300ms;
  &:hover {
    opacity: 0.9;
  }
`;

function VideoSelector({ location, lessons, className }) {
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
      {nowPlaying && (
        <NowPlaying
          index={nowPlayingIndex}
          totalLength={lessons.length}
          title={nowPlaying.title}
        />
      )}
      {!nowPlaying && (
        <Link to={lessons[0].slug}>
          <ButtonText>Start Learning</ButtonText>
        </Link>
      )}
      <VideoNav prev={prev} next={next} />
      <VideoList lessons={lessons} />
    </Selector>
  );
}

export default VideoSelector;
