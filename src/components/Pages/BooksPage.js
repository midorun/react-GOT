import React, { Component } from "react";
import ItemList from '../itemList';
import ErrorHandler from "../errorHandler";
import GotService from '../../services/gotService';
import { withRouter } from 'react-router-dom';

class BooksPage extends Component {
    gotService = new GotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch = () => {
        this.setState({ error: true })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorHandler />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getItems={this.gotService.getAllBooks}
                renderItemContent={({ name, mediaType }) => `${name} (${mediaType})`}
            />
        )
    }
}

export default withRouter(BooksPage);