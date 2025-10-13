import React, { useState, useEffect } from 'react';
import { MapPin, Phone, User, Minus, Plus, Car, Navigation } from 'lucide-react';

const BookingPage = () => {
  const [departure, setDeparture] = useState('Шетпе');
  const [destination, setDestination] = useState('Актау');
  const [pickupAddress, setPickupAddress] = useState('26 мкр 40 дом');
  const [dropoffAddress, setDropoffAddress] = useState('Карашокы-4');
  const [passengers, setPassengers] = useState(1);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
  // Mock данные водителей
  const [drivers] = useState([
    {
      id: 1,
      name: 'Азат',
      phone: '+77081234567',
      car: 'Тойота Камри',
      plate: '614 АСМ12',
      seats: 4,
      bookedSeats: 0,
      pricePerSeat: 2000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Ерлан',
      phone: '+77051234567',
      car: 'Хонда Аккорд',
      plate: '777 ВСТ01',
      seats: 4,
      bookedSeats: 2,
      pricePerSeat: 2000,
      status: 'active'
    }
  ]);

  const selectedDriver = drivers[0];
  const totalPrice = passengers * selectedDriver.pricePerSeat;
  const autoFillThreshold = 4;
  const autoFillPrice = autoFillThreshold * selectedDriver.pricePerSeat;

  // Загрузка Yandex Maps API
  useEffect(() => {
    const loadYandexMaps = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => setMapLoaded(true));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.ymaps.ready(() => setMapLoaded(true));
      };
      document.head.appendChild(script);
    };

    loadYandexMaps();
  }, []);

  // Инициализация карты
  useEffect(() => {
    if (!mapLoaded) return;

    const mapElement = document.getElementById('map');
    if (!mapElement || map) return;

    // Координаты Актау (по умолчанию)
    const defaultCenter = [43.6508, 51.1600];

    const newMap = new window.ymaps.Map('map', {
      center: userLocation || defaultCenter,
      zoom: 13,
      controls: ['zoomControl', 'geolocationControl']
    });

    const newMarker = new window.ymaps.Placemark(
      userLocation || defaultCenter,
      {
        balloonContent: 'Ваше местоположение',
        iconCaption: 'Вы здесь'
      },
      {
        preset: 'islands#blueCircleDotIcon',
        draggable: true
      }
    );

    newMap.geoObjects.add(newMarker);

    // Обработчик перетаскивания маркера
    newMarker.events.add('dragend', function () {
      const coords = newMarker.geometry.getCoordinates();
      setUserLocation(coords);
      
      // Обратное геокодирование
      window.ymaps.geocode(coords).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject.getAddressLine();
        setPickupAddress(address);
      });
    });

    setMap(newMap);
    setMarker(newMarker);
  }, [mapLoaded]);

  // Получение геолокации пользователя
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);

          if (map && marker) {
            map.setCenter(location, 15, { duration: 500 });
            marker.geometry.setCoordinates(location);
            
            // Обратное геокодирование для получения адреса
            window.ymaps.geocode(location).then(function (res) {
              const firstGeoObject = res.geoObjects.get(0);
              const address = firstGeoObject.getAddressLine();
              setPickupAddress(address);
            });
          }
        },
        (error) => {
          console.error('Ошибка получения геолокации:', error);
          alert('Не удалось получить ваше местоположение. Проверьте разрешения браузера.');
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert('Геолокация не поддерживается вашим браузером');
    }
  };

  const handleBooking = () => {
    alert(`Бронирование создано!\nВодитель: ${selectedDriver.name}\nПассажиров: ${passengers}\nСумма: ${totalPrice} тг`);
  };

  // Поиск адресов (автокомплит)
  const searchAddress = (query, isPickup = true) => {
    if (query.length < 3) {
      if (isPickup) {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      } else {
        setDropoffSuggestions([]);
        setShowDropoffSuggestions(false);
      }
      return;
    }

    if (window.ymaps && window.ymaps.suggest) {
      // Ограничиваем поиск регионом Актау
      window.ymaps.suggest(`Актау, ${query}`).then(function (items) {
        const suggestions = items.map(item => ({
          value: item.value,
          displayName: item.displayName
        }));
        
        if (isPickup) {
          setPickupSuggestions(suggestions);
          setShowPickupSuggestions(true);
        } else {
          setDropoffSuggestions(suggestions);
          setShowDropoffSuggestions(true);
        }
      });
    }
  };

  // Выбор адреса из списка
  const selectAddress = (address, isPickup = true) => {
    if (isPickup) {
      setPickupAddress(address);
      setShowPickupSuggestions(false);
      
      // Геокодирование выбранного адреса и перемещение маркера
      if (window.ymaps) {
        window.ymaps.geocode(address, {
          results: 1
        }).then(function (res) {
          const firstGeoObject = res.geoObjects.get(0);
          const coords = firstGeoObject.geometry.getCoordinates();
          
          setUserLocation(coords);
          if (map && marker) {
            map.setCenter(coords, 15, { duration: 500 });
            marker.geometry.setCoordinates(coords);
          }
        });
      }
    } else {
      setDropoffAddress(address);
      setShowDropoffSuggestions(false);
    }
  };

  // Обработка ввода адреса посадки
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickupAddress(value);
    searchAddress(value, true);
  };

  // Обработка ввода адреса высадки
  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setDropoffAddress(value);
    searchAddress(value, false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Левая панель - Форма бронирования */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Бағыт</h2>
            
            {/* Направление */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <select 
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl appearance-none bg-white cursor-pointer text-lg"
                >
                  <option>Шетпе</option>
                  <option>Актау</option>
                </select>
              </div>
              
              <div className="relative">
                <select 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl appearance-none bg-white cursor-pointer text-lg"
                >
                  <option>Актау</option>
                  <option>Шетпе</option>
                </select>
              </div>
            </div>

            {/* Адреса */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={handlePickupChange}
                  onFocus={() => pickupSuggestions.length > 0 && setShowPickupSuggestions(true)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Откуда"
                />
                {showPickupSuggestions && pickupSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {pickupSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => selectAddress(suggestion.displayName, true)}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{suggestion.displayName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={dropoffAddress}
                  onChange={handleDropoffChange}
                  onFocus={() => dropoffSuggestions.length > 0 && setShowDropoffSuggestions(true)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Куда"
                />
                {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {dropoffSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => selectAddress(suggestion.displayName, false)}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-red-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{suggestion.displayName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Автоматическая добавка */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={20} />
                <span>автоматті жерді қосу</span>
              </div>
              <button
                onClick={getUserLocation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
              >
                <Navigation size={18} />
                <span>Моя геопозиция</span>
              </button>
            </div>

            {/* Количество пассажиров и цена */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-600 mb-2">Адам саны</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{passengers}</span>
                  <button 
                    onClick={() => setPassengers(Math.min(4, passengers + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-gray-600 mb-2">бағa</p>
                <p className="text-3xl font-bold">{totalPrice}тг</p>
              </div>
            </div>

            {/* Информация о автозаполнении */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                егер {autoFillThreshold} адам болса <span className="font-bold">автоматтың</span> ({autoFillPrice} тг деп көбейтіп отыруға.
              </p>
            </div>

            {/* Кнопка бронирования */}
            <button 
              onClick={handleBooking}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
            >
              Іздеу
            </button>

            {/* Информация о машине внизу */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Сіз гос номері <span className="font-semibold">{selectedDriver.plate}</span> {selectedDriver.car} келігін күтіңіз, 
                орын саны {selectedDriver.seats} бірлік.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Сот тел: {selectedDriver.phone}. Толуға {autoFillThreshold} адам қ:
              </p>
            </div>
          </div>

          {/* Правая панель - Информация о водителе и карта */}
          <div className="space-y-6">
            
            {/* Карточка водителя */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Водитель</h3>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  Адамдар саны: {selectedDriver.seats - selectedDriver.bookedSeats}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={32} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedDriver.name}</h4>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Phone size={16} />
                    {selectedDriver.phone}
                  </p>
                </div>
                <button className="ml-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Адамдар
                </button>
              </div>

              {/* Карта */}
              <div className="bg-gray-200 rounded-xl h-64 mb-6 relative overflow-hidden">
                {!mapLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
                      <p className="text-gray-600">Загрузка карты...</p>
                    </div>
                  </div>
                ) : (
                  <div id="map" className="w-full h-full rounded-xl"></div>
                )}
              </div>

              {/* Информация о машине */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold mb-2">Көме рін:</h4>
                <div className="flex items-center gap-2 text-gray-700">
                  <Car size={20} />
                  <span>Сіз гос номері <span className="font-semibold">{selectedDriver.plate}</span> {selectedDriver.car} келігін күтіңіз, 
                  орын саны {selectedDriver.seats} бірлік.</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Сот тел: <span className="font-semibold">{selectedDriver.phone}</span>.
                </p>
              </div>
            </div>

            {/* Статистика */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Статус поездки</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Забронировано мест:</span>
                  <span className="font-bold">{selectedDriver.bookedSeats}/{selectedDriver.seats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Свободно:</span>
                  <span className="font-bold text-green-600">{selectedDriver.seats - selectedDriver.bookedSeats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Статус:</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Активен
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;