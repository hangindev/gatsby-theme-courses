import React from "react"
import { Link } from "gatsby"
import { css, Styled } from "theme-ui"
import Bio from "./bio"

const rootPath = `${__PATH_PREFIX__}/`

const Title = ({ children }) => (
    <Styled.h3
      as="p"
      css={css({
        my: 0,
      })}
    >
      <Styled.a
        as={Link}
        css={css({
          boxShadow: `none`,
          textDecoration: `none`,
          color: `primary`,
        })}
        to={`/`}
      >
        {children}
      </Styled.a>
    </Styled.h3>
  )

export default ({ children, title, ...props }) => {
  return (
    <header>
      <div
        css={css({
          maxWidth: `container`,
          mx: `auto`,
          px: 3,
          pt: 4,
        })}
      >
        <div
          css={css({
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `baseline`,
            mb: 4,
          })}
        >
          <Title {...props}>{title}</Title>
          {children}
        </div>
        <Bio />
      </div>
    </header>
  )
}
