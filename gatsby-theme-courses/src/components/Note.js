import React from 'react';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.noteMaxWidth};
  margin: 0 auto;
`;

function Note({ body, className }) {
  return (
    <Wrapper className={className}>
      <MDXRenderer>{body}</MDXRenderer>
    </Wrapper>
  );
}

export default Note;
