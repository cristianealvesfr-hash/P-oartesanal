import React from 'react';
import { MapPin, ShoppingBag, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

export const Header = ({ searchQuery, setSearchQuery }) => {
  const { cartCount, setIsCartOpen } = useCart();

  const handleHomeClick = () => {
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header glass">
      <div className="container header-top">
        <div className="header-logo-section" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          <img src="/assets/ID VISUAL PÃO DE CASA.jpeg" alt="Pão de Casa Logo" className="logo" />
          <div className="header-info">
            <h1>Pão de Casa</h1>
            <div className="location">
              <MapPin size={14} className="text-accent" />
              <span>Contagem, MG</span>
            </div>
            <div className="badge">
              Trabalhamos sob encomenda (mín. 24h)
            </div>
          </div>
        </div>
        
        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={24} color="var(--color-primary)" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
      
      <div className="container header-bottom">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por pães, recheios..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Limpar busca">
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
