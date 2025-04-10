
interface ProductHeaderProps {
  title: string;
  description: string;
}

const ProductHeader = ({ title, description }: ProductHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default ProductHeader;
