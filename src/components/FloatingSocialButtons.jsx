import React from 'react';
import './FloatingSocialButtons.css';

export const FloatingSocialButtons = () => {
  const waNumber = '5531973623218';
  const waMessage = 'Olá! Gostaria de fazer uma encomenda dos pães da Pão de Casa.';
  const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;
  const igUrl = 'https://www.instagram.com/paodecasa5?igsh=ZXNjNTM1OWl5NzZp';

  return (
    <div className="floating-social-container">
      <a 
        href={igUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn instagram-btn"
        aria-label="Siga-nos no Instagram"
      >
        <img src="/icons/instagram.png" alt="Instagram" />
      </a>
      <a 
        href={waUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn whatsapp-btn"
        aria-label="Fale conosco no WhatsApp"
      >
        <img src="/icons/whatsapp.jpg" alt="WhatsApp" />
      </a>
    </div>
  );
};
