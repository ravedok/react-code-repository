import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      brand: string;
      danger: string;
      black: string;
      dark: string;
      light: string;
    };

    shadows: {
      light: string;
    };
  }
}
