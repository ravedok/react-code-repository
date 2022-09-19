import React from "react";
import styled from "styled-components";
import { Post } from "../../models/Post";
import { ErrorMessage } from "../Error/Error";
import { Loading } from "../Loading/Loading";
import { Paginator } from "../Paginator/Paginator";
import { PostCard } from "../PostCard/PostCard";
import { FetchState } from "../../machines/fetch";

const List = styled.ul`
  margin: 0 1rem;
  padding: 0;
  display: grid;
  row-gap: 1rem;
  column-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
`;

const Item = styled.li`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: stretch;
`;

const NoData = styled.div`
  padding: 2rem;
  font-size: 2rem;
  text-align: center;
`;

const LoadingContainer = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type ListContainerProps = {
  fetchState: FetchState<Post>;
  handlePageChange: (page: number) => void;
};

export const PostListContainer = ({
  fetchState,
  handlePageChange,
}: ListContainerProps) => {
  if (fetchState.matches("failed")) {
    return <ErrorMessage message="There was an error getting the data." />;
  }

  if (fetchState.matches("pending")) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  const context = fetchState.context;
  const posts = context.data;

  if (posts.length > 0) {
    return (
      <React.Fragment>
        <List>
          {posts.map((post) => (
            <Item key={post.id}>
              <PostCard post={post} />
            </Item>
          ))}
        </List>
        <Paginator {...context} onChangePage={handlePageChange} />
      </React.Fragment>
    );
  }

  return <NoData>We have not found post.</NoData>;
};
