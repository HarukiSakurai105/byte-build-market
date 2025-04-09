
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, description, image, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="block group">
      <div className="relative overflow-hidden rounded-lg bg-gray-900 h-64 card-hover border border-gray-800">
        <div className="absolute inset-0">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 p-6 w-full">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4 max-w-xs">{description}</p>
          <div className="flex items-center text-tech-blue group-hover:underline transition-all">
            <span>Shop Now</span>
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedCategories = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard 
            title="Gaming PCs"
            description="Custom-built gaming computers for maximum performance and immersive gameplay."
            image="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            link="/category/gaming-pcs"
          />
          
          <CategoryCard 
            title="Laptops"
            description="Powerful laptops for work, gaming, and creative professionals."
            image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            link="/category/laptops"
          />
          
          <CategoryCard 
            title="Components"
            description="Premium PC components to build or upgrade your custom system."
            image="https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            link="/category/components"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
