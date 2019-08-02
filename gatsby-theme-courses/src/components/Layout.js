import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import globalStyle from '../styled/globalStyle';
import typography from '../styled/typography';
import theme from '../styled/theme';
import Nav from './Nav';

const GlobalStyle = createGlobalStyle`
  ${typography.toString()}
  ${globalStyle}
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Nav />
      <Container>{children}</Container>
    </>
  </ThemeProvider>
);

export default Layout;
