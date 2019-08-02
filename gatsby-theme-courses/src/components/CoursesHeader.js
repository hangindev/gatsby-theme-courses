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
        <li>📝 Use mdx file to store course & lesson information and notes.</li>
        <li>▶ Youtube as video host</li>
        <li>✔ Support autoplay</li>
        <li>✔ Save learning progress</li>
      </ul>
    </header>
  );
}

export default CoursesHeader;
