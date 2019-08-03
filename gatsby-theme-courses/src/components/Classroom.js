import React from 'react';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import Img from 'gatsby-image';
import VideoSelector from './VideoSelector';
import Note from './Note';
import LessonPlayer from './LessonPlayer';
import useLocalStorage from '../hooks/useLocalStorage';

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
  position: relative;
  margin-bottom: 1rem;
  ${({ theme }) => `
    ${theme.media.desktop} {
      margin-bottom:0;
    }
  `}
`;

function Classroom({ location, course, lesson, next, className }) {
  const [progess, setProgress] = useLocalStorage(
    'gatsby-theme-courses/progress',
    {}
  );
  const [autoplay] = useLocalStorage('gatsby-theme-courses/autoplay', false);

  function handleVideoEnd() {
    setProgress({ ...progess, [lesson.id]: true });
    if (next && autoplay) {
      navigate(next.slug);
    }
  }
  function renderContent() {
    if (lesson && lesson.youtubeId) {
      return <LessonPlayer lesson={lesson} onEnd={handleVideoEnd} />;
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
        <VideoSelector lessons={course.lessons} location={location} />
      </Main>
      <Note body={lesson && lesson.body ? lesson.body : course.body} />
    </Wrapper>
  );
}

export default Classroom;
