import React from "react";
import styled from "styled-components";
import { PaginatedResult } from "../../api/PaginatedResult";
import { Post } from "../../models/Post";
import { ErrorMessage } from "../Error/Error";
import { Loading } from "../Loading/Loading";
import { Paginator } from "../Paginator/Paginator";
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

const LoadingContainer = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type ListContainerProps = {
  posts: PaginatedResult<Post> | null;
  loading: boolean;
  errorMessage: string | null;
  handlePageChange: (page: number) => void;
};

export const PostListContainer = ({
  posts,
  loading,
  errorMessage,
  handlePageChange,
}: ListContainerProps) => {
  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (loading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  if (posts && posts.data.length > 0) {
    return (
      <React.Fragment>
        <List>
          {posts.data.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </List>
        <Paginator {...posts} onChangePage={handlePageChange} />
      </React.Fragment>
    );
  }

  return <NoData>We have not found post.</NoData>;
};
