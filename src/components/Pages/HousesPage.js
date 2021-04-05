import React, { Component } from "react";
import ItemList from '../itemList';
import ItemDetails from '../ItemDetails';
import ErrorHandler from "../errorHandler";
import RowCustom from '../RowCustom';
import GotService from '../../services/gotService';
import ItemDetailsField from "../ItemDetailsField";

export default class HousesPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: 10,
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
                getItems={this.gotService.getAllHouses}
                onItemSelected={this.onItemSelected}
                renderItemContent={({ name }) => `${name}`}
            />
        )

        const itemDetailsComponent = (
            <ItemDetails
                selectedItemId={this.state.selectedItem}
                getItem={this.gotService.getHouse}
            >
                <ItemDetailsField label="Coat Of Arms" field="coatOfArms" />
                <ItemDetailsField label="Words" field="words" />
                <ItemDetailsField label="Region" field="region" />
                <ItemDetailsField label="Founded" field="founded" />
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