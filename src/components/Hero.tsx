import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-gradient-to-r from-indigo-600 to-purple-700 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Content */}
          <div className={`text-white transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Make Your Brand <span className="text-yellow-300">Speak!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-lg">
              Custom printing, branding & advertising solutions that turn your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-indigo-700 px-8 py-3 rounded-full font-medium flex items-center justify-center hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                Get a Free Quote
                <ArrowRight size={18} className="ml-2" />
              </button>
              <button 
                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium flex items-center justify-center hover:bg-white hover:text-indigo-700 transition duration-300 ease-in-out"
              >
                See Our Work
              </button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="relative p-4 rounded-lg shadow-2xl bg-transparent">
                <img 
                  src="https://img.freepik.com/free-photo/young-girl-with-pink-hairs-sending-positive-vibe_114579-22003.jpg?t=st=1746540476~exp=1746544076~hmac=b4f6dbd0a297955a0efbaa25bf721db618bb91b7dbaf96de3f0b4c90041ae4fc&w=1380"
                  alt="Custom printed t-shirts and apparel" 
                  className="w-full h-auto rounded-md"
                  />
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,192L48,186.7C96,181,192,171,288,160C384,149,480,139,576,160C672,181,768,235,864,240C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
