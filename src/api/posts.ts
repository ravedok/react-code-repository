import { Post } from "../models/Post";
import { PaginatedResult } from "./PaginatedResult";

export interface PostJson {
    id: number;
    userId: number;
    title: string;
    body: string;    
}



const itemsPerPage = 12;

export async function getPosts(page: number = 1): Promise<PaginatedResult<Post>> {

    const start = itemsPerPage * (page - 1);
    const limit = itemsPerPage;

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);

    const totalItems = Number(response.headers.get('X-Total-Count'));
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const data: PostJson[] = await response.json();

    return {
        page: page,
        total: totalItems,
        totalPages,
        data: data.map(post => Post.fromJson(post))
    };
}