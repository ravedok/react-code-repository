import { render, screen, waitFor } from "@testing-library/react";
import "jest-styled-components";
import TestRenderer from "react-test-renderer";
import { PostList } from "./PostList";
import postFixtures from "../../fixtures/posts.json";
import userFixtures from "../../fixtures/users.json";
import { NotFoundHttpError } from "../../api/HttpErrors";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styled/theme";
import { ErrorMessage } from "../Error/Error";
import { Loading } from "../Loading/Loading";

import * as PostRepository from "../../api/postRespository";
import { User } from "../../models/User";
import { Post } from "../../models/Post";

jest.mock("../../api/postRespository");

const user1 = User.fromJson(userFixtures[0]);
const user2 = User.fromJson(userFixtures[1]);

const posts = postFixtures.map((post) => {
  const currentUser = post.userId === 1 ? user1 : user2;
  return new Post(post.id, currentUser, post.title, post.body);
});

describe("Post List", () => {
  it("shoud include component text", async () => {
    (PostRepository.getPosts as jest.Mock).mockReturnValue(
      Promise.resolve({
        data: posts,
      })
    );
    render(
      <ThemeProvider theme={theme}>
        <PostList />
      </ThemeProvider>
    );
    expect(
      await screen.findByText(
        "Sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText("Leanne Graham")).toHaveLength(8);
    expect(screen.getAllByText("Ervin Howell")).toHaveLength(2);
  });

  it("shoud show error when network fail", async () => {
    (PostRepository.getPosts as jest.Mock).mockRejectedValue(
      new NotFoundHttpError()
    );

    const renderer = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <PostList />
      </ThemeProvider>
    );
    const instance = renderer.root;
    expect(await instance.findByType(Loading)).not.toBe(null);
    await waitFor(async () =>
      expect(await instance.findByType(ErrorMessage)).not.toBe(null)
    );
  });
});
