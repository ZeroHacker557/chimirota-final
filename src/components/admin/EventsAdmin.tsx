import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Calendar, Plus, CreditCard as Edit, Trash2, X, Save, Image as ImageIcon, Clock, MapPin } from 'lucide-react';

interface EventFormData {
  title: string;
  date: string;
  time: string;
  description: string;
  detailed_description: string;
  image: string;
  status: 'active' | 'draft' | 'cancelled';
}

const EventsAdmin: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, showNotification } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: '',
    time: '',
    description: '',
    detailed_description: '',
    image: '',
    status: 'active'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      detailed_description: '',
      image: '',
      status: 'active'
    });
    setEditingEvent(null);
  };

  const openModal = (event?: any) => {
    if (event) {
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
        detailed_description: event.detailed_description || '',
        image: event.image,
        status: event.status
      });
      setEditingEvent(event.id);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateEvent(editingEvent, formData);
      showNotification('Tadbir muvaffaqiyatli yangilandi!', 'success');
    } else {
      addEvent(formData);
      showNotification('Tadbir muvaffaqiyatli yaratildi!', 'success');
    }
    
    closeModal();
  };

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`"${title}"ni o'chirishni istaysizmi?`)) {
      deleteEvent(id);
      showNotification('Tadbir muvaffaqiyatli o\'chirildi!', 'success');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Tadbirlarni boshqarish</h1>
          <p className="text-gray-600 text-sm lg:text-base">Masjid tadbirlari va faoliyatlarini yarating va boshqaring</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl font-medium transition-colors duration-200 text-sm lg:text-base"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Yangi tadbir qo'shish</span>
        </button>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Barcha tadbirlar</h2>
        </div>

        {/* Desktop table for larger screens */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-900">Tadbir</th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">Sana va vaqt</th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">Holat</th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={event.image} alt={event.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-gray-700"><Calendar className="w-4 h-4" /><span>{new Date(event.date).toLocaleDateString()}</span></div>
                    <div className="flex items-center space-x-2 text-gray-600 mt-1"><Clock className="w-4 h-4" /><span>{event.time}</span></div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => openModal(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Tadbirni tahrirlash"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(event.id, event.title)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" title="Tadbirni o'chirish"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / tablet: stacked cards */}
        <div className="lg:hidden p-4 space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <img src={event.image} alt={event.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{event.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{event.description}</p>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-gray-600 space-x-3 text-sm">
                    <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{new Date(event.date).toLocaleDateString()}</span></div>
                    <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{event.time}</span></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => openModal(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Tadbirni tahrirlash"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(event.id, event.title)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" title="Tadbirni o'chirish"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingEvent ? 'Tadbirni tahrirlash' : 'Yangi tadbir qo\'shish'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tadbir nomi
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Tadbir nomini kiriting"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sana
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Vaqt
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Qisqa tavsif
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Qisqa tavsifni kiriting (ro'yxatda ko'rinadi)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Batafsil tavsif
                </label>
                <textarea
                  value={formData.detailed_description}
                  onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Batafsil ma'lumotni kiriting (Batafsil tugmasi bosilganda ko'rinadi)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Rasm URL
                </label>
                <div className="relative">
                  <ImageIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Holat
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                >
                  <option value="active">Faol</option>
                  <option value="draft">Qoralama</option>
                  <option value="cancelled">Bekor qilingan</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingEvent ? 'Tadbirni yangilash' : 'Tadbir yaratish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsAdmin;