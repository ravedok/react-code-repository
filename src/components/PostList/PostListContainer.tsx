import React from "react";
import styled from "styled-components";
import { PaginatedResult } from "../../api/PaginatedResult";
import { Post } from "../../models/Post";
import { ErrorMessage } from "../Error/Error";
import { Loading } from "../Loading/Loading";
import { Paginator } from "../Paginator/Paginator";
import { Status } from "./PostList";
import { PostListItem } from "./PostListItem";

const List = styled.ul`
  margin: 0 1rem;
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
  status: Status;
  handlePageChange: (page: number) => void;
};

export const PostListContainer = ({
  posts,
  status,
  handlePageChange,
}: ListContainerProps) => {
  if (status === Status.ERROR) {
    return <ErrorMessage message="There was an error getting the data." />;
  }

  if (status === Status.LOADING) {
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
