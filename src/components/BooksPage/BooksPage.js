import React, { Component } from "react";
import ItemList from '../itemList';
import ItemDetails from '../ItemDetails';
import ErrorHandler from "../errorHandler";
import RowCustom from '../RowCustom';
import GotService from '../../services/gotService';
import ItemDetailsField from "../ItemDetailsField";

export default class BooksPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: 1,
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
                getItems={this.gotService.getAllBooks}
                onItemSelected={this.onItemSelected}
                renderItemContent={({ name, mediaType }) => `${name} (${mediaType})`}
            />
        )

        const itemDetailsComponent = (
            <ItemDetails
                selectedItemId={this.state.selectedItem}
                getItem={this.gotService.getBook}
            >
                <ItemDetailsField label="Authors" field="authors" />
                <ItemDetailsField label="Country" field="country" />
                <ItemDetailsField label="NumberOfPages" field="numberOfPages" />
                <ItemDetailsField label="Released" field="released" />
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