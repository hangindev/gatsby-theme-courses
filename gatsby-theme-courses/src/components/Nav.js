import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';

const OuterWrapper = styled.div`
  background: ${({ theme }) => theme.colors.primary900};
`;
const Wrapper = styled.nav`
  padding: 0.5rem 0;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-betwee;
  align-items: center;
  color: white;
  .title {
    margin: 0;
    padding: 1rem;
    color: white;
  }
`;

function Nav({ children, className, ...props }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <OuterWrapper className={className}>
      <Wrapper>
        <div>
          <Link to="/">
            <h2 className="title">{site.siteMetadata.title}</h2>
          </Link>
        </div>
        <div></div>
      </Wrapper>
    </OuterWrapper>
  );
}

export default Nav;
