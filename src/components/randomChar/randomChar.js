import React, { Component } from 'react';
import GotService from '../../services/gotService';
import LoadingSpinner from '../loadingSpinner';
import ErrorHandler from '../errorHandler';

import './randomChar.css';

export default class RandomChar extends Component {

    gotService = new GotService();

    state = {
        character: {},
        loading: true,
        error: false,
        hidden: false
    }
    componentDidMount = () => {
        this.updateCharacterData();
        setInterval(() => {
            this.timerId = this.updateCharacterData();
        }, 5000);
    }

    componentWillUnmount = () => {
        clearInterval(this.timerId);
    }

    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharacterData = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    render() {
        const { character, loading, error } = this.state;

        const errorHandler = error ? <ErrorHandler /> : null
        const loadingSpinner = loading ? <LoadingSpinner /> : null
        const layout = !(loading || error) ? <RandomCharacterBlock character={character} /> : null;



        return (
            <div className="random-block rounded">
                {loadingSpinner}
                {errorHandler}
                {layout}
            </div>
        );
    }
}

const RandomCharacterBlock = ({ character }) => {

    const { name, gender, born, died, culture } = character;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}