import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { AppProvider } from './src/context/AppContext';

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const sheet = new ServerStyleSheet();
  const app = () => (
    <AppProvider>
      <StyleSheetManager sheet={sheet.instance}>
        {bodyComponent}
      </StyleSheetManager>
    </AppProvider>
  );
  replaceBodyHTMLString(renderToString(<app />));
  setHeadComponents([sheet.getStyleElement()]);
};
