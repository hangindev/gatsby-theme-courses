import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import VideoSelector from './VideoSelector';
import Player from './Player';
import Note from './Note';

const Wrapper = styled.section`
  padding: 2rem 1rem;
  .title {
    margin-top: 0;
  }
  ${({ theme }) => `
    ${theme.media.desktop} {
      padding: 3rem 1rem;
    }
  `}
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `
    ${theme.media.desktop} {
      flex-direction: row;
    }
  `}
`;
const Screen = styled.div`
  flex: 1;
`;
function Classroom({ location, course, lesson, className }) {
  function renderContent() {
    if (lesson && lesson.youtubeId) {
      return <Player id={lesson.youtubeId} />;
    }
    if (course.coverImage) {
      return (
        <Img
          fluid={course.coverImage.childImageSharp.fluid}
          alt={lesson && lesson.title ? lesson.title : course.title}
        />
      );
    }
    return <div />;
  }

  return (
    <Wrapper className={className}>
      <Link to={course.slug}>
        <h3 className="title">{course.title}</h3>
      </Link>
      <Main>
        <Screen>{renderContent()}</Screen>
        <VideoSelector course={course} location={location} />
      </Main>
      <Note body={lesson && lesson.body ? lesson.body : course.body} />
    </Wrapper>
  );
}

export default Classroom;
