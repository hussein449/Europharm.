
import { Instagram, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-b from-pharma-light to-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-pharma-blue">Euro<span className="text-pharma-dark">Pharm</span></h3>
            <p className="text-gray-600">
              Advanced pharmaceutical solutions for modern healthcare challenges.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-pharma-light transition-colors">
                <Facebook size={18} className="text-pharma-blue" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-pharma-light transition-colors">
                <Twitter size={18} className="text-pharma-blue" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-pharma-light transition-colors">
                <Instagram size={18} className="text-pharma-blue" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-pharma-light transition-colors">
                <Linkedin size={18} className="text-pharma-blue" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pharma-dark">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-600 hover:text-pharma-blue transition-colors">Products</a></li>
              <li><a href="#cycles" className="text-gray-600 hover:text-pharma-blue transition-colors">Cycles</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-pharma-blue transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-pharma-blue transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pharma-dark">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Pharmaceutical Development</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Quality Control</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Clinical Research</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Regulatory Affairs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Medical Education</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pharma-dark">Newsletter</h4>
            <p className="text-gray-600">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-pharma-blue focus:border-transparent w-full"
              />
              <button className="bg-pharma-blue text-white px-4 py-2 rounded-r-lg hover:bg-pharma-dark transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} EuroPharm. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-pharma-blue transition-colors">Cookies</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pharma-light transition-colors"
          >
            <ArrowUp size={20} className="text-pharma-blue" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
