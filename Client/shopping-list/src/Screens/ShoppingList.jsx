import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Redux/slices/shoppingListSlice';
import TotalItems from '../Components/TotalItems';
import AddProductForm from '../Components/AddProductForm';
import CategorySection from '../Components/CategorySection';
import '../myStyle/ShoppingList.css';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

const ShoppingList = ({ categories, products }) => {
    const dispatch = useDispatch();
    const shoppingList = useSelector((state) => state.shoppingList);
    const history = useNavigate();

    const handleAddProduct = (productName, category) => {
        dispatch(actions.addProduct({ productName, category }));
    };

    const handleFinishOrder = () => {
        history('/order-summary');
    };

    const handleEditProduct = (productId, newQuantity) => {
        dispatch(actions.editProduct({ productId, newQuantity }));
    };

    return (
        <Grid id="containerDiv" container spacing={3}>
            <Grid item xs={12} md={12}>
                <div id="headerDiv">
                    <h1>רשימת קניות</h1>
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <TotalItems />
            </Grid>
            <Grid item xs={12} md={12}>
                <AddProductForm onAddProduct={handleAddProduct} categories={categories} products={products} />
            </Grid>
            <Grid item xs={12} md={12}>
                <CategorySection shoppingList={shoppingList} categories={categories} onEditProduct={handleEditProduct} />
            </Grid>
            <Grid item xs={12} md={12}>
                {/*  if shoppingList.items.length === 0 emptylistdiv else grid addproduct */}
                {shoppingList.items.length === 0 ? null :
                    <Grid id="addProduct" item xs={12} md={12}>
                        <Button
                            id="finishOrderBtn"
                            onClick={handleFinishOrder}
                            variant="outlined"
                            disabled={shoppingList.items.length === 0}
                        >
                            סיים הזמנה
                        </Button>
                    </Grid>
                }
            </Grid>
        </Grid >
    );
};

export default ShoppingList;
