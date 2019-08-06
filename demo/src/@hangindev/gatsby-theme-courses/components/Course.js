import React from 'react';
import styled from 'styled-components';
import ThemeCourse from '@hangindev/gatsby-theme-courses/src/components/Course';
import { usePageValue } from '@hangindev/gatsby-theme-courses/src/context/PageContext';

const Message = styled.h1`
  position: absolute;
  top: 4.8rem;
  right: 2rem;
  max-width: 90%;
  margin: 0;
  font-size: 2.5rem;
  color: red;
  line-height: 1.2;
  transform: rotate(4deg);
  @media (max-width: 450px) {
    right: 1rem;
    font-size: 1.5rem;
  }
`;

function Course() {
  const { currentCourse } = usePageValue();
  return (
    <div>
      <ThemeCourse />
      {currentCourse.premium && (
        <Message>
          Protected Page Demo <br />
          Coming Soon!!
        </Message>
      )}
    </div>
  );
}

export default Course;
