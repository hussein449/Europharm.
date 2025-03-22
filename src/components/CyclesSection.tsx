
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import CycleCard from './CycleCard';

const cyclesData = [
  {
    id: 1,
    title: "Antibiotic Cycle",
    description: "Advanced antibiotic formulations designed for maximum efficacy with minimal side effects.",
    imageSrc: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    category: "Antibiotics"
  },
  {
    id: 2,
    title: "Pain Management",
    description: "Comprehensive pain management solutions for acute and chronic conditions.",
    imageSrc: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    category: "Analgesics"
  },
  {
    id: 3,
    title: "Cardiovascular Therapy",
    description: "Innovative treatments for cardiovascular health and maintenance.",
    imageSrc: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Cardiology"
  },
  {
    id: 4,
    title: "Respiratory Solutions",
    description: "Advanced formulations for respiratory health and treatment of related conditions.",
    imageSrc: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Pulmonology"
  },
  {
    id: 5,
    title: "Metabolic Management",
    description: "Comprehensive solutions for metabolic disorders and related conditions.",
    imageSrc: "https://images.unsplash.com/photo-1631815579574-675b46af4202?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    category: "Metabolism"
  },
  {
    id: 6,
    title: "Neurological Therapy",
    description: "Advanced treatments for neurological disorders and cognitive health.",
    imageSrc: "https://images.unsplash.com/photo-1559757175-7cb058a4152e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
    category: "Neurology"
  }
];

const CyclesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="cycles" className="py-20 bg-gradient-to-b from-white to-pharma-light" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block pill-badge mb-4">Our Pharmaceutical Cycles</div>
          <h2 className="font-bold text-pharma-dark mb-4">
            Innovative <span className="text-pharma-blue">Treatment Cycles</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of pharmaceutical cycles designed to provide optimal treatment outcomes for various medical conditions.
          </p>
        </div>

        <div 
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {cyclesData.map((cycle, index) => (
            <CycleCard
              key={cycle.id}
              title={cycle.title}
              description={cycle.description}
              imageSrc={cycle.imageSrc}
              category={cycle.category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CyclesSection;
