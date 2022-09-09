import React from 'react';
import styled from 'styled-components';
import './App.css';
import { CharacterList } from './components/CharacterList/CharacterList';

export const Title = styled.h1`
    text-align: center;
  `;

function App() {
  return (
    <div>
      <header>
        <Title>Game of Thrones</Title>
        <CharacterList />
      </header>
    </div>
  );
}

export default App;
