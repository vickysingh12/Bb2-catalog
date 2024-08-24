import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import PrivateRoute from './pages/PrivateRoute';

const App = () => {
let rr = "copyyy";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<PrivateRoute element={<ProductList />} />}
        />
        <Route
          path="/products/:id"
          element={<PrivateRoute element={<ProductDetail />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
