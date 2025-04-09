
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-tech-black text-gray-300 mt-12 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">ByteBuild</h2>
            <p className="mb-4">Your trusted source for premium PCs and laptops. We deliver cutting-edge technology and exceptional performance.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-tech-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-tech-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-tech-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-tech-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/laptops" className="hover:text-tech-blue transition-colors">Laptops</Link>
              </li>
              <li>
                <Link to="/category/gaming-pcs" className="hover:text-tech-blue transition-colors">Gaming PCs</Link>
              </li>
              <li>
                <Link to="/category/components" className="hover:text-tech-blue transition-colors">Components</Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-tech-blue transition-colors">Accessories</Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-tech-blue transition-colors">Deals</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-tech-blue transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-tech-blue transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-tech-blue transition-colors">Warranty</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-tech-blue transition-colors">Returns</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-tech-blue transition-colors">Shipping</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-tech-blue" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-tech-blue" />
                <span>support@bytebuild.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-tech-blue" />
                <span>123 Tech Street, Silicon Valley, CA 94043</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 ByteBuild. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
