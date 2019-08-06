import React from 'react';
import { Helmet } from 'react-helmet';
import ThemeCourses from '@hangindev/gatsby-theme-courses/src/components/Courses';

function Courses() {
  return (
    <>
      <ThemeCourses />
      <Helmet>
        <meta
          name="og:image"
          content="https://res.cloudinary.com/hangindev/image/upload/v1565025388/gatsby-theme-courses/gatsby-theme-courses-og-image_dffe3e.jpg"
        />
      </Helmet>
    </>
  );
}

export default Courses;
