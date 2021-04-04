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

    getAllCharacters = async () => {
        const characters = await this.getData('/characters?page=5&pageSize=10');
        return await characters.map(this.transformCharacterData);
    }

    getCharacter = async (id) => {
        const character = await this.getData(`/characters/${id}`)
        return this.transformCharacterData(character);
    }

    getAllBooks = async () => {
        const books = await this.getData('/books/')
        return await books.map(this.transformBooksData);
    }

    getBook = async (id) => {
        const books = await this.getData(`/books/${id}`)
        return this.transformBooksData(books);
    }

    getAllHouses = async () => {
        const houses = await this.getData('/houses/');
        return await houses.map(this.transformHousesData);
    }

    getHouse = async (id) => {
        const houses = await this.getData(`/houses/${id}`);
        return await this.transformHousesData(houses);
    }

    handleEmptyKeys = (character) => {
        for (const key in character) {
            if (!character[key].length) {
                character[key] = "Unknown"
            }
        }
    }

    getId = ({ url }) => {
        // Находит все числовые символы
        return url.match(/\d/g).join('');
    }

    transformCharacterData = (characters) => {
        this.handleEmptyKeys(characters);

        const { name, gender, born, died, culture } = characters;

        return {
            id: this.getId(characters),
            name,
            gender,
            born,
            died,
            culture
        }
    }

    transformBooksData = (books) => {
        this.handleEmptyKeys(books);

        const { authors, country, name, numberOfPages, released, mediaType } = books;

        return {
            id: this.getId(books),
            authors,
            country,
            name,
            numberOfPages,
            released,
            mediaType
        }
    }

    transformHousesData = (houses) => {
        this.handleEmptyKeys(houses);

        const { coatOfArms, words, name, region, founded } = houses;

        return {
            id: this.getId(houses),
            name,
            coatOfArms,
            words,
            region,
            founded
        }
    }
}