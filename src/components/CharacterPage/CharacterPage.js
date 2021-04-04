import React, { Component } from "react";
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorHandler from "../errorHandler";
import RowCustom from '../RowCustom';
import GotService from '../../services/gotService';

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: 41,
        error: false
    }

    componentDidCatch = () => {
        console.log('error');
        this.setState({ error: true })
    }

    onCharSelected = (id) => {
        this.setState({ selectedChar: id })
    }


    render() {
        if (this.state.error) {
            return <ErrorHandler />
        }

        const itemListComponent = (
            <ItemList
                getData={this.gotService.getAllCharacters}
                onCharSelected={this.onCharSelected}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />
        )

        const charDetailsComponent = (
            <CharDetails
                selectedCharId={this.state.selectedChar}
            />
        )

        return (
            <RowCustom
                left={itemListComponent}
                right={charDetailsComponent}
            />
        )
    }
}