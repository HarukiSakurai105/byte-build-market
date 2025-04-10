
import { useState } from "react";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";

interface ProductGridProps {
  products: ProductCardProps[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
      
      {products.length === 0 && (
        <div className="text-center py-12 col-span-full">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-400">Try adjusting your filters or browse our other categories</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
