import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.dataCategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Category: {product.dataCategory}</p>
            <p>Records: {product.recordCount}</p>
            <p>Fields: {product.fields}</p>
            <a href={`/products/${product.id}`}>View Details</a>
          </li>
        ))}
      </ul>
      {error && <div className="error">{error}</div>}

    </div>
    
  );
};

export default ProductList;
