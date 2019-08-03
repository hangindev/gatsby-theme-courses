import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  li {
    margin-bottom: 0.2rem;
    span {
      &:first-child {
        display: inline-block;
        width: 30px;
        text-align: center;
      }
    }
  }
`;

function CoursesHeader() {
  return (
    <header>
      {/* Override me */}
      <h4>Theme features</h4>
      <List>
        <li>
          <span role="img" aria-label="memo">
            📝
          </span>{' '}
          Use .mdx file to save course & lesson information and notes.
        </li>
        <li>
          <span role="img" aria-label="video Camera">
            📹
          </span>{' '}
          Youtube as video host
        </li>
        <li>
          <span role="img" aria-label="motorcycle">
            🏍️
          </span>{' '}
          Support autoplay
        </li>
        <li>
          <span role="img" aria-label="chart increasing">
            💹
          </span>{' '}
          Save learning progress
        </li>
        <li>
          <span role="img" aria-label="heart">
            💖
          </span>{' '}
          Bookmark courses
        </li>
      </List>
    </header>
  );
}

export default CoursesHeader;
