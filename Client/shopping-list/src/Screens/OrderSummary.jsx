import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Button, Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import resetShoppingList from '../Redux/slices/shoppingListSlice';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../myStyle/OrderSummary.css';

export default function OrderSummary() {
    const shoppingList = useSelector((state) => state.shoppingList);
    const [order, setOrder] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
    });
    const history = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setOrder(prevOrder => ({
            ...prevOrder,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            address: event.target.address.value,
            email: event.target.email.value,
        }));

        console.log(order);

        try {
            const response = await fetch(`https://localhost:7115/api/OrderDetails/AddOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FirstName: order.firstName,
                    LastName: order.lastName,
                    Address: order.address,
                    Email: order.email,
                    OrderItems: shoppingList.items.map((product) => ({
                        name: product.name,
                        quantity: product.quantity,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            alert('ההזמנה נשלחה בהצלחה!');
            setOrder({
                firstName: '',
                lastName: '',
                address: '',
                email: '',
            });
            dispatch(resetShoppingList());
            history('/');
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <Grid id="containerDiv" container spacing={3} >
            <Grid id="headerGrid" item xs={12} md={12}>
                <Button
                    id="returnBtn"
                    onClick={() => history('/')}
                    variant="text"
                >
                    <ChevronRightIcon fontSize="inherit" />
                    חזור לרשימת הקניות
                </Button>
                <div id="headerDiv" >
                    <h2>סיכום הזמנה</h2>
                </div>
            </Grid>
            <Grid className="SMheaderDiv" item xs={12} md={12}>
                <span>פריטים בסל הקניות</span>
                <List>
                    {shoppingList.items.map((product, index) => (
                        <ListItem className="listItem" key={index}>
                            {product.name} - {product.quantity}
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12} md={12}>
                <p className='SMheaderDiv'>פרטי מזמין</p>
                <form onSubmit={handleSubmit} className="form">
                    <TextField className="formInput" label="שם פרטי" type="text" name="firstName" required variant="standard" />
                    <TextField className="formInput" label="שם משפחה" type="text" name="lastName" required variant="standard" />
                    <TextField className="formInput" label="כתובת מלאה" type="text" name="address" helperText="עיר, רחוב, מספר בית" required variant="standard" />
                    <TextField className="formInput" label="מייל" type="email" name="email" required variant="standard" />

                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        id="submitButton"
                    >
                        אשר הזמנה
                    </Button>
                </form>
            </Grid>
        </Grid >
    );
}