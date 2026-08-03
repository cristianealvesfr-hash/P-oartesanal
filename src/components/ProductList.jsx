import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { categories } from '../data/menu';
import './ProductList.css';

export const ProductList = ({ products, searchQuery }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const query = searchQuery ? searchQuery.toLowerCase() : '';

  return (
    <div className="product-list-container">
      <div className="container">
        {categories.map(category => {
          let categoryProducts = products.filter(p => p.categoryId === category.id);
          
          if (query) {
            categoryProducts = categoryProducts.filter(p => 
              p.name.toLowerCase().includes(query) || 
              p.description.toLowerCase().includes(query) ||
              category.name.toLowerCase().includes(query)
            );
          }
          
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} id={`category-${category.id}`} className="category-section">
              <h2 className="category-title">{category.name}</h2>
              <div className="product-grid">
                {categoryProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </section>
          );
        })}
        
        {query && products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || categories.find(c => c.id === p.categoryId)?.name.toLowerCase().includes(query)).length === 0 && (
          <div className="empty-state">
            <p>Nenhum produto encontrado para "{searchQuery}"</p>
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
