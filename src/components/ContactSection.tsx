
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactInfo = ({ icon: Icon, title, content, delay }: { 
  icon: React.ElementType; 
  title: string; 
  content: string;
  delay: number;
}) => {
  return (
    <div 
      className="flex items-start space-x-4 slide-up-animation" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pharma-light flex items-center justify-center">
        <Icon size={20} className="text-pharma-blue" />
      </div>
      <div>
        <h4 className="text-base font-medium text-pharma-dark">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Message sent! (This is a demo)');
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
    <section id="contact" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block pill-badge mb-4">Get In Touch</div>
          <h2 className="font-bold text-pharma-dark mb-4">
            Contact <span className="text-pharma-blue">Our Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reach out to us for more information about our pharmaceutical products and services.
          </p>
        </div>

        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 transition-opacity duration-700",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="space-y-8">
            <ContactInfo 
              icon={Phone} 
              title="Phone Number" 
              content="+1 (234) 567-8901" 
              delay={0.1}
            />
            <ContactInfo 
              icon={Mail} 
              title="Email Address" 
              content="info@europharm.com" 
              delay={0.2}
            />
            <ContactInfo 
              icon={MapPin} 
              title="Office Location" 
              content="123 Pharma Street, Medical District, NY 10001" 
              delay={0.3}
            />
            <ContactInfo 
              icon={Clock} 
              title="Working Hours" 
              content="Monday - Friday: 9AM - 5PM" 
              delay={0.4}
            />
            
            <div className="glass-card rounded-xl p-6 mt-8 slide-up-animation" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-xl font-semibold mb-4 text-pharma-dark">Our Mission</h3>
              <p className="text-gray-600">
                At EuroPharm, we are dedicated to advancing healthcare through innovative pharmaceutical solutions that improve quality of life and treatment outcomes for patients worldwide.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8 slide-up-animation" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-semibold mb-6 text-pharma-dark">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharma-blue focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharma-blue focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharma-blue focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharma-blue focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-pharma-blue text-white rounded-lg hover:bg-pharma-dark transition-colors flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
