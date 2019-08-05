import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { usePageValue } from '../context/PageContext';

const Nav = styled.nav`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

function VideoNav({ className }) {
  const { previousLesson, nextLesson } = usePageValue();
  return (
    <Nav className={className}>
      {previousLesson ? (
        <Link to={previousLesson.slug}>
          <span>← prev</span>
        </Link>
      ) : (
        <div />
      )}
      {nextLesson && (
        <Link to={nextLesson.slug}>
          <span>next →</span>
        </Link>
      )}
    </Nav>
  );
}

export default VideoNav;
