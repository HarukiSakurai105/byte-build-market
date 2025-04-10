
interface ProductsCountProps {
  count: number;
}

const ProductsCount = ({ count }: ProductsCountProps) => {
  return (
    <p className="text-gray-400">
      Showing {count} products
    </p>
  );
};

export default ProductsCount;
