import React, { useEffect, useState } from "react";
import { getCharacters } from "../../api/characters";
import { Character } from "../../models/Character";
import { CharacterListItem } from "./CharacterListItem";


export const CharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        getCharacters().then(setCharacters);
    }, [])

    return (    
        <section>
            <ul>
                {characters.map(character => <CharacterListItem key={ character.id } character={character} />)}
            </ul>
        </section>
    )
};