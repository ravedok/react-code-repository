import React, { useEffect, useState } from "react";
import { getCharacters } from "../../api/characters";
import { Character } from "../../models/Character";


export const CharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        getCharacters().then(setCharacters);
    }, [])

    return (    
        <section>
            <code>{ JSON.stringify(characters) }</code>
            <ul>
                {characters.map(character => <li key={ character.id }>{ character.knownAs }</li>)}
            </ul>
        </section>
    )
};