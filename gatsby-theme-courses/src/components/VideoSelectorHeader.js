import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import findIndex from 'lodash/findIndex';
import NowPlaying from './NowPlaying';
import { usePageValue } from '../context/PageContext';

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

function VideoSelectorHeader({ className }) {
  const { location, currentCourse } = usePageValue();
  const { lessons } = currentCourse;
  let nowPlaying;
  const nowPlayingIndex = findIndex(lessons, ['slug', location.pathname]);
  if (nowPlayingIndex !== -1) {
    nowPlaying = lessons[nowPlayingIndex];
  }
  return (
    <div className={className}>
      {nowPlaying && (
        <NowPlaying
          index={nowPlayingIndex}
          totalLength={lessons.length}
          title={nowPlaying.title}
        />
      )}
      {!nowPlaying && lessons && lessons[0] && (
        <Link to={lessons[0].slug}>
          <ButtonText>Start Learning</ButtonText>
        </Link>
      )}
    </div>
  );
}

export default VideoSelectorHeader;
