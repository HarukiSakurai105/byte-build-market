
interface ProductHeaderProps {
  title: string;
  description: string;
  className?: string;
}

const ProductHeader = ({ title, description, className = "" }: ProductHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className={`text-3xl font-bold mb-2 ${className}`}>{title}</h1>
      <p className={`text-gray-300 ${className}`}>{description}</p>
    </div>
  );
};

export default ProductHeader;
