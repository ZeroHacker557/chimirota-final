import React, { useState, useEffect } from 'react';
import { Fuel as Mosque, Facebook, Instagram, Send, Mail, Phone, MapPin } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useAdmin } from '../contexts/AdminContext';

const Footer: React.FC = () => {
  const { settings, isLoading } = useSettings();
  const { prayerTimes } = useAdmin();
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [nextPrayerTime, setNextPrayerTime] = useState<string>('');
  const currentYear = new Date().getFullYear();

  // Calculate next prayer time
  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    // Convert prayer times to minutes for easier comparison
    const prayerTimesInMinutes = prayerTimes.map(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      return {
        ...prayer,
        timeInMinutes: hours * 60 + minutes
      };
    });
    
    // Find the next prayer
    let nextPrayerIndex = -1;
    for (let i = 0; i < prayerTimesInMinutes.length; i++) {
      if (currentTimeInMinutes < prayerTimesInMinutes[i].timeInMinutes) {
        nextPrayerIndex = i;
        break;
      }
    }
    
    // If no prayer found for today, next prayer is tomorrow's first prayer
    if (nextPrayerIndex === -1 && prayerTimesInMinutes.length > 0) {
      nextPrayerIndex = 0;
    }
    
    if (nextPrayerIndex !== -1) {
      setNextPrayer(prayerTimesInMinutes[nextPrayerIndex].name);
      setNextPrayerTime(prayerTimesInMinutes[nextPrayerIndex].time);
    }
  }, [prayerTimes]);

  if (isLoading || !settings) {
    return (
      <footer className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="relative container mx-auto px-6 py-16">
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </footer>
    );
  }

  const quickLinks = [
    { name: 'Bosh sahifa', href: '#home' },
    { name: 'Masjid haqida', href: '#about-masjid' },
    { name: 'Namoz vaqtlari', href: '#prayer-times' },
    { name: 'Yangiliklar', href: '#events' },
    { name: 'Galereya', href: '#gallery' },
    { name: 'Aloqa', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-emerald-900 text-white overflow-hidden">
      {/* Islamic Ornamental Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-300 to-amber-400"></div>
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm20-30c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                {/* Detailed mosque SVG icon - same as navbar */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="white" aria-hidden>
                  {/* Main dome */}
                  <path d="M12 3c-2.5 0-4.5 1.5-4.5 3.5v1h9v-1C16.5 4.5 14.5 3 12 3z" />
                  {/* Crescent moon on top */}
                  <path d="M11.5 1.5c0 0.8 0.4 1.5 1 1.5s1-0.7 1-1.5S12.8 0.5 12 0.5 11.5 0.7 11.5 1.5z" />
                  <circle cx="12.5" cy="1.5" r="0.3" fill="none" stroke="white" strokeWidth="0.5" />
                  {/* Main building */}
                  <rect x="8" y="7.5" width="8" height="8" rx="0.5" />
                  {/* Entrance arch */}
                  <path d="M10.5 15.5v-3c0-0.8 0.7-1.5 1.5-1.5s1.5 0.7 1.5 1.5v3" fill="#047857" />
                  {/* Left minaret */}
                  <rect x="5" y="5" width="1.5" height="10.5" rx="0.2" />
                  <circle cx="5.75" cy="4.5" r="0.8" />
                  <path d="M5.4 3.8c0 0.4 0.2 0.7 0.35 0.7s0.35-0.3 0.35-0.7" fill="none" stroke="white" strokeWidth="0.3" />
                  {/* Right minaret */}
                  <rect x="17.5" y="5" width="1.5" height="10.5" rx="0.2" />
                  <circle cx="18.25" cy="4.5" r="0.8" />
                  <path d="M17.9 3.8c0 0.4 0.2 0.7 0.35 0.7s0.35-0.3 0.35-0.7" fill="none" stroke="white" strokeWidth="0.3" />
                  {/* Windows */}
                  <circle cx="10" cy="10" r="0.5" fill="#047857" />
                  <circle cx="14" cy="10" r="0.5" fill="#047857" />
                  {/* Base */}
                  <rect x="7" y="15.5" width="10" height="1" rx="0.2" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{settings.mosque_info.mosque_name}</h3>
                <p className="text-emerald-200 text-sm">{settings.footer.footer_additional_text}</p>
              </div>
            </div>
            
            <p className="text-emerald-100 leading-relaxed mb-8 max-w-md">
              {settings.mosque_info.mosque_description}
            </p>

            {/* Arabic Calligraphy */}
            <div className="mb-8">
              <p className="text-emerald-200 text-xl mb-2">
                لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ
              </p>
              <p className="text-emerald-300 text-sm">
                Allohdan boshqa iloh yo'q, Muhammad Allohning rasuli
              </p>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {settings.social_media.social_facebook && (
                <a
                  href={settings.social_media.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-emerald-700 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.social_media.social_instagram && (
                <a
                  href={settings.social_media.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-emerald-700 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.social_media.social_telegram && (
                <a
                  href={settings.social_media.social_telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-emerald-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Send className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-300">Tezkor havolalar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-emerald-100 hover:text-amber-300 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-200"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-300">Aloqa ma'lumotlari</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-emerald-100 text-sm">
                    {settings.mosque_info.mosque_address.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < settings.mosque_info.mosque_address.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                <p className="text-emerald-100 text-sm">{settings.mosque_info.mosque_phone}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                <p className="text-emerald-100 text-sm">{settings.mosque_info.mosque_email}</p>
              </div>
            </div>

            {/* Prayer Times Reminder */}
            <div className="mt-8 p-4 bg-emerald-800/50 rounded-xl border border-emerald-700/50">
              <h5 className="font-bold text-amber-300 mb-2">Keyingi namoz</h5>
              {nextPrayer && nextPrayerTime ? (
                <p className="text-emerald-100 text-sm">{nextPrayer} - {nextPrayerTime}</p>
              ) : (
                <p className="text-emerald-100 text-sm">Namoz vaqtlari yuklanmoqda...</p>
              )}
              <p className="text-emerald-200 text-xs mt-1">Namoz vaqtlari bilan bog'langan bo'ling</p>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-16 pt-8 border-t border-emerald-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-emerald-200 text-sm">
              {settings.footer.footer_copyright}
            </p>
            <div className="flex items-center space-x-6 text-emerald-200 text-sm">
              <button className="hover:text-amber-300 transition-colors duration-200">Maxfiylik siyosati</button>
              <button className="hover:text-amber-300 transition-colors duration-200">Xizmat shartlari</button>
              <button className="hover:text-amber-300 transition-colors duration-200">Xayriya</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;