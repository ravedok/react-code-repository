import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { PaginatedResult } from "../../api/PaginatedResult";
import { getPosts } from "../../api/postRespository";
import { Post } from "../../models/Post";
import { SearchBox } from "../SearchBox/SearchBox";
import { ListContainerProps, PostListContainer } from "./PostListContainer";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 1rem auto;
`;

export const enum Status {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
}

export const PostList = () => {
  const [posts, setPosts] = useState<PaginatedResult<Post> | null>(null);
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    setStatus(Status.LOADING);
    getPosts(page, query)
      .then((posts) => {
        setPosts(posts);
      })
      .catch(() => setStatus(Status.ERROR));
  }, [query, page]);

  useLayoutEffect(() => {
    setStatus(Status.LOADED);
  }, [posts]);

  const listContainerProps: ListContainerProps = {
    posts,
    status,
    handlePageChange,
  };

  return (
    <Container>
      <SearchBox onSearch={handleSearchChange} />
      <PostListContainer {...listContainerProps} />
    </Container>
  );
};
