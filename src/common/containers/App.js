import React from 'react';
import {ThemeProvider} from '../../hooks/useTheme'

export default function App({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
