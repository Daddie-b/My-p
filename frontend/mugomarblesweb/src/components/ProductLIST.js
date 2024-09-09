import React from 'react';

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}> {/* Ensure each item has a unique key */}
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
