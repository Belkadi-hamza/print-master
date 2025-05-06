import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

// Sample testimonial data
const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    image: "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "PrintMaster delivered exceptional quality for our company's branded merchandise. The team was responsive, creative, and met our tight deadline. Our employees and clients love the custom t-shirts and promotional materials!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Event Coordinator",
    company: "Urban Festival",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "We needed hundreds of custom t-shirts, banners, and flyers for our annual music festival, and PrintMaster exceeded our expectations. The vibrant colors and durable prints were exactly what we wanted.",
    rating: 5
  },
  {
    id: 3,
    name: "Jennifer Lee",
    role: "Owner",
    company: "Bright Bean Café",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Our café needed a complete rebrand, and PrintMaster handled everything from logo design to printed menus and staff uniforms. The cohesive look has really elevated our brand image and customers have noticed!",
    rating: 4
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Coach",
    company: "Westfield Hawks",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "The custom jerseys PrintMaster created for our basketball team are outstanding. The quality is top-notch, the designs are eye-catching, and they've held up well throughout the season. Highly recommend!",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  // Auto advance testimonials
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonialData.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Navigation functions
  const goToPrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? testimonialData.length - 1 : prev - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex(prev => 
      (prev + 1) % testimonialData.length
    );
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={18} 
        className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Don't just take our word for it — hear from our satisfied clients about their experiences working with us.
          </p>
        </div>
        
        {/* Testimonial Slider */}
        <div className={`max-w-4xl mx-auto relative transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row">
                {/* Client Image and Info */}
                <div className="mb-8 md:mb-0 md:mr-8 flex flex-col items-center md:items-start">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimonialData[currentIndex].image} 
                      alt={testimonialData[currentIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-bold text-lg text-gray-900">
                      {testimonialData[currentIndex].name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {testimonialData[currentIndex].role}
                    </p>
                    <p className="text-indigo-600 text-sm font-medium">
                      {testimonialData[currentIndex].company}
                    </p>
                    <div className="flex mt-2 justify-center md:justify-start">
                      {renderStars(testimonialData[currentIndex].rating)}
                    </div>
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <div className="flex-1">
                  <div className="text-indigo-600 text-6xl font-serif mb-4">"</div>
                  <p className="text-gray-700 italic mb-4 text-lg">
                    {testimonialData[currentIndex].content}
                  </p>
                  <div className="text-indigo-600 text-6xl font-serif text-right">"</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slider Controls */}
          <div className="mt-8 flex justify-between items-center">
            <button 
              onClick={goToPrev}
              className="bg-white p-3 rounded-full shadow-md text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-indigo-600 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="bg-white p-3 rounded-full shadow-md text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;