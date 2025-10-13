import React, { useState } from 'react';
import { Users, Car, Calendar, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('pending');
  
  // Моковые данные ожидающих водителей
  const [pendingDrivers, setPendingDrivers] = useState([
    {
      id: 1,
      fullName: 'Азат Касымов',
      phone: '+7 708 123 4567',
      carMake: 'Toyota',
      carModel: 'Camry',
      plateNumber: '614 АСМ 12',
      seats: 4,
      direction: 'Шетпе → Актау',
      departureDate: '2025-10-15',
      departureTime: '08:00',
      createdAt: '2025-10-13 10:30',
      status: 'pending'
    },
    {
      id: 2,
      fullName: 'Ерлан Мухтаров',
      phone: '+7 705 987 6543',
      carMake: 'Honda',
      carModel: 'Accord',
      plateNumber: '777 ВСТ 01',
      seats: 4,
      direction: 'Актау → Шетпе',
      departureDate: '2025-10-14',
      departureTime: '14:00',
      createdAt: '2025-10-13 09:15',
      status: 'pending'
    }
  ]);

  const [activeDrivers, setActiveDrivers] = useState([
    {
      id: 3,
      fullName: 'Болат Нуркенов',
      phone: '+7 701 234 5678',
      carMake: 'Nissan',
      carModel: 'Teana',
      plateNumber: '999 КАР 02',
      seats: 4,
      bookedSeats: 2,
      direction: 'Шетпе → Актау',
      departureDate: '2025-10-14',
      departureTime: '10:00',
      status: 'active'
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      driverId: 3,
      driverName: 'Болат Нуркенов',
      clientName: 'Айдос Нурланов',
      clientPhone: '+7 701 555 1234',
      pickupAddress: '26 мкр, дом 40',
      dropoffAddress: 'Карашокы-4',
      passengers: 2,
      status: 'confirmed',
      createdAt: '2025-10-13 11:00'
    }
  ]);

  // Статистика
  const stats = {
    totalDrivers: pendingDrivers.length + activeDrivers.length,
    activeDrivers: activeDrivers.length,
    pendingDrivers: pendingDrivers.length,
    totalBookings: bookings.length
  };

  const approveDriver = (driverId) => {
    const driver = pendingDrivers.find(d => d.id === driverId);
    if (driver) {
      setPendingDrivers(pendingDrivers.filter(d => d.id !== driverId));
      setActiveDrivers([...activeDrivers, { ...driver, status: 'active', bookedSeats: 0 }]);
      alert(`Водитель ${driver.fullName} одобрен!`);
    }
  };

  const rejectDriver = (driverId) => {
    const driver = pendingDrivers.find(d => d.id === driverId);
    if (driver && confirm(`Отклонить заявку водителя ${driver.fullName}?`)) {
      setPendingDrivers(pendingDrivers.filter(d => d.id !== driverId));
      alert(`Заявка водителя ${driver.fullName} отклонена`);
    }
  };

  const deactivateDriver = (driverId) => {
    const driver = activeDrivers.find(d => d.id === driverId);
    if (driver && confirm(`Деактивировать рейс водителя ${driver.fullName}?`)) {
      setActiveDrivers(activeDrivers.filter(d => d.id !== driverId));
      alert(`Рейс водителя ${driver.fullName} деактивирован`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Админ-панель</h1>
          <p className="text-gray-600">Управление водителями и бронированиями</p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Всего водителей</h3>
              <Users className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold">{stats.totalDrivers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Активных</h3>
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.activeDrivers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">На проверке</h3>
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-orange-600">{stats.pendingDrivers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Броней</h3>
              <Calendar className="text-purple-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
          </div>
        </div>

        {/* Табы */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                  activeTab === 'pending'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                На проверке ({pendingDrivers.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                  activeTab === 'active'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Активные ({activeDrivers.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Бронирования ({bookings.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            
            {/* Ожидающие водители */}
            {activeTab === 'pending' && (
              <div className="space-y-4">
                {pendingDrivers.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <AlertTriangle size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Нет заявок на проверке</p>
                  </div>
                ) : (
                  pendingDrivers.map(driver => (
                    <div key={driver.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{driver.fullName}</h3>
                          <p className="text-gray-600 flex items-center gap-2">
                            📞 {driver.phone}
                          </p>
                        </div>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          На проверке
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Автомобиль</p>
                          <p className="font-semibold">{driver.carMake} {driver.carModel}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Госномер</p>
                          <p className="font-semibold">{driver.plateNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Мест</p>
                          <p className="font-semibold">{driver.seats}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Направление</p>
                          <p className="font-semibold text-sm">{driver.direction}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Дата выезда</p>
                          <p className="font-semibold">{driver.departureDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Время</p>
                          <p className="font-semibold">{driver.departureTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Подана</p>
                          <p className="font-semibold text-sm">{driver.createdAt}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => approveDriver(driver.id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} />
                          Одобрить
                        </button>
                        <button
                          onClick={() => rejectDriver(driver.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle size={18} />
                          Отклонить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Активные водители */}
            {activeTab === 'active' && (
              <div className="space-y-4">
                {activeDrivers.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Car size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Нет активных водителей</p>
                  </div>
                ) : (
                  activeDrivers.map(driver => (
                    <div key={driver.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{driver.fullName}</h3>
                          <p className="text-gray-600 flex items-center gap-2">
                            📞 {driver.phone}
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Активен
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Автомобиль</p>
                          <p className="font-semibold">{driver.carMake} {driver.carModel}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Госномер</p>
                          <p className="font-semibold">{driver.plateNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Занято / Всего</p>
                          <p className="font-semibold">{driver.bookedSeats} / {driver.seats}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Направление</p>
                          <p className="font-semibold text-sm">{driver.direction}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Дата выезда</p>
                          <p className="font-semibold">{driver.departureDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Время</p>
                          <p className="font-semibold">{driver.departureTime}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => deactivateDriver(driver.id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                      >
                        Деактивировать рейс
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Бронирования */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Нет бронирований</p>
                  </div>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{booking.clientName}</h3>
                          <p className="text-gray-600">📞 {booking.clientPhone}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {booking.status === 'confirmed' ? 'Подтверждено' : 'Ожидание'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Водитель</p>
                          <p className="font-semibold">{booking.driverName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Пассажиров</p>
                          <p className="font-semibold">{booking.passengers}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Откуда</p>
                          <p className="font-semibold">{booking.pickupAddress}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Куда</p>
                          <p className="font-semibold">{booking.dropoffAddress}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Создано</p>
                        <p className="font-semibold">{booking.createdAt}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;