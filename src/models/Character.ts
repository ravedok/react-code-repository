import { CharacterJson } from "../api/characters";

export class Character {
    constructor(
        public name: string, 
        public url: string,
        public aliases: string[]
    ) {
    }

    get id(): number {
        return Number(this.url.split('').pop());
    }

    get knownAs(): string 
    {
        const aliases = this.aliases.join(', ');

        if (!this.name) {
            return aliases;
        }
    
        return `${this.name} (${aliases})`;
    }

    static fromJson(json: CharacterJson): Character{
        return new Character(json.name, json.url, json.aliases);
    }
}