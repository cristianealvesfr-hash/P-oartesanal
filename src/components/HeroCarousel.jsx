import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './HeroCarousel.css';

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Monte seu Kit de Pães Recheados",
      description: "Escolha até 8 sabores deliciosos no seu kit sortido. Ideal para compartilhar!",
      image: "/assets/pão de casa png 6.png",
      badge: "ESPECIAL",
      actionText: "Montar Kit",
      action: () => {
        const el = document.getElementById('category-segredos');
        if (el) {
          const headerOffset = 140; 
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    },
    {
      id: 2,
      title: "Pão Presente Tradicional",
      description: "Massa adocicada e leve, perfeita para ser consumida em qualquer momento do dia.",
      image: "/assets/pão de casa png 2.png",
      badge: "TRADICIONAL",
      actionText: "Ver Produto",
      action: () => {
        const el = document.getElementById('category-tradicionais');
        if (el) {
          const headerOffset = 140; 
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    },
    {
      id: 3,
      title: "Presente Recheado",
      description: "Pão artesanal super recheado de 600g para matar a sua fome com muito sabor.",
      image: "/assets/pão de casa png 4.png",
      badge: "MAIS VENDIDO",
      actionText: "Pedir Agora",
      action: () => {
        const el = document.getElementById('category-tradicionais');
        if (el) {
          const headerOffset = 140; 
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="hero-carousel">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(to right, rgba(90, 56, 37, 0.85), rgba(90, 56, 37, 0.3)), url('${slide.image}')` }}
        >
          <div className="container hero-content">
            <span className="hero-badge">{slide.badge}</span>
            <h2 className="hero-title">{slide.title}</h2>
            <p className="hero-desc">{slide.description}</p>
            <button className="hero-btn" onClick={slide.action}>
              {slide.actionText} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      ))}
      
      <button className="nav-arrow prev-arrow" onClick={prevSlide} aria-label="Anterior">
        <ChevronLeft size={28} />
      </button>
      <button className="nav-arrow next-arrow" onClick={nextSlide} aria-label="Próximo">
        <ChevronRight size={28} />
      </button>

      <div className="hero-dots">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            className={`hero-dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
