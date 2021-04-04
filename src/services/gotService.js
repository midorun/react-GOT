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
        const books = await this.getData('/books')
        return await books.map(this.transformBooksData);
    }

    getBook = async (id) => {
        const books = await this.getData(`/books/${id}`)
        return this.transformBooksData(books);
    }

    getAllHouses = async () => {
        const houses = await this.getData('/houses');
        return this.transformHousesData(houses);
    }

    getHouse = async (id) => {
        const houses = await this.getData(`/houses/${id}`);
        return this.transformHousesData(houses);
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

    transformCharacterData = (character) => {
        this.handleEmptyKeys(character);

        const { name, gender, born, died, culture } = character;

        return {
            id: this.getId(character),
            name,
            gender,
            born,
            died,
            culture
        }
    }

    transformBooksData = (book) => {
        this.handleEmptyKeys(book);

        const { authors, country, name, numberOfPages, released, mediaType } = book;

        return {
            id: this.getId(book),
            authors,
            country,
            name,
            numberOfPages,
            released,
            mediaType
        }
    }

    transformHousesData = (book) => {
        this.handleEmptyKeys(book);

        const { authors, country, name, numberOfPages, released, mediaType } = book;

        return {
            id: this.getId(book),
            authors,
            country,
            name,
            numberOfPages,
            released,
            mediaType
        }
    }
}



