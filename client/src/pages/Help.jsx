import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, MessageCircle, Instagram, Phone } from 'lucide-react';

const Help = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const faqForPassengers = [
    {
      question: "Как забронировать поездку?",
      answer: "Перейдите на страницу 'Пассажирам', выберите направление (Шетпе → Актау или Актау → Шетпе), укажите адрес посадки и количество пассажиров. Система покажет доступных водителей. Выберите подходящего и подтвердите бронирование."
    },
    {
      question: "Как указать адрес посадки?",
      answer: "Вы можете ввести адрес вручную в поле 'Откуда' или нажать кнопку 'Моя геопозиция', чтобы автоматически определить ваше местоположение. Также можно выбрать адрес из списка подсказок при вводе."
    },
    {
      question: "Можно ли отменить бронирование?",
      answer: "Да, вы можете отменить бронирование через личный кабинет. Однако учтите: первая отмена — предупреждение, вторая отмена подряд приведет к блокировке аккаунта на 7 дней. После успешной поездки счетчик отмен сбрасывается."
    },
    {
      question: "Как подтвердить участие в поездке?",
      answer: "За 30 минут до выезда вы получите уведомление с просьбой подтвердить участие. Нажмите '✅ Поеду' для подтверждения или '❌ Отказ' для отмены."
    },
    {
      question: "Когда нужно оплачивать поездку?",
      answer: "Оплата производится при посадке напрямую водителю наличными или через Kaspi QR (в зависимости от водителя). Онлайн-оплата будет доступна в будущих обновлениях."
    },
    {
      question: "Что делать, если водитель опаздывает?",
      answer: "Свяжитесь с водителем по номеру телефона, указанному в подтверждении бронирования. Если проблема не решается, обратитесь в службу поддержки."
    }
  ];

  const faqForDrivers = [
    {
      question: "Как зарегистрироваться водителем?",
      answer: "Перейдите на страницу 'Водителям' и заполните регистрационную форму: укажите свои данные, информацию об автомобиле (марка, модель, госномер), количество мест, направление и время выезда. После проверки администратором (обычно до 2 часов) ваш рейс будет активирован."
    },
    {
      question: "Как происходит верификация?",
      answer: "После регистрации администратор проверит указанные данные. Вы получите SMS с кодом подтверждения на указанный номер телефона. После ввода кода ваш рейс станет активным и будет виден пассажирам."
    },
    {
      question: "Какая комиссия сервиса?",
      answer: "Комиссия сервиса составляет 5% от выручки (опционально). Детали оплаты комиссии обсуждаются индивидуально с администратором."
    },
    {
      question: "Как получать уведомления о новых бронированиях?",
      answer: "При новом бронировании вы получите уведомление с данными пассажира: имя, телефон, адрес посадки и высадки, количество пассажиров. Уведомления приходят через Telegram и/или SMS."
    },
    {
      question: "Что делать при отмене пассажира?",
      answer: "Если пассажир отменяет бронирование, вы получите уведомление. Освободившиеся места автоматически станут доступны для других пассажиров."
    },
    {
      question: "Как подтвердить посадку пассажира?",
      answer: "После посадки пассажира отметьте это в приложении или через Telegram-бот. Это важно для статистики и защиты от недобросовестных пассажиров."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Помощь и поддержка</h1>
          <p className="text-gray-600 text-lg">
            Ответы на часто задаваемые вопросы и контакты службы поддержки
          </p>
        </div>

        {/* Контакты поддержки */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <a 
              href="mailto:support@shetpeaktau.kz"
              className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-blue-100">support@shetpeaktau.kz</p>
                </div>
              </div>
            </a>

            <a 
              href="tel:+77012345678"
              className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Телефон</h3>
                  <p className="text-blue-100">+7 701 234 5678</p>
                </div>
              </div>
            </a>

            <a 
              href="https://t.me/support_shetpeaktau"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Telegram</h3>
                  <p className="text-blue-100">@support_shetpeaktau</p>
                </div>
              </div>
            </a>

            <a 
              href="https://instagram.com/shetpe.aktau.taxi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Instagram</h3>
                  <p className="text-blue-100">@shetpe.aktau.taxi</p>
                </div>
              </div>
            </a>

          </div>
        </div>

        {/* FAQ для пассажиров */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Для пассажиров</h2>
          <div className="space-y-4">
            {faqForPassengers.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(`passenger-${index}`)}
                  className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-left">{faq.question}</span>
                  {openSection === `passenger-${index}` ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                {openSection === `passenger-${index}` && (
                  <div className="p-4 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ для водителей */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Для водителей</h2>
          <div className="space-y-4">
            {faqForDrivers.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(`driver-${index}`)}
                  className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-left">{faq.question}</span>
                  {openSection === `driver-${index}` ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                {openSection === `driver-${index}` && (
                  <div className="p-4 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Время работы поддержки */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Служба поддержки работает с 8:00 до 22:00 по времени Актау (GMT+5)
          </p>
          <p className="text-sm mt-1">
            В нерабочее время оставьте сообщение — мы ответим в ближайшее время
          </p>
        </div>

      </div>
    </div>
  );
};

export default Help;