import { apiUrl } from "../config";
import { User } from "../models/User";

export interface UserJson {
  id: number;
  name: string;
  email: string;
  website: string;
}

const cachedUsers: User[] = [];

export const getUser = async (id: number): Promise<User> => {
  const cachedUser = cachedUsers.find((user) => user.id === id);

  if (cachedUser !== undefined) {
    return cachedUser;
  }

  const response = await fetch(`${apiUrl}/users/${id}`);

  const data: UserJson = await response.json();

  const user = User.fromJson(data);

  cachedUsers.push(user);

  return user;
};
