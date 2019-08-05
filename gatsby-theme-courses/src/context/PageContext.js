import React, { createContext, useContext } from 'react';

export const PageContext = createContext();

export const PageProvider = ({ value, children }) => (
  <PageContext.Provider value={value}>{children}</PageContext.Provider>
);

export const usePageValue = () => useContext(PageContext);
