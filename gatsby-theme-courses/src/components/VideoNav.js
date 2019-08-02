import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Nav = styled.nav`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

function VideoNav({ prev, next, className }) {
  return (
    <Nav className={className}>
      {prev ? (
        <Link to={prev.slug}>
          <span>← prev</span>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link to={next.slug}>
          <span>next →</span>
        </Link>
      )}
    </Nav>
  );
}

export default VideoNav;
