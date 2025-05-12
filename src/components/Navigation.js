import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/products">Product List</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/inventory">Inventory Management</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;