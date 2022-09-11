import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PaginatedResult } from "../../api/PaginatedResult";
import { getPosts } from "../../api/posts";
import { Post } from "../../models/Post";
import { Loading } from "../Loading/Loading";
import { Paginator } from "../Paginator/Paginator";
import { SearchBox } from "../SearchBox/SearchBox";
import { PostListItem } from "./PostListItem";

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  row-gap: 1rem;
  column-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
`;

const NoData = styled.div`
  padding: 2rem;
  font-size: 2rem;
  text-align: center;
`;

const Container = styled.section`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PostList = () => {
  const [posts, setPosts] = useState<PaginatedResult<Post>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    setLoading(true);
    getPosts(page, query).then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, [query, page]);

  return (
    <Container>
      <SearchBox onSearch={handleSearchChange} />
      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {!loading && posts && posts.data.length > 0 && (
        <React.Fragment>
          <List>
            {posts.data.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </List>
          <Paginator {...posts} onChangePage={handlePageChange} />
        </React.Fragment>
      )}

      {!loading && posts?.data.length === 0 && (
        <NoData>We have not found post.</NoData>
      )}
    </Container>
  );
};
