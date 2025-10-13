import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Users, Shield, Clock, MapPin, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Шетпе ⇄ Актау</h1>
          <p className="text-xl mb-8 text-blue-100">
            Удобный и безопасный сервис бронирования поездок
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to="/booking" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Забронировать поездку
            </Link>
            <Link 
              to="/driver" 
              className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors border-2 border-white shadow-lg"
            >
              Стать водителем
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Car className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Комфортные автомобили</h3>
              <p className="text-gray-600">
                Только проверенные водители на комфортных автомобилях с кондиционером
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Безопасность</h3>
              <p className="text-gray-600">
                Все водители проходят верификацию. Данные машин и телефоны подтверждены
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Точное расписание</h3>
              <p className="text-gray-600">
                Выезд строго по расписанию. Уведомления о времени отправления
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Удобная посадка</h3>
              <p className="text-gray-600">
                Укажите адрес посадки или отправьте геопозицию — водитель приедет к вам
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Групповые поездки</h3>
              <p className="text-gray-600">
                Бронируйте до 4 мест для себя и друзей. Автозаполнение при полном составе
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Простое бронирование</h3>
              <p className="text-gray-600">
                Интуитивный интерфейс. Забронировать поездку можно за 2 минуты
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает?</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Выберите направление</h3>
                <p className="text-gray-600">
                  Шетпе → Актау или Актау → Шетпе, укажите адрес и количество пассажиров
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Найдите водителя</h3>
                <p className="text-gray-600">
                  Система подберет доступных водителей. Выберите удобное время
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Подтвердите бронь</h3>
                <p className="text-gray-600">
                  Получите подтверждение и контакты водителя. Оплатите при посадке
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы к поездке?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Присоединяйтесь к тысячам довольных пассажиров
          </p>
          <Link 
            to="/booking" 
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg inline-block"
          >
            Забронировать сейчас
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;