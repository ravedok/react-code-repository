import { UserJson } from "../api/users";

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public website: string
  ) {}

  static fromJson(json: UserJson): User {
    const { id, name, email, website } = json;

    return new User(id, name, email, website);
  }
}
