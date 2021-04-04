import React, { Component } from 'react';
import './ItemDetails.css';

export default class ItemDetails extends Component {
    state = {
        item: null
    }

    componentDidMount = () => {
        this.updateItem();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.selectedItemId !== prevProps.selectedItemId) {
            this.updateItem()
        }
    }

    updateItem = () => {
        const { selectedItemId, getItem } = this.props;

        if (!selectedItemId) {
            return;
        }

        getItem(selectedItemId)
            .then((item) => this.setState({ item }))
    }

    render() {
        if (!this.state.item) {
            return <span className='select-error'>Please select a character</span>
        }

        const item = this.state.item

        return (
            <div className="char-details rounded">
                <h4>{item.name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, { item })
                    })}
                </ul>
            </div>
        );
    }
}