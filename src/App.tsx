import React from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { PostList } from "./components/PostList/PostList";
import { GlobalStyle } from "./styled/globalStyle";
import { theme } from "./styled/theme";

export const Title = styled.h1`
  text-align: center;
  margin: 1rem 0;
  color: ${({ theme }) => theme.colors.brand};
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <header>
          <Title>Fake Blog</Title>
        </header>
        <PostList />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
