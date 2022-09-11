import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PaginatedResult } from "../../api/PaginatedResult";
import { getPosts } from "../../api/posts";
import { Post } from "../../models/Post";
import { Loading } from "../Loading/Loading";
import { Paginator } from "../Paginator/Paginator";
import { PostListItem } from "./PostListItem";

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  row-gap: 1rem;
  column-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
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

  const loadData = (page: number = 1) => {
    setLoading(true);
    getPosts(page).then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  };

  const handlePageChange = (newPage: number) => {
    loadData(newPage);
  };

  useEffect(() => loadData(), []);

  return (
    <Container>
      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {!loading && posts && (
        <React.Fragment>
          <List>
            {posts.data.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </List>
          <Paginator {...posts} onChangePage={handlePageChange} />
        </React.Fragment>
      )}
    </Container>
  );
};
