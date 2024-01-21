import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingList from './Screens/ShoppingList';
import OrderSummary from './Screens/OrderSummary';
import { useState, useEffect } from 'react';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Categories:" + data[0].categoryName);
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingList categories={categories} />} />
        <Route path="/Order-Summary" element={<OrderSummary categories={categories} />} />
      </Routes>
    </Router>
  );
};

export default App;
