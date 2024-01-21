import React from 'react';
import { useSelector } from 'react-redux';
import '../myStyle/ShoppingList.css';

export default function TotalItems() {
    const totalItems = useSelector((state) => state.shoppingList.totalItems);

    return (
        <div className="totalItemsContainer">
            <p>סך הכל {totalItems} מוצרים</p>
        </div>
    );
}
