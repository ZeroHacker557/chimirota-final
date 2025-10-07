import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Send } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Contact: React.FC = () => {
  const { settings, isLoading } = useSettings();

  if (isLoading || !settings) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-stone-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Aloqa ma'lumotlari yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-stone-50 to-emerald-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Biz bilan bog'laning
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Har qanday savollar, tashrif rejalashtirish yoki jamiyat yordami uchun biz bilan bog'laning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Map Section */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-2 shadow-xl">
              <div className="w-full h-96 bg-emerald-100 rounded-2xl overflow-hidden relative">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.0878626466333!2d69.16710651632675!3d41.35044393504405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8eecdfc5e2a9%3A0xb74330575e00b897!2z0KfQuNC80LjRgCDQvtGC0LAsINCi0LDRiNC60LXQvdGC0YHQutCw0Y8g0LrQvtC70YzRhtC10LLQsNGPINCw0LLRgtC-0LTQvtGA0L7Qs9CwLCDQotCw0YjQutC10L3RgywgVGFzaGtlbnQ!5e0!3m2!1sru!2s!4v1759768916755!5m2!1sru!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                  title="Chimir ota Jome Masjidi joylashuvi"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-emerald-900 mb-8">Bog'lanish</h3>
              
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Manzil</h4>
                    <p className="text-gray-600">
                      {settings.mosque_info.mosque_address.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index < settings.mosque_info.mosque_address.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Telefon</h4>
                    <p className="text-gray-600">
                      {settings.mosque_info.mosque_phone}<br />
                      {settings.mosque_info.mosque_email && (
                        <span>Qo'shimcha: {settings.mosque_info.mosque_email}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Elektron pochta</h4>
                    <p className="text-gray-600">
                      {settings.mosque_info.mosque_email}<br />
                      {settings.mosque_info.mosque_website && (
                        <span>Sayt: {settings.mosque_info.mosque_website}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-4">Bizni kuzating</h4>
                <div className="flex space-x-4">
                  {settings.social_media.social_facebook && (
                    <a
                      href={settings.social_media.social_facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  )}
                  {settings.social_media.social_instagram && (
                    <a
                      href={settings.social_media.social_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                  {settings.social_media.social_telegram && (
                    <a
                      href={settings.social_media.social_telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Send className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Tashrif vaqtlari</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-emerald-600/30">
                  <span className="font-medium">Kundalik namozlar</span>
                  <span className="text-emerald-200">Doim ochiq</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-600/30">
                  <span className="font-medium">Ofis soatlari</span>
                  <span className="text-emerald-200">{settings.contact.contact_office_hours}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Juma namozi</span>
                  <span className="text-emerald-200">{settings.contact.contact_friday_prayer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;