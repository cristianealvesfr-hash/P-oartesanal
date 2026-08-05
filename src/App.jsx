import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryNav } from './components/CategoryNav';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { CartProvider } from './context/CartContext';
import { FloatingSocialButtons } from './components/FloatingSocialButtons';
import { products, categories } from './data/menu';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal } from './components/LegalModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toast } from './components/Toast';
import { FloatingCartBar } from './components/FloatingCartBar';
import { GalleryMarquee } from './components/GalleryMarquee';

function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [legalModalType, setLegalModalType] = useState(null);

  const openLegalModal = (type) => setLegalModalType(type);
  const closeLegalModal = () => setLegalModalType(null);

  return (
    <CartProvider>
      <div className="app-container">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <ErrorBoundary>
          <main className="shop-layout">
            <div className="shop-main-col">
              {!searchQuery && <HeroCarousel />}
              
              <CategoryNav 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
                setSearchQuery={setSearchQuery}
              />
              
              <ProductList 
                products={products}
                searchQuery={searchQuery}
              />

              <GalleryMarquee />

              <Testimonials />
            </div>

            <div className="shop-cart-col">
              <Cart />
            </div>
          </main>
        </ErrorBoundary>

        <Footer onOpenLegal={openLegalModal} />
        <FloatingSocialButtons />
        <CookieConsent onOpenLegal={openLegalModal} />
        {legalModalType && (
          <LegalModal type={legalModalType} onClose={closeLegalModal} />
        )}
        <Toast />
        <FloatingCartBar />
      </div>
    </CartProvider>
  );
}

export default App;
