export const categories = [
  { id: 'tradicionais', name: 'Pães Tradicionais', image: '/assets/pão de casa png 2.png' },
  { id: 'kits', name: 'Kits Lembrancinha', image: '/assets/pão de casa png 3.png' },
  { id: 'segredos', name: 'Linha Segredos de Família (Recheados)', image: '/assets/pão de casa png 6.png' }
];

export const products = [
  // Pães Tradicionais
  {
    id: 'p1',
    categoryId: 'tradicionais',
    name: 'Pão Presente',
    description: 'Massa adocicada e perfeita para ser consumida com ou sem acompanhamentos, ótima para recheios doces ou salgados. 400G',
    price: 15.00,
    image: '/assets/pão de casa png 2.png',
    type: 'standard',
    badge: 'Mais Vendido'
  },
  {
    id: 'p4',
    categoryId: 'tradicionais',
    name: 'Presente Recheado (Presunto e Muçarela)',
    description: 'Pão com leite, macio e gostoso com 215G de recheio de presunto e muçarela. 600G',
    price: 23.00,
    image: '/assets/presente_recheado_presunto.jpg',
    type: 'standard'
  },
  {
    id: 'p5',
    categoryId: 'tradicionais',
    name: 'Presente Recheado (Frango)',
    description: 'Pão com leite, macio e gostoso com 215G de recheio de frango temperado. 600G',
    price: 23.00,
    image: '/assets/pão de casa png 5.png',
    type: 'standard',
    badge: 'Novidade'
  },

  // Kits Lembrancinha
  {
    id: 'p2',
    categoryId: 'kits',
    name: 'Kit 1 Pão Lembrancinha',
    description: '8 pães de massa leve com 50G cada, ideal para lanches rápidos.',
    price: 15.00,
    image: '/assets/pão de casa png 3.png',
    type: 'standard'
  },
  {
    id: 'p3',
    categoryId: 'kits',
    name: 'Kit 2 Pão Lembrança',
    description: '5 pães leves de 80G cada e com leite, ideal para lanches e lancheiras. 400G',
    price: 15.00,
    image: '/assets/kit_2_pao_lembranca.jpg',
    type: 'standard'
  },

  // Linha Segredos de Família (Pães pequenos de 50g)
  {
    id: 's1',
    categoryId: 'segredos',
    name: 'O preferido da Mamãe',
    flavor: 'Doce de leite',
    description: 'Doce de leite tradicional na medida certa! Valor por Unidade (50g de massa e 25g de recheio).',
    price: 4.50,
    image: '/assets/pão de casa png 7.png',
    type: 'standard',
    badge: 'Mais Vendido'
  },
  {
    id: 's2',
    categoryId: 'segredos',
    name: 'Mimado da Dinda',
    flavor: 'Chocolate',
    description: 'Doce de leite com chocolate na medida certa! Valor por Unidade (50g de massa e 25g de recheio).',
    price: 4.50,
    image: '/assets/pão de casa png 8.png',
    type: 'standard'
  },
  {
    id: 's3',
    categoryId: 'segredos',
    name: 'Segredo da Avó',
    flavor: 'Goiabada',
    description: 'Goiabada que derrete na boca! Valor por Unidade (50g de massa e 25g de recheio).',
    price: 4.50,
    image: '/assets/pão de casa png 9.png',
    type: 'standard'
  },
  {
    id: 's4',
    categoryId: 'segredos',
    name: 'Casal Perfeito',
    flavor: 'Queijo e goiabada',
    description: 'Queijo e goiabada na proporção perfeita! Valor por Unidade (50g de massa e 25g de recheio).',
    price: 4.50,
    image: '/assets/casal_perfeito.jpg',
    type: 'standard',
    badge: 'Favorito'
  },
  {
    id: 's5',
    categoryId: 'segredos',
    name: 'Casa Cheia',
    flavor: 'Queijo e doce de leite',
    description: 'Queijo e doce de leite na proporção perfeita! Valor por Unidade (50g de massa e 25g de recheio).',
    price: 4.50,
    image: '/assets/casa_cheia.jpg',
    type: 'standard'
  }
];

// Removendo boxFlavors pois não usaremos mais o modal híbrido.
