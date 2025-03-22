
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pharma-light to-white/60 z-0" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDU2YjMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2NWgtMXYtNXptLTItMTFoMXY1aC0xdi01em0yIDJoMXY1aC0xdi01eiIvPjwvZz48L2c+PC9zdmc+')] opacity-60 z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <div className="staggered-animation">
              <div className="inline-block pill-badge mb-4">Premium Pharmaceutical Cycles</div>
              <h1 className="mb-6 font-bold text-pharma-dark">
                Advanced <span className="text-pharma-blue">Pharmaceutical</span> Solutions
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg mx-auto lg:mx-0">
                Delivering high-quality pharmaceutical products with innovative cycles that enhance treatment efficacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#cycles" 
                  className="px-8 py-3 bg-pharma-blue text-white rounded-lg hover:bg-pharma-dark transition-colors shadow-md hover:shadow-lg"
                >
                  Explore Cycles
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-3 bg-white text-pharma-blue border border-pharma-blue rounded-lg hover:bg-pharma-light transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          
          <div className={`w-full lg:w-1/2 mt-12 lg:mt-0 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 bg-pharma-blue rounded-3xl blur-xl opacity-10 transform -rotate-6"></div>
              <div className="glass-card rounded-3xl p-6 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Pharmaceutical Cycles" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#cycles" className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md">
            <ArrowDown size={20} className="text-pharma-blue" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
