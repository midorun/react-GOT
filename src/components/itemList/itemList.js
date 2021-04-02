import React, { Component } from 'react';
import nextId from 'react-id-generator';
import GotService from '../../services/gotService';
import LoadingSpinner from '../loadingSpinner';
import './itemList.css';

export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        characters: null
    }

    componentDidMount = () => {
        this.gotService.getAllCharacters()
            .then((characters) => this.setState({ characters }))
    }

    render() {
        const characters = this.state.characters;

        if (!characters) {
            return <LoadingSpinner />
        } else {
            let charactersHTML = '';
            charactersHTML = characters.map(({ name }, i) => {

                return (
                    <li
                        key={i}
                        className="list-group-item"
                        onClick={() => this.props.onCharSelected(41 + i)}
                    >
                        {name}
                    </li>
                )
            })

            return (
                <ul className="item-list list-group">
                    {charactersHTML}
                </ul>
            );
        }
    }
}
