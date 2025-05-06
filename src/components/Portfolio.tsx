import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

// Portfolio item interface
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

// Sample portfolio data
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Team Jersey Collection",
    category: "clothing",
    image: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Custom printed jerseys for local sports teams with vibrant colors and durable prints."
  },
  {
    id: 2,
    title: "Modern Brand Identity",
    category: "branding",
    image: "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Complete brand identity package including logo, typography, and color palette."
  },
  {
    id: 3,
    title: "Festival Merchandise",
    category: "clothing",
    image: "https://images.pexels.com/photos/5699426/pexels-photo-5699426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Limited edition t-shirts and hoodies designed for a music festival."
  },
  {
    id: 4,
    title: "Corporate Event Banners",
    category: "advertising",
    image: "https://images.pexels.com/photos/7256883/pexels-photo-7256883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Large format banners and promotional materials for a corporate conference."
  },
  {
    id: 5,
    title: "Streetwear Collection",
    category: "clothing",
    image: "https://images.pexels.com/photos/5698845/pexels-photo-5698845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Urban-inspired custom printed apparel for a local fashion brand."
  },
  {
    id: 6,
    title: "Restaurant Rebrand",
    category: "branding",
    image: "https://images.pexels.com/photos/4064797/pexels-photo-4064797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Complete visual identity update for an established restaurant chain."
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  // Filter categories
  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'branding', label: 'Branding' },
    { value: 'advertising', label: 'Advertising' }
  ];

  // Filter items based on selected category
  const filteredItems = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  return (
    <section 
      id="portfolio" 
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Explore our recent projects and see how we've helped businesses bring their visions to life.
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-10">
          {categories.map(category => (
            <button
              key={category.value}
              className={`px-6 py-2 mx-2 mb-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category.value
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className={`group overflow-hidden rounded-xl shadow-md transition-all duration-700 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/80 text-sm mt-2">{item.description}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-indigo-600 mt-1">
                  {categories.find(cat => cat.value === item.category)?.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found in this category.</p>
          </div>
        )}
        
        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="relative h-[50vh]">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                  onClick={() => setSelectedItem(null)}
                >
                  &times;
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h2>
                <p className="text-indigo-600 mb-4">
                  {categories.find(cat => cat.value === selectedItem.category)?.label}
                </p>
                <p className="text-gray-700">{selectedItem.description}</p>
                <div className="mt-6 text-right">
                  <button 
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    onClick={() => {
                      setSelectedItem(null);
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Request Similar Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;