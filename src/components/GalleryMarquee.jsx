import React from 'react';
import './GalleryMarquee.css';

export const GalleryMarquee = () => {
  const galleryImages = [
    { src: '/assets/gallery/gallery_1.jpg', alt: 'Pães Tradicionais Artesanais' },
    { src: '/assets/gallery/gallery_2.jpg', alt: 'Pãozinho Recheado com Doce de Leite' },
    { src: '/assets/gallery/gallery_3.jpg', alt: 'Pães Artesanais Dourados no Forno' },
    { src: '/assets/gallery/gallery_4.jpg', alt: 'Pão Recheado com Frango Suculento' },
    { src: '/assets/gallery/gallery_5.jpg', alt: 'Pãozinho Recheado com Chocolate Derretido' },
  ];

  // Duplicate list to achieve seamless infinite marquee loop
  const doubleImages = [...galleryImages, ...galleryImages];

  return (
    <section className="gallery-marquee-section">
      <div className="container">
        <div className="gallery-marquee-header">
          <span className="marquee-badge">🔥 RECÉM-SAÍDOS DO FORNO</span>
          <h2 className="marquee-title">
            Já sentiu aquele cheirinho inconfundível de pão quentinho?
          </h2>
          <p className="marquee-subtitle">
            Feitos à mão, assados com amor e recheados de verdade. Qual é a sua tentação de hoje?
          </p>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {doubleImages.map((img, idx) => (
            <div key={idx} className="marquee-item">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="marquee-overlay">
                <span className="marquee-caption">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
