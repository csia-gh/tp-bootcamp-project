import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/globalstyles';
import { Provider } from 'react-redux';

import store from '../store/store';

const theme: DefaultTheme = {
  colors: {
    primary: '#3D2A83',
    secondary: '#261275',
  },
  breakpoints: {
    mobile: '768px',
    desktop: '1100px',
    large: '1500px',
    xl: '1800px'
  },
  sidebarWidth: '275px'
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

