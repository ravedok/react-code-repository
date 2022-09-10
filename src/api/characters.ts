import { Character, Gender } from "../models/Character";

export interface CharacterJson {
    name: string;
    url: string;
    aliases: string[];
    gender: Gender;
}

export async function getCharacters() {
    const response = await fetch('https://www.anapioficeandfire.com/api/characters');

    const data: CharacterJson[] = await response.json();

    return data.map(character => Character.fromJson(character));    
}