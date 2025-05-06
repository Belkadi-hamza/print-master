import React from 'react';
import { Clock, Award, Palette, HeadphonesIcon } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const features = [
  {
    id: 1,
    title: 'Fast Turnaround',
    description: 'We deliver your projects quickly without compromising on quality. Our efficient workflow ensures you meet your deadlines.',
    icon: <Clock size={32} className="text-indigo-600" />
  },
  {
    id: 2,
    title: 'Premium Quality',
    description: 'We use top-grade materials and cutting-edge printing technology to ensure vibrant colors and long-lasting results.',
    icon: <Award size={32} className="text-indigo-600" />
  },
  {
    id: 3,
    title: 'Custom Design Service',
    description: 'Our professional designers help bring your ideas to life or create something amazing from scratch just for you.',
    icon: <Palette size={32} className="text-indigo-600" />
  },
  {
    id: 4,
    title: '24/7 Customer Support',
    description: 'We\'re always available to answer your questions and address concerns at any stage of your project.',
    icon: <HeadphonesIcon size={32} className="text-indigo-600" />
  }
];

const Features = () => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  return (
    <section 
      id="features" 
      ref={ref}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Here's what sets us apart from the competition and why our clients continue to choose us for their printing and design needs.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`bg-white rounded-xl p-6 shadow-md transition-all duration-700 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-3 bg-indigo-50 inline-block rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className={`mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to start your project?</h3>
              <p className="text-indigo-100">
                Contact us today for a free consultation and quote!
              </p>
            </div>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;