import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import SEO from './SEO';
import CoursesList from './CoursesList';
import CoursesHeader from './CoursesHeader';
import CoursesFooter from './CoursesFooter';

const Wrapper = styled.div`
  padding: 0 1rem;
`;

function Courses() {
  return (
    <Layout>
      <SEO title="Courses" />
      <Wrapper>
        <CoursesHeader />
        <h3>Courses</h3>
        <CoursesList />
        <CoursesFooter />
      </Wrapper>
    </Layout>
  );
}
export default Courses;
