import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { boxFlavors } from '../data/menu';
import './HybridBoxModal.css';

export const HybridBoxModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const TARGET_COUNT = 8;
  const [selections, setSelections] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Reseta seleções quando abrir
      setSelections(boxFlavors.reduce((acc, flavor) => ({ ...acc, [flavor.id]: 0 }), {}));
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const currentTotal = Object.values(selections).reduce((sum, count) => sum + count, 0);
  const remaining = TARGET_COUNT - currentTotal;
  const isComplete = currentTotal === TARGET_COUNT;

  const handleIncrement = (flavorId) => {
    if (currentTotal < TARGET_COUNT) {
      setSelections(prev => ({ ...prev, [flavorId]: prev[flavorId] + 1 }));
    }
  };

  const handleDecrement = (flavorId) => {
    if (selections[flavorId] > 0) {
      setSelections(prev => ({ ...prev, [flavorId]: prev[flavorId] - 1 }));
    }
  };

  const handleAddToCart = () => {
    if (isComplete) {
      // Filtrar apenas os sabores selecionados
      const selectedFlavors = Object.entries(selections)
        .filter(([_, count]) => count > 0)
        .map(([id, count]) => {
          const flavor = boxFlavors.find(f => f.id === id);
          return { name: flavor.name, count };
        });

      addToCart(product, 1, selectedFlavors);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content hybrid-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Fechar">
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>{product.name}</h2>
          <p className="text-muted">Escolha {TARGET_COUNT} sabores para montar sua caixa.</p>
        </div>

        <div className="progress-section">
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(currentTotal / TARGET_COUNT) * 100}%`, backgroundColor: isComplete ? 'var(--color-success)' : 'var(--color-primary)' }}
            ></div>
          </div>
          <div className="progress-text">
            {isComplete ? (
              <span className="success-text">Caixa completa!</span>
            ) : (
              <span>Faltam {remaining} pãe{remaining === 1 ? '' : 's'}</span>
            )}
          </div>
        </div>

        <div className="flavors-list">
          {boxFlavors.map(flavor => (
            <div key={flavor.id} className="flavor-item">
              <span className="flavor-name">{flavor.name}</span>
              <div className="quantity-controls">
                <button 
                  className="qty-btn" 
                  onClick={() => handleDecrement(flavor.id)}
                  disabled={selections[flavor.id] === 0}
                >
                  <Minus size={16} />
                </button>
                <span className="qty-count">{selections[flavor.id]}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => handleIncrement(flavor.id)}
                  disabled={currentTotal >= TARGET_COUNT}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button 
            className="btn-primary w-full" 
            onClick={handleAddToCart}
            disabled={!isComplete}
          >
            Adicionar por {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </button>
          {!isComplete && (
            <div className="info-msg">
              <Info size={14} /> Selecione mais {remaining} item(ns) para liberar o botão.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
