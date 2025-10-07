import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../data/mockData';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'prev' 
      ? selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      : selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1;
    
    setSelectedImage(newIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Galereya
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ushbu suratga olingan lahzalar orqali go'zal masjidimiz va jonli jamiyatimizni o'rganing
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-square"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`Mosque gallery ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 border-2 border-emerald-400/0 group-hover:border-emerald-400/60 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300">
            <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Navigation Buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>

                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}

              {/* Main Image Container */}
              <div className="relative w-full h-full flex items-center justify-center p-16">
                <img
                  src={galleryImages[selectedImage]}
                  alt={`Chimir ota Jome Masjidi ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
                  style={{ maxHeight: 'calc(90vh - 8rem)' }}
                />
              </div>

              {/* Image Counter and Info */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20 shadow-2xl">
                  <div className="text-center">
                    <p className="text-lg font-medium">
                      {selectedImage + 1} / {galleryImages.length}
                    </p>
                    <p className="text-sm text-white/80 mt-1">
                      Chimir ota Jome Masjidi
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex space-x-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
                    {galleryImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                          index === selectedImage 
                            ? 'border-white scale-110 shadow-lg' 
                            : 'border-white/30 opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-stone-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">Go'zal masjidimizga tashrif buyuring</h3>
            <p className="text-gray-700 leading-relaxed">
              Bizning masjid eshiklari islam haqida o'rganishni, me'morchiligimizni his qilishni 
              yoki shunchaki tinchlik va fikrlash lahzasini topishni istagan tashrif buyuruvchilar 
              uchun doim ochiq. Biz har xil kelib chiqishga ega odamlarni islom madaniyati 
              va jamiyatining go'zalligini kashf qilishga xush kelibsiz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;