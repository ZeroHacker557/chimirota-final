import React from 'react';
import { Heart, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about-masjid" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/About-photo.jpg"
                alt="Chimir ota Jome Masjidi"
                className="w-full h-[60px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-amber-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-emerald-400 rounded-full opacity-15"></div>
          </div>

          {/* Content Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6 leading-tight">
                Bizning <span className="text-amber-600">Masjidimiz</span> haqida
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mb-8 rounded-full"></div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Chimir ota Jome Masjidi bizning mahallada iymon, jamoa va ruhiy o'sish markazi 
                sifatida xizmat qiladi. O'ttiz yildan ortiq vaqt davomida bizning masjidimiz 
                faqat ibodat joyi bo'lib qolmay, balki musulmon jamiyatimizning markaziga aylandi.
              </p>

              <p>
                Bizning go'zal me'morchiligimiz an'anaviy islom dizaynini zamonaviy funksionallik 
                bilan uyg'unlashtiradi va imonlilar Allah bilan va bir-birlari bilan bog'lanishi 
                mumkin bo'lgan tinch maskanni yaratadi. Masjidda keng namoz xonalari, ayollar 
                uchun maxsus joylar va jamoat yig'ilish joylari mavjud.
              </p>

              <p>
                Biz dinlar o'rtasidagi muloqotni targ'ib qilish va turli ijtimoiy xizmatlar 
                orqali jamiyatimizni qo'llab-quvvatlashga sodiqmiz. Bizning eshiklarimiz 
                ibodat qilish va bizning iliq mehmondostligimizni his qilishni istagan 
                musulmonlar va g'ayr-musulmonlar uchun doim ochiq.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-xl">
                <Heart className="w-8 h-8 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-emerald-900">Jamiyat g'amxo'rligi</h4>
                  <p className="text-sm text-gray-600">Muhtoj oilalarni qo'llab-quvvatlash</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-xl">
                <Users className="w-8 h-8 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-emerald-900">Birlik</h4>
                  <p className="text-sm text-gray-600">Odamlarni birlashtirish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
