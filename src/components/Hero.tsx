
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-tech-black via-tech-darkcharcoal to-tech-black z-0"></div>
      
      {/* Tech circuit board pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20 z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          mixBlendMode: "overlay"
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-24 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block mb-2">Next-Gen Tech,</span>
            <span className="bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
              Limitless Performance
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Experience computing excellence with our premium selection of 
            custom-built PCs and high-performance laptops designed for gamers,
            creators, and professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-tech-blue hover:bg-tech-blue/90 text-white font-medium">
              <Link to="/category/gaming-pcs" className="flex items-center">
                Explore Gaming PCs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-tech-purple text-tech-purple hover:bg-tech-purple/10">
              <Link to="/category/laptops">Shop Laptops</Link>
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-tech-blue/20 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-tech-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-400">On orders over $999</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-tech-purple/20 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-tech-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">3-Year Warranty</h3>
                <p className="text-sm text-gray-400">On all custom builds</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-tech-blue/20 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-tech-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">30-Day Returns</h3>
                <p className="text-sm text-gray-400">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
