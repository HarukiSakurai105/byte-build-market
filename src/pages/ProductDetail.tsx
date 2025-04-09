
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductById } from "@/data/products";
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch product details
    if (id) {
      const productData = getProductById(Number(id));
      if (productData) {
        setProduct(productData);
        
        // Get related products (from same category)
        const related = Array.from({ length: 4 }, () => {
          const randomId = Math.floor(Math.random() * 12) + 1;
          return getProductById(randomId);
        }).filter(p => p && p.id !== Number(id));
        
        setRelatedProducts(related as any[]);
      }
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} (Qty: ${quantity})`,
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };

  // Mock product specifications
  const specifications = [
    { name: "Processor", value: "Intel Core i9-13900K / AMD Ryzen 9 7950X" },
    { name: "Memory", value: "32GB DDR5 5600MHz" },
    { name: "Graphics", value: "NVIDIA GeForce RTX 4070 Ti 12GB" },
    { name: "Storage", value: "2TB NVMe SSD" },
    { name: "Cooling", value: "360mm AIO Liquid Cooler" },
    { name: "Power Supply", value: "850W 80+ Gold" },
    { name: "Operating System", value: "Windows 11 Pro" },
    { name: "Warranty", value: "3 Years" },
  ];

  // Multiple product images (using the same image for demonstration)
  const productImages = product 
    ? [product.image, product.image, product.image, product.image] 
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse h-8 w-36 bg-gray-700 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button>
              <Link to="/products">Return to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/category/gaming-pcs" className="flex items-center text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gaming PCs
            </Link>
          </Button>
        </div>
        
        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border border-gray-800">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, idx) => (
                <button 
                  key={idx}
                  className={`aspect-square rounded border ${
                    selectedImage === idx 
                      ? 'border-tech-blue' 
                      : 'border-gray-800 hover:border-gray-600'
                  } overflow-hidden`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img 
                    src={img} 
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-2 flex items-center">
              <span className="text-sm bg-tech-blue/20 text-tech-blue px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.isNew && (
                <span className="ml-2 text-sm bg-tech-purple/20 text-tech-purple px-3 py-1 rounded-full">
                  New Arrival
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">{product.rating.toFixed(1)} (124 reviews)</span>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold mr-4">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            <div className="mb-8">
              <p className="text-gray-300 mb-4">
                Experience next-level gaming with our high-performance {product.name}. Built with premium components and expert craftsmanship to deliver exceptional frame rates, stunning visuals, and reliable performance for years to come.
              </p>
              
              <ul className="space-y-2">
                {specifications.slice(0, 4).map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-tech-blue mr-2">•</span>
                    <span><span className="text-gray-400">{spec.name}:</span> {spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-700 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decrementQuantity} 
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none rounded-l-md"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 text-center">{quantity}</div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={incrementQuantity}
                    className="h-10 w-10 rounded-none rounded-r-md"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <Button className="w-full bg-tech-blue hover:bg-tech-blue/90" size="lg" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1 border-gray-700">
                  <Heart className="mr-2 h-5 w-5" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1 border-gray-700">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-6">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-tech-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  Free Shipping
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-tech-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  3-Year Warranty
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-tech-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                  30-Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="border-b border-gray-800 bg-transparent w-full justify-start">
            <TabsTrigger value="specifications" className="data-[state=active]:border-tech-blue data-[state=active]:text-tech-blue border-b-2 border-transparent rounded-none">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="description" className="data-[state=active]:border-tech-blue data-[state=active]:text-tech-blue border-b-2 border-transparent rounded-none">
              Description
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:border-tech-blue data-[state=active]:text-tech-blue border-b-2 border-transparent rounded-none">
              Reviews (124)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="pt-6">
            <div className="bg-card rounded-lg border border-gray-800 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="pb-3 border-b border-gray-800">
                    <div className="text-gray-400 mb-1">{spec.name}</div>
                    <div className="font-medium">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="description" className="pt-6">
            <div className="bg-card rounded-lg border border-gray-800 p-6">
              <p className="mb-4">
                The {product.name} is designed for gamers who demand the highest performance and stunning visuals in their gaming experience. Equipped with the latest generation processors and graphics technology, this PC delivers exceptional frame rates in the most demanding games at high resolutions.
              </p>
              <p className="mb-4">
                Every component is carefully selected and tested to ensure seamless compatibility and maximum performance. The premium cooling solution keeps temperatures low even during intensive gaming sessions, allowing for stable performance and potential overclocking.
              </p>
              <p>
                Our custom-built gaming PCs come with a clean Windows installation, free from bloatware, and are backed by our comprehensive 3-year warranty and lifetime technical support.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <div className="bg-card rounded-lg border border-gray-800 p-6">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">Customer Reviews Coming Soon</h3>
                <p className="text-gray-400">We're currently collecting reviews for this product.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
