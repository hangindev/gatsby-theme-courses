import React from "react"

import Layout from "./Layout"
import SEO from "./seo"
import CoursePreview from "./CoursePreview"

const Courses = ({ location, courses }) => (
  <Layout location={location}>
    <SEO title="Home" />
    <main>
      {courses.length===0 && <p>No courses.</p>}
      {courses.map(({ node }) => <CoursePreview key={node.id} {...node}/>)}
    </main>
  </Layout>
)


export default Courses
