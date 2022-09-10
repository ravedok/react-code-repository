import React from 'react';
import styled from 'styled-components';
import { Character, Gender as GenderEnum } from '../../models/Character';
import maleIcon from '../../assets/male.png';
import femaleIcon from '../../assets/female.png';


type Props = {
    character: Character
}

type GenderProps = {
    gender: GenderEnum
}

const Name = styled.span`
    
`;

const Gender = styled.span<GenderProps>`
    display: inline-block;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url(${({gender}) => gender === GenderEnum.Female ? femaleIcon : maleIcon  });
`;

const Container = styled.li`
    list-style: none;
`

export const  CharacterListItem = ({ character }: Props)  =>  {

    return (
        <Container>
            <Name>{ character.knownAs }</Name> 
            <Gender gender={character.gender} />
        </Container>
    );
}
