import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/menu';
import './ProductModal.css';

export const ProductModal = ({ product, isOpen, onClose }) => {
  // quantities is an object tracking quantity of each flavor ID
  const [quantities, setQuantities] = useState({});
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    if (isOpen && product) {
      setQuantities({ [product.id]: 1 });
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const isSegredos = product.categoryId === 'segredos';
  const segredosProducts = products.filter(p => p.categoryId === 'segredos');
  const unitLabel = product.categoryId === 'kits' ? 'Kit' : 'Por unidade';

  // Calculate total units selected
  const totalUnits = Object.values(quantities).reduce((acc, q) => acc + q, 0);

  // Price logic: if segredos, standard is 4.50. If 8+ units, every 8 units = 28.00 (3.50 each) + remainder * 4.50
  let totalPrice = 0;
  if (isSegredos) {
    const packs = Math.floor(totalUnits / 8);
    const remainder = totalUnits % 8;
    totalPrice = (packs * 28) + (remainder * 4.50);
  } else {
    totalPrice = product.price * (quantities[product.id] || 0);
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleIncrease = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrease = (id) => {
    setQuantities(prev => {
      const newQ = (prev[id] || 0) - 1;
      if (newQ <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: newQ };
    });
  };

  const handleAdd = () => {
    if (totalUnits === 0) return;
    
    // Add all selected products to cart
    if (isSegredos) {
      Object.entries(quantities).forEach(([id, qty]) => {
        const item = segredosProducts.find(p => p.id === id);
        if (item) addToCart(item, qty);
      });
    } else {
      addToCart(product, quantities[product.id] || 1);
    }
    
    onClose();
    setIsCartOpen(true);
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);
  const formattedUnit = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);

  return (
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal-content">
        <button className="product-modal-close" onClick={onClose} aria-label="Fechar">
          &times;
        </button>
        
        <div className="product-modal-header-img">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className="product-modal-badge">{product.badge}</span>}
        </div>

        <div className="product-modal-body">
          {!isSegredos ? (
            <>
              <h2 className="product-modal-title">{product.name}</h2>
              <p className="product-modal-desc">{product.description}</p>
              
              <div className="product-modal-price-row">
                <span className="product-modal-unit-price">{formattedUnit}</span>
                <span className="product-modal-unit-label">{unitLabel}</span>
              </div>

              <div className="product-modal-quantity-section">
                <span className="quantity-label">Quantidade:</span>
                <div className="quantity-controls-large">
                  <button onClick={() => handleDecrease(product.id)} className="qty-btn-large" disabled={(quantities[product.id] || 0) <= 1}>-</button>
                  <span className="qty-value-large">{quantities[product.id] || 1}</span>
                  <button onClick={() => handleIncrease(product.id)} className="qty-btn-large">+</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="product-modal-title">Monte seu Kit</h2>
              <p className="product-modal-desc">
                Adicione 8 pãezinhos (misture como quiser) e feche o kit por <strong>R$ 28,00</strong>! Unidades avulsas saem a {formattedUnit}.
              </p>
              
              {/* Gamification hint */}
              <div className="hybrid-hint mb-3">
                {totalUnits % 8 === 0 && totalUnits > 0 ? (
                  <span className="hybrid-success">✅ Você completou {totalUnits / 8} kit(s)!</span>
                ) : (
                  <span className="hybrid-warning">Faltam {8 - (totalUnits % 8)} pães para fechar +1 kit com desconto!</span>
                )}
              </div>

              <div className="hybrid-list">
                {segredosProducts.map(item => {
                  const qty = quantities[item.id] || 0;
                  return (
                    <div key={item.id} className="hybrid-item">
                      <div className="hybrid-item-info">
                        <strong>{item.name}</strong>
                      </div>
                      <div className="quantity-controls-large hybrid-controls">
                        <button onClick={() => handleDecrease(item.id)} className="qty-btn-large" disabled={qty === 0}>-</button>
                        <span className="qty-value-large">{qty}</span>
                        <button onClick={() => handleIncrease(item.id)} className="qty-btn-large">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="product-modal-footer">
          <button className="product-modal-add-btn" onClick={handleAdd} disabled={totalUnits === 0}>
            <span>Adicionar ao Carrinho</span>
            <span>{formattedPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
