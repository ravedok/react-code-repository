import React, { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import styled from "styled-components";
import { getPosts } from "../../api/postRespository";
import { Post } from "../../models/Post";
import { SearchBox } from "../SearchBox/SearchBox";
import { ListContainerProps, PostListContainer } from "./PostListContainer";
import { fetchMachine } from "../../machines";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 1rem auto;
`;

export const PostList = () => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine<Post>, {
    actions: {
      fetchData: (ctx, event) => {
        getPosts(page, query)
          .then((res) => {
            sendToFetchMachine({ type: "RESOLVE", ...res });
          })
          .catch(() => {
            sendToFetchMachine({ type: "REJECT" });
          });
      },
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (value: string) => {
    if (query === value) {
      return;
    }

    setQuery(value);
  };

  useEffect(() => {
    sendToFetchMachine({ type: "FETCH" });
  }, [sendToFetchMachine, query, page]);

  const listContainerProps: ListContainerProps = {
    fetchState,
    handlePageChange,
  };

  return (
    <Container>
      <SearchBox onSearch={handleSearchChange} />
      <PostListContainer {...listContainerProps} />
    </Container>
  );
};
