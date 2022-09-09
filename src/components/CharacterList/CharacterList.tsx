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
            <ul>
                {characters.map(character => <li key={ character.id }>{ character.knownAs }</li>)}
            </ul>
        </section>
    )
};