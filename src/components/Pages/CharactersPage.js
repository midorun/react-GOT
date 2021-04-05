import React, { Component } from "react";
import ItemList from '../itemList';
import ItemDetails from '../ItemDetails';
import ErrorHandler from "../errorHandler";
import RowCustom from '../RowCustom';
import GotService from '../../services/gotService';
import ItemDetailsField from "../ItemDetailsField";

export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: 41,
        error: false
    }

    componentDidCatch = () => {
        console.log('error');
        this.setState({ error: true })
    }

    onItemSelected = (id) => {
        this.setState({ selectedItem: id })
    }

    render() {
        if (this.state.error) {
            return <ErrorHandler />
        }

        const itemListComponent = (
            <ItemList
                getItems={this.gotService.getAllCharacters}
                onItemSelected={this.onItemSelected}
                renderItemContent={({ name, gender }) => `${name} (${gender})`}
            />
        )

        const itemDetailsComponent = (
            <ItemDetails
                selectedItemId={this.state.selectedItem}
                getItem={this.gotService.getCharacter}
            >
                <ItemDetailsField label="Gender" field="gender" />
                <ItemDetailsField label="Born" field="born" />
                <ItemDetailsField label="Died" field="died" />
                <ItemDetailsField label="Culture" field="culture" />
            </ItemDetails>
        )

        return (
            <RowCustom
                left={itemListComponent}
                right={itemDetailsComponent}
            />
        )
    }
}