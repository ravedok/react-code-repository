import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 0;
  background: none;
  box-shadow: none;
  border-radius: 0px;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Page = styled(Button)<{ current: boolean }>`
  font-weight: ${({ current }) => (current ? "bold" : "normal")};
  @media (max-width: 480px) {
    display: none;
  }
`;

const Container = styled.div`
  align-self: center;
  margin: 1rem 0;
  display: flex;
`;

type PaginatorProps = {
  totalPages: number;
  page?: number;
  onChangePage: (page: number) => void;
};

type PagesProps = {
  pages: number;
  current: number;
  onChangePage: (page: number) => void;
};

export const Pages = ({ pages, current, onChangePage }: PagesProps) => {
  if (!pages) {
    return null;
  }

  return (
    <Container>
      {[...Array(pages)]
        .map((e, i) => i + 1)
        .map((page) => (
          <Page
            onClick={() => onChangePage(page)}
            key={page}
            current={page === current}
          >
            {page}
          </Page>
        ))}
    </Container>
  );
};

export const Paginator = ({
  totalPages,
  page = 1,
  onChangePage,
}: PaginatorProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Container>
      <Button disabled={page === 1} onClick={() => onChangePage(--page)}>
        Previous
      </Button>
      <Pages pages={totalPages} current={page} onChangePage={onChangePage} />
      <Button
        disabled={page === totalPages}
        onClick={() => onChangePage(++page)}
      >
        Next
      </Button>
    </Container>
  );
};
