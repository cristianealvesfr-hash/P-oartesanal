import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const addToCart = (product, quantity = 1, specialDetails = null) => {
    setCartItems(prev => {
      // Se for um item híbrido (a caixa antiga que removemos, mas deixamos suporte caso precise)
      if (product.type === 'hybrid-box') {
        return [...prev, { ...product, quantity, specialDetails, cartId: Date.now() }];
      }
      
      // Produto normal (incluindo os pães de 50g)
      const existing = prev.find(item => item.id === product.id && item.type === 'standard');
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { ...product, quantity, cartId: Date.now() }];
    });
    
    // Mostra o Toast
    setToastMessage(`${quantity}x ${product.name} adicionado ao carrinho!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Lógica inteligente do Bundle (Mix & Match)
  const bundleLogic = useMemo(() => {
    // Pegar todos os pães da linha 'segredos' que são padrão (avulsos)
    const smallBreads = cartItems.filter(item => item.categoryId === 'segredos' && item.type === 'standard');
    
    let totalSmallBreads = 0;
    let originalSmallBreadsValue = 0;
    
    smallBreads.forEach(item => {
      totalSmallBreads += item.quantity;
      originalSmallBreadsValue += (item.price * item.quantity);
    });

    const bundlesCount = Math.floor(totalSmallBreads / 8);
    const remainder = totalSmallBreads % 8;
    
    // Valor se aplicarmos o desconto
    // Cada combo de 8 custa 28.00. O restante custa o preço normal (4.50).
    // Estamos assumindo que todos os pães de segredos custam 4.50. Se houvesse diferença, a lógica seria mais complexa (ordenando por preço).
    // Mas no menu, todos custam 4.50.
    const discountedSmallBreadsValue = (bundlesCount * 28.00) + (remainder * 4.50);
    
    const discountAmount = originalSmallBreadsValue - discountedSmallBreadsValue;

    return {
      totalSmallBreads,
      bundlesCount,
      remainder,
      discountAmount
    };
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    const rawTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return rawTotal - bundleLogic.discountAmount;
  }, [cartItems, bundleLogic.discountAmount]);

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de fazer uma encomenda:\n\n";
    
    cartItems.forEach(item => {
      message += `*${item.quantity}x ${item.name}*\n`;
      if (item.specialDetails) {
        item.specialDetails.flavors.forEach(f => {
          message += `   - ${f.quantity}x ${f.name}\n`;
        });
      }
      message += `   Valor: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });
    
    if (bundleLogic.discountAmount > 0) {
      message += `*Promoção Kit 8 Sabores (${bundleLogic.bundlesCount}x)*\n`;
      message += `   Desconto: - R$ ${bundleLogic.discountAmount.toFixed(2).replace('.', ',')}\n\n`;
    }
    
    message += `*Total da Encomenda: R$ ${cartTotal.toFixed(2).replace('.', ',')}*\n\n`;
    message += "Aguardando confirmação e chave PIX.";
    
    return encodeURIComponent(message);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      toastMessage,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      generateWhatsAppMessage,
      bundleLogic
    }}>
      {children}
    </CartContext.Provider>
  );
};
