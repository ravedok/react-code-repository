import React from "react";
import styled from "styled-components";


const Button = styled.button`
    border: 0;
    background: none;
    box-shadow: none;
    border-radius: 0px;
`;

const Page = styled(Button)<{ current: boolean }>`
    font-weight: ${({current}) => current ? 'bold' : 'normal'};
`

const Container = styled.div`
    align-self: center;
    margin: 1rem;
`;

type PaginatorProps = {
    totalPages: number;
    page?: number;
    onChangePage: (page: number) => void;
}

type PagesProps = {
    pages: number;
    current: number;
    onChangePage: (page: number) => void;
}

export const Pages = ({ pages, current, onChangePage }: PagesProps) => {

    if (!pages) {
        return null;
    }

    return  (
        <React.Fragment>
            {[...Array(pages)].map((e, i) => i + 1).map( (page) => 
                <Page onClick={() => onChangePage(page) } key={page} current={(page) === current}>{page}</Page>
            )}
        </React.Fragment> 
    )
}

export const Paginator = ({ totalPages, page = 1, onChangePage }: PaginatorProps) => {

    return  (
        <Container>
            <Button disabled={page === 1} onClick={() => onChangePage(--page)}>Previous</Button>
            <Pages pages={totalPages} current={page} onChangePage={onChangePage}  />
            <Button disabled={page === totalPages} onClick={() => onChangePage(++page)}>Next</Button>       
        </Container>
    )
}