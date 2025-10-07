import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { Clock, Calendar, Users, TrendingUp, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { prayerTimes, events } = useAdmin();
  const navigate = useNavigate();

  // Get next prayer
  const getNextPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      
      if (prayerTime > currentTime) {
        return prayer;
      }
    }
    
    // If no prayer found for today, return first prayer of next day
    return prayerTimes[0];
  };

  const nextPrayer = getNextPrayer();
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3);
  const lastUpdate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const stats = [
    {
      title: 'Keyingi namoz',
      value: nextPrayer.name,
      subtitle: nextPrayer.time,
      icon: Clock,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Jami tadbirlar',
      value: events.length.toString(),
      subtitle: 'Faol tadbirlar',
      icon: Calendar,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Yaqinlashayotgan tadbirlar',
      value: upcomingEvents.length.toString(),
      subtitle: 'Shu oy',
      icon: TrendingUp,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Jamiyat',
      value: '500+',
      subtitle: 'Faol a\'zolar',
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Boshqaruv paneli ko'rinishi</h1>
        <p className="text-gray-600 text-sm lg:text-base">Xush kelibsiz! Bugun masjidda sodir bo'layotgan voqealar.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-gray-500 text-xs">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Today's Prayer Times */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">Bugungi namoz vaqtlari</h2>
            <Clock className="w-5 h-5 text-emerald-600" />
          </div>
          
          <div className="space-y-3">
            {prayerTimes.map((prayer, index) => (
              <div 
                key={prayer.name}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors duration-200 ${
                  prayer.name === nextPrayer.name 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    prayer.name === nextPrayer.name ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{prayer.name}</p>
                    <p className="text-sm text-gray-500">{prayer.arabic}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    prayer.name === nextPrayer.name ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    {prayer.time}
                  </p>
                  {prayer.name === nextPrayer.name && (
                    <p className="text-xs text-emerald-600">Keyingi namoz</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">Yaqinlashayotgan tadbirlar</h2>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate text-sm lg:text-base">{event.title}</h3>
                    <p className="text-xs lg:text-sm text-gray-600 mb-1">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {event.time}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 hidden lg:block">{event.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'active' ? 'bg-green-100 text-green-700' :
                    event.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {event.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Yaqinlashayotgan tadbirlar yo'q</p>
              </div>
            )}
          </div>
          
          {upcomingEvents.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button 
                onClick={() => navigate('/admin/events')}
                className="w-full flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <span>Barcha tadbirlarni ko'rish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Tezkor amallar</h2>
            <p className="text-emerald-100 mb-4 lg:mb-6 text-sm lg:text-base">Ushbu yorliqlar bilan masjidingizni samarali boshqaring</p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <button 
                onClick={() => navigate('/admin/prayer-times')}
                className="bg-white/20 hover:bg-white/30 px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base hover:scale-105 active:scale-95"
              >
                Namoz vaqtlarini yangilash
              </button>
              <button 
                onClick={() => navigate('/admin/events')}
                className="bg-white/20 hover:bg-white/30 px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base hover:scale-105 active:scale-95"
              >
                Yangi tadbir qo'shish
              </button>
              <button 
                onClick={() => navigate('/admin/settings')}
                className="bg-white/20 hover:bg-white/30 px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base hover:scale-105 active:scale-95"
              >
                Sozlamalarni ko'rish
              </button>
            </div>
          </div>
          <div className="hidden lg:block mt-6 lg:mt-0">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Clock className="w-16 h-16 text-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs lg:text-sm text-gray-600 gap-2">
          <p>Oxirgi yangilanish: {lastUpdate}</p>
          <p>Tizim holati: <span className="text-green-600 font-medium">Barcha tizimlar ishlayapti</span></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;