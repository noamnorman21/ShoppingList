// Server: NOAM\SQLEXPRESS
const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Get All Categories from Azure DB 
const config = {
   user: 'shoppinglist_admin', // better stored in an app setting such as process.env.DB_USER
   password: 'Aa123456', // better stored in an app setting such as process.env.DB_PASSWORD
   server: 'shoppinglistserver21.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
   port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
   database: 'shoppingListDB', // better stored in an app setting such as process.env.DB_NAME
   authentication: {
      type: 'default'
   },
   options: {
      encrypt: true
   }
}

app.get('/api/categories', async (req, res) => {
   try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT categoryName, categoryImg FROM [dbo].[Categories]');
      const categories = result.recordset.map((record) => ({
         categoryName: record.categoryName,
         categoryImg: record.categoryImg,
      }));
      res.json(categories);
   } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
   }
});

app.get('/api/products', async (req, res) => {
   try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('Select orderItems from [dbo].[OrderDetails]');
      const products = result.recordset.map((record) => JSON.parse(record.orderItems));

      console.log(products);

      // Now 'products' is an array of arrays of objects
      // For each inner array, you can extract the 'Name' property to build 'namesArr'
      let namesArr = [];
      products.forEach((productArray) => {
         productArray.forEach((product) => {
            if (!namesArr.includes(product.Name)) {
               namesArr.push(product.Name);
            }
         });
      });

      res.json(products);
   } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
   }
});


app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});