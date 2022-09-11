import React from 'react';
import styled from 'styled-components';
import { Post } from '../../models/Post';

type Props = {
    post: Post
}

const Title = styled.h4`
    margin: .25rem 0;    
`;

const User = styled.div`
    display: flex;
    gap: .25rem;
`;

const UserEmail = styled.a``;
const UserWebsite = styled.a`
    &:before {
        content: '<';
    }
    
    &:after {
        content: '>';
    }

`;



const Body = styled.div`
    margin-top: 1rem;
`;

const Container = styled.li`
    list-style: none;
    border: 1px solid #CCC;
    padding: 1rem;    
`



export const  PostListItem = ({ post }: Props)  =>  {

    const {title, body, user} = post;
    const {name: userName, email: userEmail, website: userWebsite } = user;

    return (
        <Container>
            <Title>{ title }</Title> 
            <User>
                <UserEmail href={`mailto:${userEmail}`}>{userName}</UserEmail>
                <UserWebsite href={UserWebsite}>{userWebsite}</UserWebsite>
            </User>
            <Body>{ body }</Body>
        </Container>
    );
}
