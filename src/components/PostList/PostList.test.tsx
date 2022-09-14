import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { PostList } from "./PostList";
import postFixtures from "../../fixtures/posts.json";
import userFixtures from "../../fixtures/users.json";
import {
  NotFoundHttpError,
  NOT_FOUND_ERROR_MESSAGE,
} from "../../api/HttpErrors";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styled/theme";

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

    render(<PostList />);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(
      await screen.findByText(
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText("Leanne Graham")).toHaveLength(8);
    expect(screen.getAllByText("Ervin Howell")).toHaveLength(2);
  });

  it("shoud show error when network fail", async () => {
    global.fetch = jest.fn().mockRejectedValue(new NotFoundHttpError());

    render(
      <ThemeProvider theme={theme}>
        <PostList />
      </ThemeProvider>
    );

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(
      await screen.findByText(NOT_FOUND_ERROR_MESSAGE)
    ).toBeInTheDocument();
  });
});
