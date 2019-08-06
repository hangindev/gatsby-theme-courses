import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import globalStyle from '../styled/globalStyle';
import typography from '../styled/typography';
import defaultTheme from '../styled/theme';
import Nav from './Nav';

const GlobalStyle = createGlobalStyle`
  ${typography.toString()}
  ${globalStyle}
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const Layout = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Nav />
      <Container>{children}</Container>
    </>
  </ThemeProvider>
);
Layout.propTypes = {
  theme: PropTypes.object,
};
Layout.defaultProps = {
  theme: defaultTheme,
};
export default Layout;
