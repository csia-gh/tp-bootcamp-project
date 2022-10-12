import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    },
    breakpoints: {
      mobile: string;
      desktop: string;
      large: string;
      xl: string;
    };
    sidebarWidth: string;
  }
}
