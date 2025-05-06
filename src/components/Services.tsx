import React from 'react';
import { Shirt, Palette, FileImage } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const serviceItems = [
  {
    id: 1,
    title: 'Custom Clothing Printing',
    description: 'High-quality printing on t-shirts, hoodies, caps, and more. Perfect for businesses, events, teams, or personal use.',
    icon: <Shirt size={40} className="text-indigo-600" />,
    examples: ['T-shirts', 'Hoodies', 'Caps', 'Uniforms'],
    image: 'https://images.pexels.com/photos/5699163/pexels-photo-5699163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Logo Design & Branding',
    description: 'Create a memorable brand identity with our professional logo design services. We help establish your visual brand presence.',
    icon: <Palette size={40} className="text-indigo-600" />,
    examples: ['Logo Design', 'Brand Identity', 'Style Guides', 'Business Cards'],
    image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Visual Advertising',
    description: 'Eye-catching promotional materials to boost your marketing efforts. From flyers to vehicle wraps, we make you stand out.',
    icon: <FileImage size={40} className="text-indigo-600" />,
    examples: ['Flyers', 'Banners', 'Posters', 'Vehicle Wraps'],
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const Services = () => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            From custom clothing to logo design and visual advertising, we offer comprehensive solutions to bring your brand to life.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <div 
              key={service.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">What we offer:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.examples.map((example, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition duration-300"
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;