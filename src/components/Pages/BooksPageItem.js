import React, { Component } from "react";
import ItemDetails from '../ItemDetails';
import ItemDetailsField from '../ItemDetailsField';
import GotService from '../../services/gotService';

export default class BooksPageItem extends Component {

    gotService = new GotService();

    render() {
        return (
            <ItemDetails
                selectedItemId={this.props.selectedBookId}
                getItem={this.gotService.getBook}
            >
                <ItemDetailsField label="Authors" field="authors" />
                <ItemDetailsField label="Country" field="country" />
                <ItemDetailsField label="NumberOfPages" field="numberOfPages" />
                <ItemDetailsField label="Released" field="released" />
            </ItemDetails>
        )
    }
}
