import React, { useState } from 'react';
import { Car, User, Phone, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const DriverReg = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    carMake: '',
    carModel: '',
    plateNumber: '',
    seats: 4,
    direction: 'Шетпе → Актау',
    departureDate: '',
    departureTime: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Введите ФИО';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Введите номер телефона';
    } else if (!/^\+?[0-9]{11}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Некорректный формат телефона';
    }

    if (!formData.carMake.trim()) {
      newErrors.carMake = 'Введите марку автомобиля';
    }

    if (!formData.carModel.trim()) {
      newErrors.carModel = 'Введите модель автомобиля';
    }

    if (!formData.plateNumber.trim()) {
      newErrors.plateNumber = 'Введите госномер';
    }

    if (!formData.departureDate) {
      newErrors.departureDate = 'Выберите дату выезда';
    }

    if (!formData.departureTime) {
      newErrors.departureTime = 'Выберите время выезда';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Симуляция отправки данных
    setTimeout(() => {
      console.log('Данные водителя:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Очистка формы
      setFormData({
        fullName: '',
        phoneNumber: '',
        carMake: '',
        carModel: '',
        plateNumber: '',
        seats: 4,
        direction: 'Шетпе → Актау',
        departureDate: '',
        departureTime: '',
      });

      // Скрыть сообщение об успехе через 5 секунд
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Регистрация водителя</h1>
          <p className="text-gray-600 text-lg">
            Заполните форму для добавления рейса. После проверки администратором ваш рейс будет активирован.
          </p>
        </div>

        {/* Информационный блок */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Важная информация</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• После регистрации ваш рейс будет проверен администратором (обычно до 2 часов)</li>
                <li>• Вы получите SMS-уведомление с кодом подтверждения</li>
                <li>• Комиссия сервиса составляет 5% от выручки (опционально)</li>
                <li>• Убедитесь, что все данные указаны корректно</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Форма */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* Сообщение об успехе */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <div className="text-green-600">✓</div>
                <div>
                  <h4 className="font-bold text-green-900 mb-1">Заявка успешно отправлена!</h4>
                  <p className="text-sm text-green-800">
                    Ваш рейс будет проверен администратором. Вы получите уведомление на указанный номер телефона.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Личные данные */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User size={24} className="text-blue-600" />
                Личные данные
              </h3>
              <div className="space-y-4">
                <Input
                  label="ФИО водителя"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Иванов Иван Иванович"
                  error={errors.fullName}
                />
                <Input
                  label="Номер телефона"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+7 701 234 5678"
                  error={errors.phoneNumber}
                />
              </div>
            </div>

            {/* Данные автомобиля */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Car size={24} className="text-blue-600" />
                Данные автомобиля
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Марка"
                  name="carMake"
                  value={formData.carMake}
                  onChange={handleChange}
                  placeholder="Toyota"
                  error={errors.carMake}
                />
                <Input
                  label="Модель"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  placeholder="Camry"
                  error={errors.carModel}
                />
                <Input
                  label="Госномер"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  placeholder="614 АСМ 12"
                  error={errors.plateNumber}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество мест
                  </label>
                  <select
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="2">2 места</option>
                    <option value="3">3 места</option>
                    <option value="4">4 места</option>
                    <option value="6">6 мест</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Детали поездки */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin size={24} className="text-blue-600" />
                Детали поездки
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Направление
                  </label>
                  <select
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="Шетпе → Актау">Шетпе → Актау</option>
                    <option value="Актау → Шетпе">Актау → Шетпе</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Дата выезда"
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleChange}
                    error={errors.departureDate}
                  />
                  <Input
                    label="Время выезда"
                    name="departureTime"
                    type="time"
                    value={formData.departureTime}
                    onChange={handleChange}
                    error={errors.departureTime}
                  />
                </div>
              </div>
            </div>

            {/* Кнопка отправки */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Отправка...' : 'Зарегистрировать рейс'}
              </Button>
            </div>

          </form>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 text-center text-gray-600">
          <p>Возникли вопросы? <a href="/help" className="text-blue-600 hover:underline">Свяжитесь с нами</a></p>
        </div>

      </div>
    </div>
  );
};

export default DriverReg;