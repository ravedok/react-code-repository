import { Post } from "../models/Post";

export interface PostJson {
    id: number;
    userId: number;
    title: string;
    body: string;    
}

const itemsPerPage = 10;

export async function getPosts(page: number = 1) {


    const start = itemsPerPage * (page - 1);
    const limit = itemsPerPage * page;

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);

    const data: PostJson[] = await response.json();

    return data.map(post => Post.fromJson(post));    
}