import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/menu';
import './Cart.css';

export const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    addToCart,
    bundleLogic
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('');

  const upsellProducts = products
    .filter(p => p.price === 4.50)
    .filter(upsell => !cartItems.some(item => item.id === upsell.id))
    .slice(0, 4);

  // Gamification Logic
  const breadsNeeded = bundleLogic.remainder > 0 ? 8 - bundleLogic.remainder : 8;
  const showGamification = cartItems.length > 0; 
  const progressPercentage = bundleLogic.remainder === 0 && bundleLogic.bundlesCount > 0 ? 100 : (bundleLogic.remainder / 8) * 100;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    if (!paymentMethod) {
      alert("Por favor, selecione uma forma de pagamento antes de finalizar.");
      return;
    }

    let message = `Olá Pão de Casa! Gostaria de fazer uma encomenda:\n\n`;
    
    cartItems.forEach(item => {
      let itemPrice = (item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      message += `${item.quantity}x ${item.name} - ${itemPrice}\n`;
    });

    if (bundleLogic.discountAmount > 0) {
      message += `\n*Desconto Combo (8 un.):* - ${(bundleLogic.discountAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
    }

    message += `\n*Total do Pedido:* ${cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
    message += `\n*Forma de Pagamento:* ${paymentMethod}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5531973623218&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`cart-overlay ${isCartOpen ? 'open' : 'closed'}`} onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        
        {/* Header do Carrinho */}
        <div className="cart-header">
          <h2>Seu Pedido</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)} aria-label="Fechar carrinho">
            <X size={22} />
          </button>
        </div>

        {/* Progresso do Combo / Gamificação */}
        {showGamification && (
          <div className="cart-gamification">
            {bundleLogic.remainder === 0 && bundleLogic.bundlesCount > 0 ? (
              <p className="gamification-success">Parabéns! Kit de 8 pães ativado por R$ 28,00!</p>
            ) : (
              <p className="gamification-text">
                Faltam <strong>{breadsNeeded} pães</strong> da linha "Segredos" para formar um Kit por R$ 28,00!
              </p>
            )}
            <div className="gamification-progress-bar">
              <div 
                className={`gamification-progress ${bundleLogic.remainder === 0 && bundleLogic.bundlesCount > 0 ? 'success' : ''}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Conteúdo dos Itens */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="text-muted" />
              <p>Seu carrinho está vazio</p>
              <button className="btn-outline" onClick={() => setIsCartOpen(false)}>
                Ver Cardápio
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.cartId || item.id} className="cart-item">
                  <div className="cart-item-info-full">
                    <div className="cart-item-header">
                      <div>
                        <h4>{item.quantity}x {item.name}</h4>
                        {item.specialDetails && (
                          <span className="cart-item-subtext">{item.specialDetails}</span>
                        )}
                      </div>
                      <button 
                        className="remove-btn-icon"
                        onClick={() => removeFromCart(item.cartId || item.id)}
                        aria-label="Remover item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="cart-item-price-row-alt">
                      <span className="cart-item-price-alt">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                      </span>
                      <div className="quantity-controls-alt">
                        <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity - 1)} aria-label="Diminuir">
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity + 1)} aria-label="Aumentar">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Seção Upsell: Que tal adicionar? */}
              {upsellProducts.length > 0 && (
                <div className="cart-upsell">
                  <div className="upsell-header">
                    <div className="upsell-header-left">
                      <div className="upsell-badge-tag">FALTA POUCO</div>
                      <h4 className="upsell-title">Que tal adicionar?</h4>
                    </div>
                    <div className="upsell-swipe-hint">
                      <span className="swipe-text">Deslize</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                  <div className="upsell-list-container">
                    <div className="upsell-list">
                      {upsellProducts.map(upsell => (
                        <div key={upsell.id} className="upsell-card">
                          <img src={upsell.image} alt={upsell.name} />
                          <div className="upsell-info">
                            <span className="upsell-name">{upsell.name}</span>
                            <span className="upsell-price">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(upsell.price)}
                            </span>
                          </div>
                          <button 
                            className="upsell-add-btn" 
                            onClick={() => addToCart(upsell)}
                          >
                            + Adicionar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Seção Forma de Pagamento */}
              <div className="checkout-section">
                <h4 className="section-title">Forma de Pagamento</h4>
                <div className="payment-grid">
                  {['Pix', 'Dinheiro', 'Cartão Crédito', 'Cartão Débito'].map(method => (
                    <button 
                      key={method}
                      className={`payment-btn ${paymentMethod === method ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé Fixado do Carrinho */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {bundleLogic.discountAmount > 0 && (
              <div className="cart-discount-row">
                <span>Desconto Kit ({bundleLogic.bundlesCount}x)</span>
                <span className="discount-amount">
                  - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bundleLogic.discountAmount)}
                </span>
              </div>
            )}
            
            <div className="cart-total-row">
              <span className="subtotal-label">Total do Pedido</span>
              <strong className="subtotal-value">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
              </strong>
            </div>
            
            <button className="btn-whatsapp" onClick={handleCheckout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              Finalizar no WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
