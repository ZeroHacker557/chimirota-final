import React from 'react';
import { Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPrayerTimes = () => {
    const element = document.getElementById('prayer-times');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Mosque at dusk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-emerald-800/70 to-amber-900/60"></div>
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Chimir ota Jome Masjidi
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            A place of worship, knowledge, and unity
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mb-8 rounded-full"></div>
        </div>

        <button
          onClick={scrollToPrayerTimes}
          className="inline-flex items-center space-x-3 bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <Clock className="w-6 h-6" />
          <span>View Prayer Times</span>
        </button>

        {/* Decorative Arabic Calligraphy */}
        <div className="mt-16 text-center">
          <p className="text-emerald-200 text-lg opacity-80">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="text-emerald-300 text-sm mt-2 opacity-70">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-white to-transparent rounded-full opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;