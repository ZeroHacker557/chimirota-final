import React, { useState } from 'react';
import { Heart, Copy, CheckCircle, ExternalLink, CreditCard, Phone, Building, Hash } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Donation: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string>('');
  const { settings } = useSettings();

  // Use settings or fallback to defaults if not loaded
  const donationData = settings?.donation || {
    donation_title: '𝐌𝐚𝐬𝐣𝐢𝐝 𝐮𝐜𝐡𝐮𝐧 𝐞𝐡𝐬𝐨𝐧',
    donation_description: 'Allah yo\'lida ehson qiling va masjidimizning faoliyatini qo\'llab-quvvatlashda ishtirok eting',
    donation_account_number: '20212000700124304001',
    donation_mfo: '00901',
    donation_inn: '202465253',
    donation_contact_phone: '974779411',
    donation_payme_link: 'https://payme.uz/fallback/merchant/?id=6261544f84e4da44d89eb31c',
    donation_payme_text: 'Ehson qilish',
    donation_click_code: '*880*047452*summa#',
    donation_click_text: 'Kodni nusxalash'
  };

  const donationInfo = [
    {
      icon: CreditCard,
      label: 'X/S (Hisob raqami)',
      value: donationData.donation_account_number,
      copyable: true
    },
    {
      icon: Building,
      label: 'MFO',
      value: donationData.donation_mfo,
      copyable: true
    },
    {
      icon: Hash,
      label: 'INN',
      value: donationData.donation_inn,
      copyable: true
    },
    {
      icon: Phone,
      label: 'Murojaatlar uchun',
      value: donationData.donation_contact_phone,
      copyable: true
    }
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handlePaymeClick = () => {
    window.open(donationData.donation_payme_link, '_blank');
  };

  const handleClickClick = () => {
    // For CLICK USSD code, we can show instructions
    copyToClipboard(donationData.donation_click_code, 'click');
  };

  return (
    <section id="donation" className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-teal-100/10 to-transparent rounded-full animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-blue-600">
                {donationData.donation_title}
              </h2>
            </div>
            <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 mx-auto mb-8 rounded-full animate-shimmer"></div>
          </div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            {donationData.donation_description}
          </p>
        </div>

        {/* Donation Methods */}
        <div className="max-w-5xl mx-auto">
          {/* Bank Information Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/30 mb-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full mb-6">
                <Building className="w-6 h-6 text-emerald-600" />
                <h3 className="text-2xl font-bold text-emerald-900">Bank ma'lumotlari</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {donationInfo.map((info, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{info.label}</h4>
                      </div>
                    </div>
                    {info.copyable && (
                      <button
                        onClick={() => copyToClipboard(info.value, info.label)}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                        title="Nusxa olish"
                      >
                        {copiedField === info.label ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-100 rounded-xl p-4">
                    <p className="text-2xl font-mono font-bold text-gray-800 text-center tracking-wider">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* PAYME Card */}
            <div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center text-white">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">PAYME</h3>
                  <p className="text-blue-100">Onlayn to'lov tizimi orqali</p>
                </div>
                <button
                  onClick={handlePaymeClick}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 group-hover:scale-105"
                >
                  <span className="text-lg">{donationData.donation_payme_text}</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CLICK Card */}
            <div className="group bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center text-white">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">CLICK</h3>
                  <p className="text-orange-100">USSD kod bilan</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6">
                  <p className="text-2xl font-mono font-bold tracking-wider">{donationData.donation_click_code} 📞</p>
                </div>
                <button
                  onClick={handleClickClick}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 group-hover:scale-105"
                >
                  <span className="text-lg">{donationData.donation_click_text}</span>
                  {copiedField === 'click' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 rounded-3xl p-10 text-white shadow-3xl">
            <div className="text-center mb-8">
              <div className="p-4 bg-white/20 rounded-full inline-block mb-4 backdrop-blur-sm">
                <Heart className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ehsoningiz bilan qo'llab-quvvatlang</h3>
              <p className="text-emerald-100 leading-relaxed text-lg max-w-3xl mx-auto">
                Sizning ehsoningiz masjidimizning faoliyatini davom ettirish, ta'mirlash ishlari, 
                komunal to'lovlar va jamiyat xizmatlarini qo'llab-quvvatlash uchun ishlatiladi.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building className="w-6 h-6 text-yellow-800" />
                </div>
                <h4 className="font-bold text-lg mb-2">Masjid ta'mirlari</h4>
                <p className="text-emerald-200 text-sm">Binoni saqlash va yaxshilash</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-green-800" />
                </div>
                <h4 className="font-bold text-lg mb-2">Jamiyat xizmatlari</h4>
                <p className="text-emerald-200 text-sm">Muhtoj oilalarga yordam</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-blue-800" />
                </div>
                <h4 className="font-bold text-lg mb-2">Komunal to'lovlar</h4>
                <p className="text-emerald-200 text-sm">Elektr, suv, gaz to'lovlari</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;