import React from 'react';
import { AppProvider } from './src/context/AppContext';

// React Context in Browser
export const wrapRootElement = ({ element }) => (
  <AppProvider>{element}</AppProvider>
);
