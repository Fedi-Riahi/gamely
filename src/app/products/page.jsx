"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // Fetch products
    fetch('/api/product')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));

    // Fetch sellers
    fetch('/api/seller')
      .then(response => response.json())
      .then(data => setSellers(data.sellers))
      .catch(error => console.error('Error fetching sellers:', error));
  }, []);

  const getBusinessName = (sellerId) => {
    const seller = sellers.find(seller => seller.user_id === sellerId);
    return seller ? seller.businessName : 'Unknown Business';
  };

  return (
    <div className='mt-40'>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <div>Name: {product.name}</div>
            <div>Category: {product.category}</div>
            <div>By {getBusinessName(product.sellerId)}</div>
            <Image src={product.productImage} alt={product.name} width={200} height={200} className='object-cover'/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;