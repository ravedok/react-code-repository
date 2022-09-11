import React, { useRef } from "react";
import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #ccc;
  font-size: 1.2rem;
  border-radius: 1rem 0 0 1rem;
  padding: 0.25rem 0.5rem;
  flex: 1;
  max-width: calc(100vw - 8rem);
  &:focus-visible,
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #000;
  }
`;
const Button = styled.button`
  border: 1px solid #ccc;
  border-left: none;
  background: none;
  box-shadow: none;
  border-radius: 0px;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0 1rem 1rem 0;
`;
const Container = styled.div`
  margin: 0 1rem 1rem;
  align-self: center;
  display: flex;
  max-width: calc(100vw - 2rem);
`;

type SerchBoxProps = {
  onSearch: (query: string) => void;
};

export const SearchBox = ({ onSearch }: SerchBoxProps) => {
  let debounceTimer: ReturnType<typeof setTimeout>;

  const inputSearch = useRef(null);

  const handlerOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => onSearch(e.target.value), 400);
  };

  return (
    <Container>
      <Input ref={inputSearch} onChange={handlerOnInputChange} />
      <Button>buscar</Button>
    </Container>
  );
};
