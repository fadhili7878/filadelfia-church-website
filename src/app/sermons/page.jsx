"use client";

import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n';
import {
  Play,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  MessageCircle,
  Flame,
  Users,
  BookOpen,
  Heart,
  Calendar,
  User,
  Shield,
  Clock,
  Bell,
  Home,
} from "lucide-react";

export default function SermonsPage() {
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language?.toUpperCase() || 'EN');
  const [showJoinModal, setShowJoinModal] = useState(false);

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'SW', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'AR', name: 'العربية', flag: '🇸🇦' },
  ];

  const handleLanguageChange = (languageCode) => {
    const langCode = languageCode.toLowerCase();
    i18n.changeLanguage(langCode);
    setCurrentLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.language-selector')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng.toUpperCase());
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="https://ucarecdn.com/a249fb92-9b2c-4213-9811-b343543f6162/-/format/auto/"
                alt="TAG Logo"
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-lg font-bold text-[#E31E24]">
                  Filadelfia Christian Centre
                </h1>
                <p className="text-xs text-gray-600">
                  Tanzania Assemblies of God
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-[#E31E24] transition-colors">{t('nav.home')}</a>
              <a href="/about" className="text-gray-700 hover:text-[#E31E24] transition-colors">{t('nav.about')}</a>
              <a href="/ministries" className="text-gray-700 hover:text-[#E31E24] transition-colors">{t('nav.ministries')}</a>
              <a href="/sermons" className="text-[#E31E24] font-semibold transition-colors">{t('nav.sermons')}</a>
              <a href="/events" className="text-gray-700 hover:text-[#E31E24] transition-colors">{t('nav.events')}</a>
              <a href="/contact" className="text-gray-700 hover:text-[#E31E24] transition-colors">{t('nav.contact')}</a>
              <a href="/give" className="bg-[#E31E24] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">{t('nav.giveOnline')}</a>
              <button 
                onClick={() => setShowJoinModal(true)}
                className="group relative bg-gradient-to-r from-[#FFD500] to-[#FFA500] text-black px-6 py-2 rounded-full font-semibold hover:from-[#FFA500] hover:to-[#FFD500] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Flame className="h-5 w-5 group-hover:animate-bounce" />
                <span>Join Us</span>
                <div className="absolute -top-1 -right-1 bg-[#E31E24] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  !
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-[#E31E24] via-[#FFD500] to-[#E31E24] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-[#FFD500]/20 rounded-full animate-float-delay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Church Sermons
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Watch and listen to powerful messages of faith, hope, and inspiration. 
            Stay connected with God's word through our weekly sermons and teachings.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-2xl p-12 transform hover:scale-105 transition-transform duration-300">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#E31E24] to-[#FFD500] rounded-full mb-6 shadow-lg">
                <Play className="h-12 w-12 text-white animate-swing" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Sermons Coming Soon
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                We're preparing powerful messages of faith and inspiration for you
              </p>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6">
                Our team is working diligently to curate and prepare meaningful sermons that will 
                inspire, encourage, and strengthen your walk with God. We want to ensure that every 
                message we share is thoughtfully prepared and delivered with excellence. 
                Thank you for your patience as we prepare this important ministry resource.
              </p>
              <div className="bg-gradient-to-r from-[#E31E24]/5 to-[#FFD500]/5 p-6 rounded-lg border-l-4 border-[#E31E24] max-w-2xl mx-auto">
                <p className="text-gray-700 font-medium">
                  In the meantime, join us for our live worship services every Sunday at 9:00 AM & 11:00 AM 
                  to experience God's word in person.
                </p>
              </div>
            </div>
            
            <div className="border-t pt-8">
              <p className="text-sm text-gray-500 mb-4">Explore other areas of our church:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/" className="bg-[#E31E24] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2">
                  <Home size={18} />
                  Return Home
                </a>
                <a href="/events" className="bg-[#FFD500] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2">
                  <Calendar size={18} />
                  View Events
                </a>
                <a href="/ministries" className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors flex items-center gap-2">
                  <Users size={18} />
                  Our Ministries
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://ucarecdn.com/a249fb92-9b2c-4213-9811-b343543f6162/-/format/auto/"
                  alt="TAG Logo"
                  className="h-12 w-12"
                />
                <div>
                  <h3 className="text-lg font-bold">
                    Filadelfia Christian Centre
                  </h3>
                  <p className="text-sm text-gray-400">
                    Tanzania Assemblies of God
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                A community of faith, hope, and love in Jesus Christ.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Ministries
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sermons
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ministries</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Children's Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Youth Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Women's Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Men's Ministry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <p>123 Church Street</p>
                <p>Dar es Salaam, Tanzania</p>
                <p>+255 123 456 789</p>
                <p>info@filadelfiatz.org</p>
              </div>
              
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/filadelfiatz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  title="Follow us on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://instagram.com/filadelfiatz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E4405F] text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
                  title="Follow us on Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://wa.me/255123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  title="Chat with us on WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href="https://youtube.com/@filadelfiatz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF0000] text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Subscribe to our YouTube channel"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <div className="flex justify-between items-center">
              <p>&copy; 2025 Filadelfia Christian Centre. All rights reserved.</p>
              
              {/* Language Selector */}
              <div className="relative language-selector">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="text-white hover:text-[#FFD500] transition-colors font-semibold"
                >
                  {currentLanguage}
                </button>
                
                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 min-w-[180px] z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full px-4 py-2 text-left hover:bg-[#E31E24]/10 transition-colors flex items-center gap-3 ${
                          currentLanguage === language.code 
                            ? 'bg-[#E31E24]/5 text-[#E31E24] font-semibold' 
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <div>
                          <div className="font-medium">{language.name}</div>
                          <div className="text-xs text-gray-500">{language.code}</div>
                        </div>
                        {currentLanguage === language.code && (
                          <div className="ml-auto w-2 h-2 bg-[#E31E24] rounded-full"></div>
                        )}
                      </button>
                    ))}
                    
                    {/* Coming Soon Languages */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <div className="px-4 py-1 text-xs text-gray-400 font-medium">
                        Coming Soon
                      </div>
                      <button className="w-full px-4 py-2 text-left text-gray-400 cursor-not-allowed flex items-center gap-3">
                        <span className="text-lg">🇪🇸</span>
                        <div>
                          <div className="font-medium">Español</div>
                          <div className="text-xs">ES</div>
                        </div>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-400 cursor-not-allowed flex items-center gap-3">
                        <span className="text-lg">🇵🇹</span>
                        <div>
                          <div className="font-medium">Português</div>
                          <div className="text-xs">PT</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes swing {
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-swing {
          animation: swing 1s ease-in-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-8deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
