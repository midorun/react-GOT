import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../loadingSpinner';
import './itemList.css';

export default function ItemList({ getItems, onItemSelected, renderItemContent }) {

    const [itemList, updateItemList] = useState([]);

    useEffect(() => {
        getItems()
            .then((items) => updateItemList(items))
    }, [])

    const renderItems = (items) => {
        return items.map((item) => {
            return (
                <li
                    key={item.id}
                    className="list-group-item"
                    onClick={() => onItemSelected(item.id)}
                >
                    {renderItemContent(item)}
                </li>
            )
        })
    }

    if (!itemList) {
        return <LoadingSpinner />
    }

    return (
        <ul className="item-list list-group">
            {renderItems(itemList)}
        </ul>
    );

}
