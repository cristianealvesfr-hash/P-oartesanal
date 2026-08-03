import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './FloatingCartBar.css';

export const FloatingCartBar = () => {
  const { cartItems, cartTotal, setIsCartOpen, isCartOpen } = useCart();

  if (cartItems.length === 0 || isCartOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotal);

  return (
    <div className="floating-cart-bar-container">
      <button className="floating-cart-bar" onClick={() => setIsCartOpen(true)}>
        <div className="floating-cart-left">
          <div className="floating-cart-icon-wrapper">
            <ShoppingBag size={20} color="#FFFFFF" />
            <span className="floating-cart-badge">{totalItems}</span>
          </div>
          <span className="floating-cart-label">Ver Carrinho</span>
        </div>
        <div className="floating-cart-right">
          <span className="floating-cart-price">{formattedTotal}</span>
        </div>
      </button>
    </div>
  );
};
