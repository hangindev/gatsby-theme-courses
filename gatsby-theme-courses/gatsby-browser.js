import React, { useEffect } from 'react';
import { AppProvider, useAppValue } from './src/context/AppContext';

function Container({ children }) {
  const [_, dispatch] = useAppValue();
  useEffect(() => {
    dispatch({
      type: 'init',
    });
  }, [dispatch]);
  return <>{children}</>;
}

// React Context in Browser
export const wrapRootElement = ({ element }) => (
  <AppProvider>
    <Container>{element}</Container>
  </AppProvider>
);
