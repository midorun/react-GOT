import React, { Component } from 'react';
import LoadingSpinner from '../loadingSpinner';
import './itemList.css';

export default class ItemList extends Component {
    state = {
        items: null
    }

    componentDidMount = () => {
        const { getItems } = this.props;

        getItems()
            .then((items) => this.setState({ items }))
    }

    renderItems = (items) => {
        return items.map((item) => {
            return (
                <li
                    key={item.id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(item.id)}
                >
                    {this.props.renderItemContent(item)}
                </li>
            )
        })
    }

    render() {
        const items = this.state.items;

        if (!items) {
            return <LoadingSpinner />
        }

        return (
            <ul className="item-list list-group">
                {this.renderItems(items)}
            </ul>
        );
    }
}
