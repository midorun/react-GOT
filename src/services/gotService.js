export default class GotService {
    constructor() {
        this._rootUrl = 'https://www.anapioficeandfire.com/api';
    }

    async getData(url) {
        const response = await fetch(`${this._rootUrl}${url}`);

        if (!response.ok) {
            throw new Error(`Couldn't fetch data from ${url}, status ${response.status}`)
        }

        return await response.json();
    }

    async getAllCharacters() {
        const characters = await this.getData('/characters?page=5&pageSize=10');
        return await characters.map(this._transformCharacterData);
    }

    async getCharacter(id) {
        const character = await this.getData(`/characters/${id}`)
        return this._transformCharacterData(character);
    }

    getAllBooks() {
        return this.getData('/books');
    }

    getBook(id) {
        return this.getData(`/books/${id}`);
    }

    getAllHouses() {
        return this.getData('/houses');
    }

    getHouse(id) {
        return this.getData(`/houses/${id}`);
    }

    _handleEmptyKeys = (character) => {
        for (const key in character) {
            if (!character[key].length) {
                character[key] = "Unknown"
            }
        }
    }

    _transformCharacterData = (character) => {

        this._handleEmptyKeys(character);

        return {
            name: character.name,
            gender: character.gender,
            born: character.born,
            died: character.died,
            culture: character.culture
        }
    }
}



