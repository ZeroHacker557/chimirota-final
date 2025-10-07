import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { useAuth } from '../../contexts/AuthContext';
import { BASE_URL } from '../../config/api';
import { 
  UserCog, 
  Save, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User,
  Shield,
  AlertCircle
} from 'lucide-react';

const ProfileSettingsAdmin: React.FC = () => {
  const { showNotification } = useAdmin();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    currentEmail: user?.email || '',
    currentPassword: '',
    newEmail: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Current password is required
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Joriy parol talab qilinadi';
    }

    // If changing email
    if (formData.newEmail && formData.newEmail !== formData.currentEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.newEmail)) {
        newErrors.newEmail = 'Yaroqli email manzilini kiriting';
      }
    }

    // If changing password
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Parollar mos kelmaydi';
      }
    }

    // Either email or password must be changed
    if (!formData.newEmail && !formData.newPassword) {
      newErrors.general = 'Email yoki parolni o\'zgartirish uchun ma\'lumot kiriting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const updateData = {
        currentEmail: formData.currentEmail,
        currentPassword: formData.currentPassword,
        ...(formData.newEmail && { newEmail: formData.newEmail }),
        ...(formData.newPassword && { newPassword: formData.newPassword })
      };

      const response = await fetch(`${BASE_URL}/api/admin/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Profilni yangilashda xatolik yuz berdi');
      }

      showNotification('Profil muvaffaqiyatli yangilandi!', 'success');
      
      // Reset form
      setFormData({
        currentEmail: result.newEmail || formData.currentEmail,
        currentPassword: '',
        newEmail: '',
        newPassword: '',
        confirmPassword: ''
      });

    } catch (error: any) {
      console.error('Profile update error:', error);
      if (error.message === 'Joriy parol noto\'g\'ri') {
        setErrors({ currentPassword: 'Joriy parol noto\'g\'ri' });
      } else {
        showNotification(error.message || 'Profilni yangilashda xatolik yuz berdi', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil sozlamalari</h1>
          <p className="text-gray-600">Admin hisobingiz ma'lumotlarini boshqarish</p>
        </div>
        <div className="flex items-center space-x-3">
          <UserCog className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      {/* Current User Info */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900">{user?.name}</h3>
            <p className="text-emerald-700">{user?.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-600 font-medium">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Update Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Hisobni yangilash</h2>
          <p className="text-gray-600 text-sm mt-1">
            Email manzil yoki parolni o'zgartirish uchun avval joriy parolni kiriting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 text-sm">{errors.general}</p>
              </div>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Joriy parol *
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                  errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Joriy parolni kiriting"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Yangi email manzil (ixtiyoriy)
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={formData.newEmail}
                onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                  errors.newEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Yangi email manzilini kiriting"
              />
            </div>
            {errors.newEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.newEmail}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Yangi parol (ixtiyoriy)
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                  errors.newPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Yangi parolni kiriting"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          {formData.newPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Yangi parolni tasdiqlang
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Yangi parolni yana kiriting"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saqlanmoqda...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>O'zgarishlarni saqlash</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-3">🔒 Xavfsizlik ma'lumotlari</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Parol kamida 6 ta belgidan iborat bo'lishi kerak</li>
          <li>• O'zgarishlar darhol amal qila boshlaydi</li>
          <li>• Email o'zgartirilgandan so'ng yangi email bilan kiring</li>
          <li>• Xavfsizlik uchun kuchli parol tanlang</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSettingsAdmin;