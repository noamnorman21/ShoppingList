import React, { useState, useEffect } from 'react';
import { Select, TextField, Button, Grid } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

const AddProductForm = ({ onAddProduct, categories }) => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      fetch('http://localhost:3000/api/products')
         .then(response => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then(data => {
            let namesArr = [];
            data.forEach(productArray => {
               productArray.forEach(product => {
                  if (product && product.Name && !namesArr.includes(product.Name)) {
                     namesArr.push(product.Name);
                  }
               });
            });
            setProducts(namesArr);
            console.log("Products:", namesArr);
         })
         .catch(error => {
            console.error('Error fetching products:', error);
         });
   }, []);


   const [productName, setProductName] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('');

   const validateInputs = () => {
      if (productName.trim() === '' && selectedCategory === '-1') {
         alert('אנא בחר קטגוריה והכנס שם מוצר');
         return false;
      }
      if (productName.trim() === '') {
         alert('אנא הכנס שם מוצר');
         return false;
      }
      if (selectedCategory === '-1') {
         alert('אנא בחר קטגוריה');
         return false;
      }
      return true;
   };

   const handleAddProduct = () => {
      if (validateInputs()) {
         console.log('Adding product:', productName, selectedCategory);
         onAddProduct(productName, selectedCategory);
         setProductName('');
         setSelectedCategory('');
      }
   };

   return (
      <Grid id="formContainer" container>
         <Grid id="textInput" item xs={12} md={4}>
            {/* שם המוצר */}
            <Autocomplete
               className='input-select'
               id="free-solo-demo"
               freeSolo
               options={products}
               value={productName}
               onChange={(event, newValue) => setProductName(newValue)}
               onInputChange={(event, newInputValue) => setProductName(newInputValue)}
               filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  if (inputValue !== '' && !options.some((option) => inputValue === option)) {
                     filtered.push(inputValue);
                  }
                  return filtered;
               }}
               renderInput={(params) => (
                  <TextField {...params} label="שם המוצר" variant="outlined" size="small" fullWidth />
               )}
            />

         </Grid>
         {/* Choose Category */}
         <Grid id="selectCategory" item xs={12} md={4}>
            <Select
               native
               className='input-select'
               value={selectedCategory}
               variant='outlined'
               onChange={(e) => setSelectedCategory(e.target.value)}
               inputProps={{
                  name: 'category',
                  id: 'category-select',
               }}
               fullWidth
               size="small"
            >
               <option value='-1'>בחר קטגוריה</option>
               {categories.map((category, index) => (
                  <option key={index} value={category.categoryName}>
                     {category.categoryName}
                  </option>
               ))}
            </Select>
         </Grid>
         {/* Add Product */}
         <Grid id="addProduct" item xs={12} md={4}>
            {/* Add New Product */}
            <Button
               id={"addProductBtn"}
               variant="contained"
               onClick={handleAddProduct}
            >
               הוסף מוצר
            </Button>
         </Grid>
      </Grid>
   );
};

export default AddProductForm;
