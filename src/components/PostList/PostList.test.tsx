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

describe("Post List", () => {
  it("shoud include component text", async () => {
    const makeFetchResp = (data: unknown) =>
      Promise.resolve({
        headers: {
          get: () => 100,
        },
        ok: true,
        json: () => Promise.resolve(data),
      });

    global.fetch = jest
      .fn()
      .mockReturnValueOnce(makeFetchResp(postFixtures))
      .mockReturnValueOnce(makeFetchResp(userFixtures[0]))
      .mockReturnValueOnce(makeFetchResp(userFixtures[1]));

    render(
      <ThemeProvider theme={theme}>
        <PostList />
      </ThemeProvider>
    );

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(
      await screen.findByText(
        "Sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText("Leanne Graham")).toHaveLength(8);
    expect(screen.getAllByText("Ervin Howell")).toHaveLength(2);
  });

  it("shoud show error when network fail", async () => {
    global.fetch = jest.fn().mockRejectedValue(new NotFoundHttpError());

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

  it("shoud show not error when network fail", async () => {
    global.fetch = jest.fn().mockRejectedValue(new NotFoundHttpError());

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
