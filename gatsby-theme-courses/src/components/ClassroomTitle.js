import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { usePageValue } from '../context/PageContext';

const TitleLink = styled(Link)`
  h3 {
    margin-top: 0;
  }
`;
function ClassroomTitle({ className }) {
  const { currentCourse } = usePageValue();
  return (
    <TitleLink to={currentCourse.slug}>
      <h3 className={className}>{currentCourse.title}</h3>
    </TitleLink>
  );
}

export default ClassroomTitle;
