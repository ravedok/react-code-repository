import userFixtures from "../fixtures/users.json";
import { User } from "../models/User";
import { getUser } from "./userRepository";

const makeFetchResp = (data: unknown) =>
  Promise.resolve({
    headers: {
      get: () => 100,
    },
    ok: true,
    json: () => Promise.resolve(data),
  });

describe("Users Get Paginated Result Service", () => {
  it("should return result", async () => {
    const userJson = userFixtures[0];
    const expectedResult = User.fromJson(userJson);

    global.fetch = jest.fn().mockReturnValueOnce(makeFetchResp(userJson));

    const USER_ID = 1;

    const user = await getUser(USER_ID);

    const sameCachedUserUser = await getUser(USER_ID);

    expect(fetch).toBeCalledTimes(1);

    expect(user).toMatchObject(expectedResult);
    expect(sameCachedUserUser).toMatchObject(expectedResult);
  });
});
