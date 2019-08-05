import React from 'react';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { usePageValue } from '../context/PageContext';

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.noteMaxWidth};
  margin: 0 auto;
`;

function ClassroomNote({ className }) {
  const { currentCourse, currentLesson } = usePageValue();
  const mdxBody =
    currentLesson && currentLesson.body
      ? currentLesson.body
      : currentCourse.body;
  return (
    <Wrapper className={className}>
      {mdxBody && <MDXRenderer>{mdxBody}</MDXRenderer>}
    </Wrapper>
  );
}

export default ClassroomNote;
