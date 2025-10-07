import React, { useState, useEffect } from 'react';
import { Clock, Sun, Sunset, Moon, Star, Bell } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const PrayerTimes: React.FC = () => {
  const { prayerTimes } = useAdmin();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [currentPrayerStatus, setCurrentPrayerStatus] = useState<string>('');
  const [isPrayerTime, setIsPrayerTime] = useState<boolean>(false);

  // Helper function to check if it's currently prayer time
  const getCurrentPrayerStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    for (let i = 0; i < prayerTimes.length; i++) {
      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;
      
      // Check if current time is within 15 minutes of prayer time
      if (Math.abs(currentTimeInMinutes - prayerTimeInMinutes) <= 15) {
        setIsPrayerTime(true);
        return `${prayerTimes[i].name} vaqti!`;
      }
    }
    setIsPrayerTime(false);
    return '';
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentPrayerStatus(getCurrentPrayerStatus());
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  // Calculate next prayer and time remaining
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    let nextPrayerIndex = -1;
    let nextPrayerName = '';
    let nextPrayerTime = '';
    
    // Convert prayer times to minutes for easier comparison
    const prayerTimesInMinutes = prayerTimes.map(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      return {
        ...prayer,
        timeInMinutes: hours * 60 + minutes
      };
    });
    
    // Find the next prayer
    for (let i = 0; i < prayerTimesInMinutes.length; i++) {
      if (currentTimeInMinutes < prayerTimesInMinutes[i].timeInMinutes) {
        nextPrayerIndex = i;
        nextPrayerName = prayerTimesInMinutes[i].name;
        nextPrayerTime = prayerTimesInMinutes[i].time;
        break;
      }
    }
    
    // If no prayer found for today, next prayer is tomorrow's first prayer (Bomdod)
    if (nextPrayerIndex === -1 && prayerTimesInMinutes.length > 0) {
      nextPrayerIndex = 0;
      nextPrayerName = prayerTimesInMinutes[0].name;
      nextPrayerTime = prayerTimesInMinutes[0].time;
    }
    
    setNextPrayer(nextPrayerName);
    setActiveIndex(nextPrayerIndex);
    
    // Calculate time difference
    if (nextPrayerTime) {
      const [hours, minutes] = nextPrayerTime.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);
      
      // If prayer time has passed today, it's tomorrow
      if (prayerTime.getTime() <= now.getTime()) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }
      
      const diff = prayerTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hoursLeft > 0) {
        if (hoursLeft >= 24) {
          setTimeUntilNext(`Ertaga ${minutesLeft} daqiqa`);
        } else {
          setTimeUntilNext(`${hoursLeft} soat ${minutesLeft} daqiqa`);
        }
      } else {
        setTimeUntilNext(`${minutesLeft} daqiqa`);
      }
    }
  }, [currentTime, prayerTimes]);
  
  const getIcon = (prayerName: string, isActive: boolean = false) => {
    const iconClass = `w-8 h-8 transition-all duration-300 ${isActive ? 'scale-110' : ''}`;
    
    switch (prayerName.toLowerCase()) {
      case 'bomdod':
        return <Moon className={`${iconClass} text-indigo-500`} />;
      case 'peshin':
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case 'asr':
        return <Sun className={`${iconClass} text-orange-500`} />;
      case 'shom':
        return <Sunset className={`${iconClass} text-rose-500`} />;
      case 'hufton':
        return <Star className={`${iconClass} text-purple-500`} />;
      default:
        return <Clock className={`${iconClass} text-emerald-500`} />;
    }
  };

  const getPrayerGradient = (prayerName: string) => {
    switch (prayerName.toLowerCase()) {
      case 'bomdod':
        return 'from-indigo-50 to-purple-50 border-indigo-200';
      case 'peshin':
        return 'from-yellow-50 to-amber-50 border-yellow-200';
      case 'asr':
        return 'from-orange-50 to-red-50 border-orange-200';
      case 'shom':
        return 'from-rose-50 to-pink-50 border-rose-200';
      case 'hufton':
        return 'from-purple-50 to-indigo-50 border-purple-200';
      default:
        return 'from-emerald-50 to-teal-50 border-emerald-200';
    }
  };

  return (
    <>
      {/* Prayer Time Alert */}
      {isPrayerTime && currentPrayerStatus && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 shadow-lg animate-pulse">
          <div className="container mx-auto flex items-center justify-center space-x-3">
            <Bell className="w-6 h-6 animate-bounce" />
            <span className="text-lg font-bold">{currentPrayerStatus}</span>
            <span className="text-sm opacity-90">Namozga tayyorlaning</span>
          </div>
        </div>
      )}

      <section id="prayer-times" className={`py-24 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/50 relative overflow-hidden ${isPrayerTime ? 'pt-32' : ''}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-100/10 to-transparent rounded-full animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-blue-600 mb-6 animate-fade-in-up">
              Namoz Vaqtlari
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 mx-auto mb-8 rounded-full animate-shimmer"></div>
          </div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Kundalik namazlarga qo'shiling va ibodat va fikrlashda jamiyatimiz bilan bog'laning
          </p>
        </div>

        {/* Enhanced Next Prayer Display */}
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto">
            {/* Next Prayer Info */}
            {nextPrayer && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up delay-400">
                <div className="text-center">
                  <div className="text-gray-600 text-sm font-medium mb-2">
                    Keyingi namoz
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {nextPrayer}
                  </h3>
                  
                  <div className="text-3xl font-bold text-emerald-600 mb-3">
                    {prayerTimes.find(p => p.name === nextPrayer)?.time}
                  </div>
                  
                  {timeUntilNext && (
                    <div className="bg-gray-50 rounded-full px-4 py-2 inline-block">
                      <span className="text-gray-700 font-medium">
                        {timeUntilNext} qoldi
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {prayerTimes.map((prayer, index) => {
            const isActive = activeIndex === index;
            const isNext = nextPrayer === prayer.name;
            
            return (
              <div
                key={prayer.name}
                className={`group relative bg-gradient-to-br ${getPrayerGradient(prayer.name)} backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isNext ? 'ring-4 ring-emerald-400 scale-105' : ''
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Next Prayer Indicator */}
                {isNext && (
                  <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                    <span className="animate-pulse">Keyingi</span>
                  </div>
                )}

                {/* Prayer Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-lg ${
                    isNext ? 'bg-emerald-100 animate-pulse' : ''
                  }`}>
                    {getIcon(prayer.name, isNext)}
                  </div>
                </div>

                {/* Prayer Name */}
                <div className="text-center mb-3">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    isNext ? 'text-emerald-700' : 'text-gray-800'
                  }`}>
                    {prayer.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-arabic">
                    {prayer.arabic}
                  </p>
                </div>

                {/* Prayer Time */}
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    isNext ? 'text-emerald-600' : 'text-gray-700'
                  }`}>
                    {prayer.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 rounded-3xl p-10 max-w-5xl mx-auto text-white shadow-3xl animate-fade-in-up delay-500">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6">Namoz vaqtlari haqida ma'lumot</h3>
            <p className="text-emerald-100 leading-relaxed text-lg mb-8">
              Namoz vaqtlari bizning mahalliy hududimiz uchun hisoblab chiqilgan va bir necha 
              daqiqaga farq qilishi mumkin. Har bir namazdan 10-15 daqiqa oldin ruhiy tayyorgarlik 
              uchun kelishingizni tavsiya qilamiz. Juma namazi soat 12:30 da xutba bilan boshlanadi, 
              keyin jamoat namazi o'qiladi.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-emerald-200">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-2xl">📍</span>
                <span className="font-medium">Mahalliy vaqt zonasi</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-2xl">🕌</span>
                <span className="font-medium">Jamoat namazlari</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-2xl">🤲</span>
                <span className="font-medium">Ruhiy tinchlik</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default PrayerTimes;