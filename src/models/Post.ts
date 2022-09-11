import { User } from "./User";

export class Post {
  constructor(
    public id: number,
    public user: User,
    public title: string,
    public body: string
  ) {}
}
