import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/globalstyles';

import { UiProvider } from '../contexts/UiContext';

const theme: DefaultTheme = {
  colors: {
    primary: '#3D2A83',
    secondary: '#261275',
  },
  breakpoints: {
    mobile: '768px',
    desktop: '992px',
    large: '1200px',
    xl: '1500px'
  },
  sidebarWidth: '275px'
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UiProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </>
  );
}

