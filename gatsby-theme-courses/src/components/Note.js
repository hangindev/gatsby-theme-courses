import React from "react"
import { Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({ title, body }) => (
  <div>
    <Styled.h3>{title}</Styled.h3>
    <MDXRenderer>{body}</MDXRenderer>
  </div>
)