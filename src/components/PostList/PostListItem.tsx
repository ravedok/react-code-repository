import React from 'react';
import styled from 'styled-components';
import { Post } from '../../models/Post';

type Props = {
    post: Post
}


const Title = styled.h4`
    
`;

const Body = styled.div``;

const Container = styled.li`
    list-style: none;
    border: 1px solid #CCC;
    padding: 1rem;
    /* 
    min-width: 10rem;
    max-width: 15rem;
    flex: 1; */
    /* grid-column-end: span 4; */

`

export const  PostListItem = ({ post }: Props)  =>  {

    return (
        <Container>
            <Title>{ post.title }</Title> 
            <Body>{ post.body }</Body>
        </Container>
    );
}
