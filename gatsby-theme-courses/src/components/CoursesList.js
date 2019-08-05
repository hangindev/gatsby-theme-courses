import React from 'react';
import styled from 'styled-components';
import CoursePreview from './CoursePreview';
import { usePageValue } from '../context/PageContext';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function CoursesList({ className }) {
  const { courses } = usePageValue();
  if (!courses || courses.length === 0) return <p>No courses.</p>;
  return (
    <List className={className}>
      {courses.map(course => (
        <CoursePreview key={course.id} {...course} />
      ))}
    </List>
  );
}
export default CoursesList;
