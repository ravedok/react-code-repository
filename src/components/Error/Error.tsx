import React from "react";
import styled from "styled-components";

type ErrorProps = {
  message: string;
};

const Container = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.brand};
  margin: 1rem auto;
`;

export const ErrorMessage = ({ message }: ErrorProps) => {
  return <Container>{message}</Container>;
};
