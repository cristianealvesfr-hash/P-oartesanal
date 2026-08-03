import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    text: "Os pães recheados são maravilhosos! A massa é super leve e o recheio de frango é muito bem temperado. O melhor pão artesanal da região!",
    name: "Maria Silva",
    role: "Cliente"
  },
  {
    id: 2,
    text: "Comprei o kit da linha Segredos para o lanche da tarde com a família e foi um sucesso absoluto. O de goiabada derrete na boca!",
    name: "João Pedro",
    role: "Cliente"
  },
  {
    id: 3,
    text: "Atendimento impecável e capricho na embalagem. Os pães chegaram super macios. Sem dúvidas, ganharam uma cliente assídua.",
    name: "Ana Laura",
    role: "Cliente"
  },
  {
    id: 4,
    text: "O pão com doce de leite é simplesmente perfeito. Lembra muito o pão que minha avó fazia. Sabor de infância, recomendo demais!",
    name: "Carlos Eduardo",
    role: "Cliente"
  },
  {
    id: 5,
    text: "Ótima opção para presentear! Comprei os kits de lembrancinha e todo mundo elogiou muito a maciez e o sabor dos pães.",
    name: "Fernanda Lima",
    role: "Organizadora de Eventos"
  },
  {
    id: 6,
    text: "Nunca comi uma massa tão gostosa. O Pão Presente tradicional com um cafézinho preto não tem igual. Qualidade incrível, nota 10!",
    name: "Roberto Alves",
    role: "Cliente"
  }
];

export const Testimonials = () => {
  // Duplicamos a lista para criar o efeito de loop infinito suave
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2>O que nossos clientes dizem</h2>
          <p>O carinho e a qualidade que colocamos em cada receita refletem no sorriso e na satisfação de quem prova as nossas delícias.</p>
        </div>
      </div>
      
      <div className="testimonials-slider-container">
        <div className="testimonials-track">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="testimonial-card">
              <div className="stars">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className="star">{star}</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
