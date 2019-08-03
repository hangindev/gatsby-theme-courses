import React from 'react';
import styled from 'styled-components';
import CoursePreview from './CoursePreview';
import useLocalStorage from '../hooks/useLocalStorage';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function CourseList({ courses }) {
  const [likes, setLikes] = useLocalStorage('gatsby-theme-courses/likes', {});

  const toggleLike = id => () => {
    const cloneLikes = { ...likes };
    if (cloneLikes[id]) {
      delete cloneLikes[id];
    } else {
      cloneLikes[id] = true;
    }
    setLikes(cloneLikes);
  };

  if (courses.length === 0) return <p>No courses.</p>;

  return (
    <List>
      {courses.map(({ node: course }) => (
        <CoursePreview
          key={course.id}
          {...course}
          toggleLike={toggleLike(course.id)}
          liked={likes[course.id]}
        />
      ))}
    </List>
  );
}
export default CourseList;
