import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export const ProductCard = ({ product, onSelect }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  const unitLabel = product.categoryId === 'kits' ? 'Kit' : 'Unidade';

  return (
    <div className="product-card glass">
      <div className="product-image-wrapper">
        <div className="product-image-placeholder"></div>
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <div className="product-price-col">
            <span className="product-price">{formattedPrice}</span>
            <span className="product-unit-badge">{unitLabel}</span>
          </div>
          <button className="add-btn-text" onClick={onSelect} aria-label={`Adicionar ${product.name}`}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
