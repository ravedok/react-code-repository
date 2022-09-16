import { Post } from "../models/Post";
import { getPaginatedResult } from "./getPaginatedResult";
import { PaginatedResult } from "./PaginatedResult";
import { getUser } from "./userRepository";

export interface PostJson {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export async function getPosts(
  page: number = 1,
  query: string = ""
): Promise<PaginatedResult<Post>> {
  const mapJsonToPost = async (json: PostJson): Promise<Post> => {
    const { id, userId, title, body } = json;

    const user = await getUser(userId);

    return new Post(id, user, title, body);
  };

  return getPaginatedResult<Post, PostJson>(
    "posts",
    mapJsonToPost,
    page,
    query
  );
}
