import React, { Component } from 'react';
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
        }

        return (
            <ul className="item-list list-group">
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ul>
        );
    }
}
