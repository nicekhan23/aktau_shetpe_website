import React from 'react';
import { Mail, MessageCircle, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* О сервисе */}
          <div>
            <h3 className="text-xl font-bold mb-4">Шетпе-Актау</h3>
            <p className="text-gray-300 text-sm">
              Удобный сервис бронирования поездок между Шетпе и Актау. 
              Надежные водители и комфортные автомобили.
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <div className="space-y-3">
              <a 
                href="mailto:support@shetpeaktau.kz" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={18} />
                <span>support@shetpeaktau.kz</span>
              </a>
              <a 
                href="https://t.me/support_shetpeaktau" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle size={18} />
                <span>@support_shetpeaktau</span>
              </a>
              <a 
                href="https://instagram.com/shetpe.aktau.taxi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={18} />
                <span>@shetpe.aktau.taxi</span>
              </a>
            </div>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-xl font-bold mb-4">Информация</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/help" className="hover:text-white transition-colors">
                  Помощь
                </a>
              </li>
              <li>
                <a href="/booking" className="hover:text-white transition-colors">
                  Забронировать поездку
                </a>
              </li>
              <li>
                <a href="/driver" className="hover:text-white transition-colors">
                  Стать водителем
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Шетпе-Актау. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;