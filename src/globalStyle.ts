import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset};


    body {
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
    }

    h1 {
        font-size: 2rem;
        font-weight: 500;
    }

    h4 {
        font-size: 1.4rem;
        font-weight: 500;
    }
`;
