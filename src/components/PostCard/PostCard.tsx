import React from "react";
import styled, { css } from "styled-components";
import { Post } from "../../models/Post";
import { firstLetterUppercase } from "../../utils";

type Props = {
  post: Post;
};

const Title = styled.h4`
  margin: 0.25rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const User = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const sharedAnchor = css`
  font-size: 0.8rem;
`;

const UserEmail = styled.a`
  ${sharedAnchor}
`;
const UserWebsite = styled.a`
  ${sharedAnchor}
  &:before {
    content: "<";
  }

  &:after {
    content: ">";
  }
`;

const Body = styled.div`
  margin-top: 1rem;
`;

const Container = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

export const PostCard = ({ post }: Props) => {
  const { title, body, user } = post;
  const { name: userName, email: userEmail, website: userWebsite } = user;

  const emailHref = `mailto:${userEmail}`;

  return (
    <Container>
      <Title>{firstLetterUppercase(title)}</Title>
      <User>
        <UserEmail href={emailHref}>{userName}</UserEmail>
        <UserWebsite href={userWebsite}>{userWebsite}</UserWebsite>
      </User>
      <Body>{body}</Body>
    </Container>
  );
};
