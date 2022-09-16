import { getPosts } from "./postRespository";
import postFixtures from "../fixtures/posts.json";
import userFixtures from "../fixtures/users.json";
import * as UserRepository from "./userRepository";
import { User } from "../models/User";

jest.mock("./userRepository");

const makeFetchResp = (data: unknown) =>
  Promise.resolve({
    headers: {
      get: () => 100,
    },
    ok: true,
    json: () => Promise.resolve(data),
  });

describe("Post Get Paginated Result Service", () => {
  it("should return result", async () => {
    global.fetch = jest.fn().mockReturnValueOnce(makeFetchResp(postFixtures));

    (UserRepository.getUser as jest.Mock).mockReturnValue(
      Promise.resolve(User.fromJson(userFixtures[0]))
    );

    const posts = await getPosts();

    expect(posts.data).toHaveLength(10);
  });
});
