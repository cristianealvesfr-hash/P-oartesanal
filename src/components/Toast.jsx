import React from 'react';
import './Toast.css';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-notification fade-in">
      {toastMessage}
    </div>
  );
};
