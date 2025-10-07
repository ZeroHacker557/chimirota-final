import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  Settings, 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Send,
  Building,
  Globe,
  Loader2,
  CreditCard,
  DollarSign,
  ExternalLink
} from 'lucide-react';

const SettingsAdmin: React.FC = () => {
  const { showNotification } = useAdmin();
  const { refreshSettings } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [mosqueInfo, setMosqueInfo] = useState({
    mosque_name: '',
    mosque_address: '',
    mosque_phone: '',
    mosque_email: '',
    mosque_website: '',
    mosque_description: ''
  });

  const [socialMedia, setSocialMedia] = useState({
    social_facebook: '',
    social_instagram: '',
    social_telegram: ''
  });

  const [footerSettings, setFooterSettings] = useState({
    footer_copyright: '',
    footer_additional_text: ''
  });

  const [contactSettings, setContactSettings] = useState({
    contact_office_hours: '',
    contact_friday_prayer: ''
  });

  const [donationSettings, setDonationSettings] = useState({
    donation_title: '',
    donation_description: '',
    donation_account_number: '',
    donation_mfo: '',
    donation_inn: '',
    donation_contact_phone: '',
    donation_payme_link: '',
    donation_payme_text: '',
    donation_click_code: '',
    donation_click_text: ''
  });

  // Fetch settings from backend
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsFetching(true);
      const response = await fetch('http://localhost:3001/api/settings');
      
      if (!response.ok) {
        throw new Error('Sozlamalarni yuklashda xatolik yuz berdi');
      }
      
      const data = await response.json();
      
      // Update state with fetched data
      if (data.mosque_info) {
        setMosqueInfo(data.mosque_info);
      }
      
      if (data.social_media) {
        setSocialMedia(data.social_media);
      }
      
      if (data.footer) {
        setFooterSettings(data.footer);
      }
      
      if (data.contact) {
        setContactSettings(data.contact);
      }
      
      if (data.donation) {
        setDonationSettings(data.donation);
      }
      
    } catch (error) {
      console.error('Settings fetch error:', error);
      showNotification('Sozlamalarni yuklashda xatolik yuz berdi', 'error');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Prepare settings data
      const settingsData = {
        mosque_info: mosqueInfo,
        social_media: socialMedia,
        footer: footerSettings,
        contact: contactSettings,
        donation: donationSettings
      };

      const response = await fetch('http://localhost:3001/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings: settingsData })
      });

      if (!response.ok) {
        throw new Error('Sozlamalarni yangilashda xatolik yuz berdi');
      }

      const result = await response.json();
      showNotification('Sozlamalar muvaffaqiyatli yangilandi!', 'success');
      
      // Refresh the settings context to update the website immediately
      await refreshSettings();
      
    } catch (error) {
      console.error('Settings save error:', error);
      showNotification('Sozlamalarni yangilashda xatolik yuz berdi. Qayta urinib ko\'ring.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Loading State */}
      {isFetching ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Sozlamalar yuklanmoqda...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sozlamalar</h1>
              <p className="text-gray-600">Masjid ma'lumotlari va sayt sozlamalarini boshqarish</p>
            </div>
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mosque Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Building className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">Masjid ma'lumotlari</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Masjid nomi
              </label>
              <input
                type="text"
                value={mosqueInfo.mosque_name}
                onChange={(e) => setMosqueInfo({ ...mosqueInfo, mosque_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Manzil
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <textarea
                  value={mosqueInfo.mosque_address}
                  onChange={(e) => setMosqueInfo({ ...mosqueInfo, mosque_address: e.target.value })}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Telefon
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={mosqueInfo.mosque_phone}
                    onChange={(e) => setMosqueInfo({ ...mosqueInfo, mosque_phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={mosqueInfo.mosque_email}
                    onChange={(e) => setMosqueInfo({ ...mosqueInfo, mosque_email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Sayt
              </label>
              <div className="relative">
                <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={mosqueInfo.mosque_website}
                  onChange={(e) => setMosqueInfo({ ...mosqueInfo, mosque_website: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tavsif
              </label>
              <textarea
                value={mosqueInfo.mosque_description}
                onChange={(e) => setMosqueInfo({ ...mosqueInfo, mosque_description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        {/* Social Media & Footer */}
        <div className="space-y-8">
          {/* Social Media */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Ijtimoiy tarmoq havolalari</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Facebook
                </label>
                <div className="relative">
                  <Facebook className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={socialMedia.social_facebook}
                    onChange={(e) => setSocialMedia({ ...socialMedia, social_facebook: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="https://facebook.com/sizning-sahifangiz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Instagram
                </label>
                <div className="relative">
                  <Instagram className="w-5 h-5 text-pink-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={socialMedia.social_instagram}
                    onChange={(e) => setSocialMedia({ ...socialMedia, social_instagram: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="https://instagram.com/sizning-hisobingiz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Telegram
                </label>
                <div className="relative">
                  <Send className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={socialMedia.social_telegram}
                    onChange={(e) => setSocialMedia({ ...socialMedia, social_telegram: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="https://t.me/sizning-kanalingiz"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Footer sozlamalari</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Mualliflik huquqi matni
                </label>
                <input
                  type="text"
                  value={footerSettings.footer_copyright}
                  onChange={(e) => setFooterSettings({ ...footerSettings, footer_copyright: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Qo'shimcha footer matni
                </label>
                <input
                  type="text"
                  value={footerSettings.footer_additional_text}
                  onChange={(e) => setFooterSettings({ ...footerSettings, footer_additional_text: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Contact Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Aloqa sozlamalari</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Ofis soatlari
                </label>
                <input
                  type="text"
                  value={contactSettings.contact_office_hours}
                  onChange={(e) => setContactSettings({ ...contactSettings, contact_office_hours: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="9:00 dan 18:00 gacha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Juma namozi vaqti
                </label>
                <input
                  type="text"
                  value={contactSettings.contact_friday_prayer}
                  onChange={(e) => setContactSettings({ ...contactSettings, contact_friday_prayer: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="12:30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Settings Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Ehson sozlamalari</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title and Description */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Ehson bo'limi sarlavhasi
              </label>
              <input
                type="text"
                value={donationSettings.donation_title}
                onChange={(e) => setDonationSettings({ ...donationSettings, donation_title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="𝐌𝐚𝐬𝐣𝐢𝐝 𝐮𝐜𝐡𝐮𝐧 𝐞𝐡𝐬𝐨𝐧"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Ehson bo'limi tavsifi
              </label>
              <textarea
                value={donationSettings.donation_description}
                onChange={(e) => setDonationSettings({ ...donationSettings, donation_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Allah yo'lida ehson qiling va masjidimizning faoliyatini qo'llab-quvvatlashda ishtirok eting"
              />
            </div>
          </div>

          {/* Bank Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-emerald-600" />
              Bank ma'lumotlari
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Hisob raqami (X/S)
                </label>
                <div className="relative">
                  <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={donationSettings.donation_account_number}
                    onChange={(e) => setDonationSettings({ ...donationSettings, donation_account_number: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="20212000700124304001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  MFO
                </label>
                <input
                  type="text"
                  value={donationSettings.donation_mfo}
                  onChange={(e) => setDonationSettings({ ...donationSettings, donation_mfo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="00901"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  INN
                </label>
                <input
                  type="text"
                  value={donationSettings.donation_inn}
                  onChange={(e) => setDonationSettings({ ...donationSettings, donation_inn: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="202465253"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Murojaatlar uchun telefon
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={donationSettings.donation_contact_phone}
                    onChange={(e) => setDonationSettings({ ...donationSettings, donation_contact_phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="974779411"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
              To'lov tizimlari
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payme Settings */}
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
                  PAYME
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAYME havolasi
                    </label>
                    <div className="relative">
                      <ExternalLink className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={donationSettings.donation_payme_link}
                        onChange={(e) => setDonationSettings({ ...donationSettings, donation_payme_link: e.target.value })}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="https://payme.uz/fallback/merchant/?id=..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tugma matni
                    </label>
                    <input
                      type="text"
                      value={donationSettings.donation_payme_text}
                      onChange={(e) => setDonationSettings({ ...donationSettings, donation_payme_text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Ehson qilish"
                    />
                  </div>
                </div>
              </div>

              {/* Click Settings */}
              <div className="bg-white rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded mr-2"></div>
                  CLICK
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      USSD kodi
                    </label>
                    <input
                      type="text"
                      value={donationSettings.donation_click_code}
                      onChange={(e) => setDonationSettings({ ...donationSettings, donation_click_code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm font-mono"
                      placeholder="*880*047452*summa#"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tugma matni
                    </label>
                    <input
                      type="text"
                      value={donationSettings.donation_click_text}
                      onChange={(e) => setDonationSettings({ ...donationSettings, donation_click_text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                      placeholder="Kodni nusxalash"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center space-x-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sozlamalar saqlanmoqda...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Barcha sozlamalarni saqlash</span>
            </>
          )}
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-3">ℹ️ Sozlamalar ma'lumotlari</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Masjid ma'lumotlaridagi o'zgarishlar asosiy saytda aks etadi</li>
          <li>• Ijtimoiy tarmoq havolalari footer va aloqa bo'limlarida ko'rinadi</li>
          <li>• Ehson sozlamalari saytdagi "Ehson" bo'limini to'liq boshqaradi</li>
          <li>• PAYME va CLICK to'lov tizimlarining sozlamalari real vaqtda yangilanadi</li>
          <li>• Barcha URL manzillar to'g'ri va ochiq bo'lganiga ishonch hosil qiling</li>
          <li>• Aloqa ma'lumotlari jamiyat a'zolari uchun aniq bo'lishi kerak</li>
        </ul>
      </div>
      
        </>
      )}
    </div>
  );
};

export default SettingsAdmin;