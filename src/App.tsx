import React from "react";
import styled from "styled-components";
import "./App.css";
import { PostList } from "./components/PostList/PostList";

export const Title = styled.h1`
  text-align: center;
`;

function App() {
  return (
    <div>
      <header>
        <Title>Fake Blog</Title>
      </header>
      <PostList />
    </div>
  );
}

export default App;
