import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const Events: React.FC = () => {
  const { events } = useAdmin();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const eventsPerPage = 3;
  
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = currentPage * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);
  
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const openDetailModal = (event: any) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-br from-emerald-50 to-stone-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            So'nggi yangiliklar
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Masjiddan so'nggi e'lonlar, jamiyat yangiliklari va muhim xabarlarni o'qing
          </p>
        </div>

        {/* Events Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {currentEvents.map((event, index) => (
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
                <button 
                  onClick={() => openDetailModal(event)}
                  className="group/btn inline-flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 font-medium transition-all duration-300 hover:scale-105 hover:bg-emerald-50 px-4 py-2 rounded-lg"
                >
                  <span>Batafsil</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`p-3 rounded-full transition-all duration-300 ${
                  currentPage === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:scale-110'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentPage 
                        ? 'bg-emerald-600 scale-125' 
                        : 'bg-gray-300 hover:bg-emerald-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`p-3 rounded-full transition-all duration-300 ${
                  currentPage === totalPages - 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:scale-110'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
          
          {/* Page Info */}
          {totalPages > 1 && (
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                {currentPage + 1} / {totalPages} sahifa • Jami {events.length} ta yangilik
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={closeDetailModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {/* Event Title and Date */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-emerald-200 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-medium">{formatDate(selectedEvent.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-medium">{selectedEvent.time}</span>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">{selectedEvent.title}</h2>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 sm:p-6 lg:p-8 max-h-[calc(95vh-12rem)] sm:max-h-[calc(95vh-14rem)] md:max-h-[calc(95vh-16rem)] overflow-y-auto">
              <div className="space-y-6">
                <div className="animate-in slide-in-from-bottom-2 duration-500 delay-100">
                  <h3 className="text-base sm:text-lg font-bold text-emerald-900 mb-3">Qisqa ma'lumot</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                </div>
                
                {selectedEvent.detailed_description && (
                  <div className="animate-in slide-in-from-bottom-2 duration-500 delay-200">
                    <h3 className="text-base sm:text-lg font-bold text-emerald-900 mb-3">Batafsil ma'lumot</h3>
                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-50/50 rounded-xl p-4 sm:p-6 border border-emerald-100 shadow-sm">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedEvent.detailed_description}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-100 space-y-4 sm:space-y-0 animate-in slide-in-from-bottom-2 duration-500 delay-300">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                    <div className="flex items-center space-x-2 text-emerald-600">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-medium">{formatDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-medium">{selectedEvent.time}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={closeDetailModal}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;