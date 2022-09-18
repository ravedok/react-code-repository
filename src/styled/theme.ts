import { rgba } from "polished";
import { DefaultTheme } from "styled-components";

const black = "#000";

export const theme: DefaultTheme = {
  colors: {
    brand: "#6290C8",
    danger: "#dc3545",
    black,
    dark: "#ced4da",
    light: "#CCC",
  },
  shadows: {
    light: `${rgba(black, 0.12)} 0px 1px 3px, ${rgba(black, 0.24)} 0px 1px 2px`,
  },
};
