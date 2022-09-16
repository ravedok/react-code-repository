import React, { useEffect, useState } from "react";
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

export const PostList = () => {
  const [posts, setPosts] = useState<PaginatedResult<Post> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const handleError = (err: Error) => {
    setPosts(null);
    setErrorMessage(err.message);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);
    getPosts(page, query)
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  }, [query, page]);

  const listContainerProps: ListContainerProps = {
    posts,
    loading,
    errorMessage,
    handlePageChange,
  };

  return (
    <Container>
      <SearchBox onSearch={handleSearchChange} />
      <PostListContainer {...listContainerProps} />
    </Container>
  );
};
