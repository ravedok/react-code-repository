import React from "react";
import styled from "styled-components";
import "./App.css";
import { PostList } from "./components/PostList/PostList";
import { GlobalStyle } from "./globalStyle";

export const Title = styled.h1`
  text-align: center;
  margin: 1rem 0;
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <header>
        <Title>Fake Blog</Title>
      </header>
      <PostList />
    </React.Fragment>
  );
}

export default App;
