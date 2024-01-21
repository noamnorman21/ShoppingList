import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { actions } from '../Redux/slices/shoppingListSlice';
import '../myStyle/ShoppingList.css';

const ShoppingListItem = ({ shoppingList, category, onEditProduct }) => {
   const dispatch = useDispatch();
   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
   const [editQuantityOpen, setEditQuantityOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [newQuantity, setNewQuantity] = useState(0);

   const filteredItems = shoppingList.items.filter((product) => product.category === category);

   const handleDelete = (productId) => {
      dispatch(actions.deleteProduct(productId));
      setDeleteConfirmationOpen(false);
   };

   const handleEdit = (productId) => {
      setSelectedProduct(productId);
      setEditQuantityOpen(true);
   };

   const handleEditQuantity = () => {
      onEditProduct(selectedProduct, newQuantity);
      setEditQuantityOpen(false);
   };

   const handleCloseDialogs = () => {
      setDeleteConfirmationOpen(false);
      setEditQuantityOpen(false);
   };

   return (
      <List>
         {filteredItems.map((product, index) => (
            <React.Fragment key={index}>
               <ListItem>
                  <ListItemText primary={`${product.name} - (${product.quantity})`} />
                  <ListItemSecondaryAction>
                     <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(product.id)}>
                        <EditIcon />
                     </IconButton>
                     <IconButton edge="end" aria-label="delete" onClick={() => setDeleteConfirmationOpen(true)}>
                        <DeleteIcon />
                     </IconButton>
                  </ListItemSecondaryAction>
               </ListItem>
               {/* Show Divider only if there are more than 2 different products names */}
               {filteredItems.length > 1 && index < filteredItems.length - 1 && <Divider style={{ margin: "5px" }} />}
            </React.Fragment>
         ))}

         {/* Delete Confirmation Dialog */}
         <Dialog open={deleteConfirmationOpen} onClose={handleCloseDialogs}>
            <DialogTitle>האם את/ה בטוח שהינך רוצה למחוק מוצר זה?</DialogTitle>
            <DialogActions>
               <Button onClick={() => handleDelete(selectedProduct)} color="primary">
                  כן
               </Button>
               <Button onClick={handleCloseDialogs} color="primary">
                  לא
               </Button>
            </DialogActions>
         </Dialog>

         {/* Edit Quantity Dialog */}
         <Dialog open={editQuantityOpen} onClose={handleCloseDialogs}>
            <DialogTitle>ערוך כמות מוצר</DialogTitle>
            <DialogContent>
               {/* Add input or form for editing the quantity */}
               <Button variant="outlined" onClick={() => setNewQuantity(newQuantity - 1)}>-</Button>
               <span style={{ margin: '0 10px' }}>{newQuantity}</span>
               <Button variant="outlined" onClick={() => setNewQuantity(newQuantity + 1)}>+</Button>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleEditQuantity} color="primary">
                  שמור
               </Button>
               <Button onClick={handleCloseDialogs} color="primary">
                  בטל
               </Button>
            </DialogActions>
         </Dialog>
      </List>
   );
};

export default ShoppingListItem;