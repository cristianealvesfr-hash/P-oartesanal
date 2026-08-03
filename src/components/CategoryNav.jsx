import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/menu';
import './CategoryNav.css';

export const CategoryNav = ({ activeCategory, setActiveCategory, setSearchQuery }) => {
  const scrollRef = useRef(null);

  const handleScroll = (id) => {
    setActiveCategory(id);
    if (setSearchQuery) setSearchQuery(''); // Limpa a busca
    
    // Aguarda um ciclo de renderização para garantir que a lista voltou ao normal antes de rolar
    setTimeout(() => {
      const element = document.getElementById(`category-${id}`);
      if (element) {
        const headerOffset = 180; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-nav-container">
      <div className="container category-nav-wrapper">
        <button className="nav-arrow-category" onClick={scrollLeft} aria-label="Rolar para a esquerda">
          <ChevronLeft size={20} />
        </button>
        
        <div className="category-list" ref={scrollRef}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-circular-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleScroll(category.id)}
            >
              <div className="category-img-wrapper">
                <img src={category.image} alt={category.name} />
              </div>
              <span className="category-label">{category.name}</span>
            </button>
          ))}
        </div>

        <button className="nav-arrow-category" onClick={scrollRight} aria-label="Rolar para a direita">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
