import { Post } from "../models/Post";
import { getPaginatedResult } from "./getPaginatedResult";
import { PaginatedResult } from "./PaginatedResult";

export interface PostJson {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export async function getPosts(
  page: number = 1
): Promise<PaginatedResult<Post>> {
  return getPaginatedResult<Post, PostJson>("posts", Post.fromJson, page);
}
