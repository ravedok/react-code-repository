import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { theme } from "../../styled/theme";
import { MagnifyngGlassIcon } from "./MagnifyingGlassIncon";
import { TimesIcon } from "./TimesIcon";

const Input = styled.input`
  border: 0;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  flex: 1;
  max-width: calc(100vw - 8rem);
  &:focus-visible,
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: ${({ theme }) => theme.colors.black};
  }
`;
const SearchButton = styled.button`
  border: 0;
  background: none;
  box-shadow: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

const Container = styled.div<{ focus: boolean }>`
  margin: 0 1rem 1rem;
  align-self: center;
  display: flex;
  max-width: calc(100vw - 2rem);
  box-shadow: ${({ focus, theme }) =>
    focus ? `${rgba(theme.colors.brand, 0.15)} 0px 0px 0px 4px;` : "none"};
  border: 1px solid ${({ theme }) => theme.colors.black};

  border-color: ${({ focus, theme }) =>
    focus ? "transparent" : theme.colors.dark};

  border-radius: 0.5rem;
  padding: 0.25rem;
`;

type SerchBoxProps = {
  onSearch: (query: string) => void;
};

export const SearchBox = ({ onSearch }: SerchBoxProps) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const inputSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [onSearch, query]);

  const handlerSearchButtonClick = () => {
    inputSearch.current?.focus();
    setQuery("");
  };

  const iconColor = focus ? theme.colors.brand : theme.colors.black;
  const showErase = query ? true : false;

  return (
    <Container focus={focus}>
      <Input
        ref={inputSearch}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <SearchButton onClick={handlerSearchButtonClick}>
        {!showErase && <MagnifyngGlassIcon color={iconColor} />}
        {showErase && <TimesIcon color={iconColor} />}
      </SearchButton>
    </Container>
  );
};
