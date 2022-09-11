import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts } from "../../api/posts";
import { Post } from "../../models/Post";
import { PostListItem } from "./PostListItem";

const Container = styled.ul`
    padding: 1rem;
    margin: 1rem;

    display: grid;
    row-gap: 1rem ;
    column-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

export const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts().then(setPosts);
    }, [])

    return (    
        <section>
            <Container>
                {posts.map(post => <PostListItem key={ post.id } post={post} />)}
            </Container>
        </section>
    )
};