import React from 'react';
import { Calendar, Clock, ArrowRight, Users } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const Events: React.FC = () => {
  const { events } = useAdmin();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-br from-emerald-50 to-stone-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Latest News
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Read the latest announcements, community updates, and important notices from the masjid
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent"></div>
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="text-center">
                    <div className="text-emerald-700 font-bold text-lg">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-emerald-600 text-xs uppercase font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-8">
                <div className="flex items-center space-x-2 text-emerald-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatDate(event.date)}</span>
                </div>

                <h3 className="text-xl font-bold text-emerald-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {event.title}
                </h3>

                <div className="flex items-center space-x-2 text-amber-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{event.time}</span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Learn More Button */}
                <button className="group/btn inline-flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors duration-200">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-3xl p-10 max-w-4xl mx-auto text-white">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-emerald-300" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
            <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
              Never miss an important event or announcement. Join our community newsletter 
              to receive updates about prayer times, special events, and community news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
                Subscribe to Newsletter
              </button>
              <button className="border-2 border-emerald-300 text-emerald-100 hover:bg-emerald-300 hover:text-emerald-900 px-8 py-3 rounded-full font-medium transition-all duration-300">
                View Event Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;