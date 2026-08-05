import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CheckoutModal.css';

export const CheckoutModal = () => {
  const { cartItems, cartTotal, isCheckoutOpen, setIsCheckoutOpen, setIsCartOpen } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    deliveryMethod: 'retirada',
    address: '',
    paymentMethod: 'pix'
  });

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatWhatsAppMessage = () => {
    let message = `Olá Pão de Casa! Gostaria de fazer uma encomenda:\n\n`;
    
    cartItems.forEach(item => {
      if (item.specialDetails) {
        const detailsString = item.specialDetails.map(d => `${d.count}x ${d.name}`).join(', ');
        message += `- ${item.quantity}x ${item.name} (${detailsString}) - ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
      } else {
        message += `- ${item.quantity}x ${item.name} - ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
      }
    });

    message += `\n*Subtotal:* ${cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
    message += `\nNome: ${formData.name}\n`;
    message += `Entrega: ${formData.deliveryMethod === 'retirada' ? 'Retirada no local' : formData.address}\n`;
    message += `Pagamento: ${formData.paymentMethod}\n`;
    message += `\nAguardo confirmação!`;

    return encodeURIComponent(message);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const waNumber = '5531973623218';
    const message = formatWhatsAppMessage();
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${message}`;
    
    window.open(waUrl, '_blank');
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div className="modal-content checkout-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setIsCheckoutOpen(false)}>
          <X size={24} />
        </button>

        <h2>Finalizar Pedido</h2>
        <p className="text-muted mb-4">Preencha os dados para enviar a encomenda via WhatsApp.</p>

        <form onSubmit={handleCheckout}>
          <div className="form-group">
            <label htmlFor="name">Seu Nome</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="form-group">
            <label>Opção de Entrega</label>
            <div className="radio-group">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="deliveryMethod" 
                  value="retirada"
                  checked={formData.deliveryMethod === 'retirada'}
                  onChange={handleChange}
                />
                Retirada
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="deliveryMethod" 
                  value="entrega"
                  checked={formData.deliveryMethod === 'entrega'}
                  onChange={handleChange}
                />
                Entrega
              </label>
            </div>
          </div>

          {formData.deliveryMethod === 'entrega' && (
            <div className="form-group slide-down">
              <label htmlFor="address">Endereço de Entrega</label>
              <textarea 
                id="address" 
                name="address" 
                required 
                value={formData.address} 
                onChange={handleChange}
                placeholder="Rua, Número, Bairro, Ponto de referência"
                rows="3"
              ></textarea>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="paymentMethod">Forma de Pagamento</label>
            <select 
              id="paymentMethod" 
              name="paymentMethod" 
              value={formData.paymentMethod} 
              onChange={handleChange}
            >
              <option value="Pix">Pix</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </div>

          <div className="checkout-summary">
            <span>Total a pagar:</span>
            <strong>{cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
          </div>

          <button type="submit" className="btn-primary w-full">
            Enviar Pedido para WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
