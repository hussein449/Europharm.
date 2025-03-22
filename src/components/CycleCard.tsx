
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CycleCardProps {
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  index: number;
}

const CycleCard = ({ title, description, imageSrc, category, index }: CycleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-500 hover-lift",
        isHovered ? "shadow-lg" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300",
          isHovered ? "opacity-70" : "opacity-50"
        )} />
        <img 
          src={imageSrc} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          loading="lazy"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="pill-badge">{category}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-pharma-dark">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <a 
          href="#" 
          className="inline-flex items-center text-pharma-blue hover:text-pharma-dark transition-colors"
        >
          Learn more 
          <ChevronRight size={16} className={cn(
            "ml-1 transition-transform duration-300",
            isHovered ? "translate-x-1" : ""
          )} />
        </a>
      </div>
    </div>
  );
};

export default CycleCard;
