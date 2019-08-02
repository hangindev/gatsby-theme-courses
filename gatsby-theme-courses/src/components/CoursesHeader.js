import React from 'react';

function CoursesHeader() {
  return (
    <header>
      {/* Override me */}
      <h4>Theme features</h4>
      <ul
        style={{
          listStyleType: 'none',
        }}
      >
        <li>
          <span role="img" aria-label="memo">
            📝
          </span>{' '}
          Use mdx file to store course & lesson information and notes.
        </li>
        <li>
          <span role="img" aria-label="play button">
            ▶
          </span>{' '}
          Youtube as video host
        </li>
        <li>
          <span role="img" aria-label="check mark">
            ✔
          </span>{' '}
          Support autoplay
        </li>
        <li>
          <span role="img" aria-label="check mark">
            ✔
          </span>{' '}
          Save learning progress
        </li>
      </ul>
    </header>
  );
}

export default CoursesHeader;
