import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

export const CookieConsent = ({ onOpenLegal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('lgpd_cookie_consent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        <div className="cookie-consent-content">
          <p>
            <strong>Aviso de Cookies e Privacidade:</strong> Nós utilizamos cookies para melhorar sua experiência de navegação e analisar nosso tráfego. Ao continuar navegando neste site, você concorda com a nossa 
            <button className="cookie-link" onClick={() => onOpenLegal('privacy')}> Política de Privacidade</button> e nossos 
            <button className="cookie-link" onClick={() => onOpenLegal('terms')}> Termos de Uso</button>, em conformidade com a LGPD.
          </p>
        </div>
        <button className="cookie-accept-btn" onClick={handleAccept}>
          Entendi e Aceito
        </button>
      </div>
    </div>
  );
};
