import { PostJson } from "../api/posts";

export class Post {

    constructor(public id: number, public userId: number, public title: string, public body: string) {}


    static fromJson(json: PostJson): Post {

        const { id, userId, title, body  } = json;

        return new Post(id, userId, title, body);
    }
}