import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Clock, Save, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

const PrayerTimesAdmin: React.FC = () => {
  const { prayerTimes, updatePrayerTimes, showNotification } = useAdmin();
  const [editedTimes, setEditedTimes] = useState(prayerTimes);
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeChange = (index: number, newTime: string) => {
    const updated = [...editedTimes];
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = newTime.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formattedTime = `${displayHour}:${minutes} ${ampm}`;
    
    updated[index] = { ...updated[index], time: formattedTime };
    setEditedTimes(updated);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      updatePrayerTimes(editedTimes);
      showNotification('Namoz vaqtlari muvaffaqiyatli yangilandi!', 'success');
    } catch (error) {
      showNotification('Namoz vaqtlarini yangilash muvaffaqiyatsiz. Qayta urinib ko\'ring.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEditedTimes(prayerTimes);
    showNotification('O\'zgarishlar asl qiymatlarga qaytarildi', 'success');
  };

  const hasChanges = JSON.stringify(editedTimes) !== JSON.stringify(prayerTimes);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Namoz vaqtlarini boshqarish</h1>
          <p className="text-gray-600 text-sm lg:text-base">Masjid jamiyati uchun kundalik namoz vaqtlarini yangilang</p>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600" />
        </div>
      </div>

      {/* Prayer Times Form */}
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Kundalik namoz jadvali</h2>
          <p className="text-gray-600 text-sm lg:text-base">24 soatlik formatdan foydalanib namoz vaqtlarini sozlang (SS:DD)</p>
        </div>

        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {editedTimes.map((prayer, index) => (
              <div key={prayer.name} className="space-y-3">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm lg:text-base">{prayer.name}</h3>
                    <p className="text-xs lg:text-sm text-gray-500">{prayer.arabic}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="time"
                    value={(() => {
                      // Convert 12-hour format to 24-hour format for input
                      const time = prayer.time;
                      const [timePart, ampm] = time.split(' ');
                      const [hours, minutes] = timePart.split(':');
                      let hour = parseInt(hours);
                      if (ampm === 'PM' && hour !== 12) hour += 12;
                      if (ampm === 'AM' && hour === 12) hour = 0;
                      return `${hour.toString().padStart(2, '0')}:${minutes}`;
                    })()}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-sm lg:text-lg font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 lg:p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl lg:rounded-b-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
              {hasChanges ? (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Saqlanmagan o'zgarishlar mavjud</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Barcha o'zgarishlar saqlandi</span>
                </>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleReset}
                disabled={!hasChanges || isLoading}
                className="flex items-center justify-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 text-gray-700 bg-white border border-gray-300 rounded-lg lg:rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytarish</span>
              </button>
              
              <button
                onClick={handleSave}
                disabled={!hasChanges || isLoading}
                className="flex items-center justify-center space-x-2 px-6 lg:px-8 py-2 lg:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg lg:rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saqlanmoqda...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>O'zgarishlarni saqlash</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Schedule Preview */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-emerald-200">
        <h3 className="text-base lg:text-lg font-bold text-emerald-900 mb-4">Joriy jadval ko'rinishi</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {editedTimes.map((prayer) => (
            <div key={prayer.name} className="text-center">
              <div className="bg-white rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm">
                <h4 className="font-bold text-emerald-900 mb-1 text-xs lg:text-sm">{prayer.name}</h4>
                <p className="text-lg lg:text-2xl font-bold text-emerald-700 mb-1">{prayer.time}</p>
                <p className="text-xs lg:text-sm text-emerald-600">{prayer.arabic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-blue-200">
        <h3 className="text-base lg:text-lg font-bold text-blue-900 mb-3">💡 Namoz vaqtlarini boshqarish uchun maslahatlar</h3>
        <ul className="space-y-2 text-blue-800 text-sm lg:text-base">
          <li>• Namoz vaqtlari sizning joylashuvingiz asosida avtomatik hisoblanadi</li>
          <li>• Vaqtlarni doim mahalliy islom hokimiyatlari bilan tekshiring</li>
          <li>• Aniq vaqtlar uchun mavsumiy o'zgarishlarni hisobga oling</li>
          <li>• O'zgarishlar saqlangandan so'ng asosiy saytda darhol aks etadi</li>
        </ul>
      </div>
    </div>
  );
};

export default PrayerTimesAdmin;