import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';
import {
  ChevronRight,
  Play,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Clock,
  Heart,
  Users,
  BookOpen,
  Flame,
  User,
  MessageCircle,
  Globe,
  ChevronDown,
  Shield,
} from "@/lib/icons";
import { imageStorage } from '@/lib/storage';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language?.toUpperCase() || 'EN');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showJoinMinistryModal, setShowJoinMinistryModal] = useState(false);
  const [selectedJoinMinistry, setSelectedJoinMinistry] = useState(null);
  const [pastorImage, setPastorImage] = useState('/images/pastors/pastor-john.jpg'); // Fallback to static
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    occupation: '',
    previousChurch: '',
    interests: [],
    visitReason: '',
    prayerRequests: '',
    preferredContact: 'email'
  });
  const [ministryJoinData, setMinistryJoinData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    availability: [],
    motivation: '',
    skills: '',
    previousVolunteer: '',
    references: ''
  });

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
    console.log(`Language changed to: ${languageCode}`);
  };

  const bibleVerses = [
    {
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16",
    },
    {
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      reference: "Romans 8:28",
    },
    {
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
      reference: "Proverbs 3:5",
    },
    {
      text: "I can do all this through him who gives me strength.",
      reference: "Philippians 4:13",
    },
  ];

  const upcomingEvents = [
    {
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "9:00 AM & 11:00 AM",
      location: "Main Sanctuary",
    },
    {
      title: "Youth Fellowship",
      date: "Friday",
      time: "6:00 PM",
      location: "Youth Hall",
    },
    {
      title: "Prayer Meeting",
      date: "Wednesday",
      time: "6:30 PM",
      location: "Prayer Room",
    },
    {
      title: "Bible Study",
      date: "Thursday",
      time: "7:00 PM",
      location: "Fellowship Hall",
    },
  ];

  const recentSermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor Neema Mndasha",
      date: "Nov 3, 2025",
      duration: "45 min",
    },
    {
      title: "The Power of Prayer",
      speaker: "Pastor Mary Kileo",
      date: "Oct 27, 2025",
      duration: "38 min",
    },
    {
      title: "God's Unfailing Love",
      speaker: "Pastor Neema Mndasha",
      date: "Oct 20, 2025",
      duration: "42 min",
    },
  ];

  const ministries = [
    {
      name: "Children's Ministry",
      icon: Heart,
      description: "Nurturing young hearts in faith",
      details: {
        fullDescription: "Our Children's Ministry is dedicated to creating a safe, fun, and engaging environment where children can learn about God's love through age-appropriate activities, Bible stories, and worship.",
        ageGroups: ["Nursery (0-2 years)", "Toddlers (2-4 years)", "Kids Church (5-12 years)"],
        activities: ["Bible storytelling", "Creative arts & crafts", "Music and worship", "Games and activities", "Scripture memorization"],
        meetingTimes: "Sundays during main service (9:00 AM & 11:00 AM), Wednesday Kids Club (5:30 PM)",
        leadership: "Children's Ministry Leader Odeta Kalindile",
        contact: "children@filadelfiatz.org"
      }
    },
    {
      name: "Youth Ministry",
      icon: Users,
      description: "Empowering the next generation",
      details: {
        fullDescription: "Our Youth Ministry focuses on building strong Christian foundations in teenagers through mentorship, fellowship, and practical life applications of biblical principles.",
        ageGroups: ["Middle School (13-15 years)", "High School (16-18 years)", "Young Adults (19-25 years)"],
        activities: ["Weekly youth services", "Leadership training", "Community service projects", "Youth camps and retreats", "Sports and recreation", "Career guidance"],
        meetingTimes: "Fridays 6:00 PM - 9:00 PM, Monthly Saturday outings",
        leadership: "Youth Ministry Leader Jaston Dogoda",
        contact: "youth@filadelfiatz.org"
      }
    },
    {
      name: "Women's Ministry",
      icon: Heart,
      description: "Building sisterhood in Christ",
      details: {
        fullDescription: "Our Women's Ministry creates opportunities for women to grow spiritually, build meaningful relationships, and support one another through all seasons of life.",
        ageGroups: ["Young Women (18-35)", "Mothers & Families", "Mature Women (50+)"],
        activities: ["Bible study groups", "Prayer circles", "Life skills workshops", "Mentorship programs", "Community outreach", "Women's conferences"],
        meetingTimes: "Saturdays 2:00 PM - 4:00 PM, Monthly special events",
        leadership: "Women's Ministry Leader Magreth Senzige",
        contact: "women@filadelfiatz.org"
      }
    },
    {
      name: "Men's Ministry",
      icon: Users,
      description: "Strengthening men of faith",
      details: {
        fullDescription: "Our Men's Ministry focuses on developing godly men who lead with integrity in their families, workplaces, and communities through fellowship and biblical teaching.",
        ageGroups: ["Young Men (18-35)", "Fathers & Husbands", "Senior Men (50+)"],
        activities: ["Men's breakfast meetings", "Bible study", "Leadership development", "Community service", "Sports fellowship", "Marriage enrichment"],
        meetingTimes: "First Saturday of each month 7:00 AM - 9:00 AM",
        leadership: "Men's Ministry Leader Michael Mhagama",
        contact: "men@filadelfiatz.org"
      }
    },
    {
      name: "Worship Ministry",
      icon: Heart,
      description: "Leading hearts in praise",
      details: {
        fullDescription: "Our Worship Ministry is committed to creating an atmosphere where people can encounter God through music, leading the congregation in heartfelt worship and praise.",
        ageGroups: ["All ages welcome", "Children's choir (5-12)", "Youth worship team (13-25)", "Adult choir & musicians"],
        activities: ["Sunday worship leading", "Choir practice", "Instrument training", "Songwriting workshops", "Special music events", "Recording ministry"],
        meetingTimes: "Choir practice: Wednesdays 7:00 PM, Band practice: Thursdays 7:00 PM",
        leadership: "Worship Ministry Leader Jeremia Isaya",
        contact: "worship@filadelfiatz.org"
      }
    },
    {
      name: "Bible Study",
      icon: BookOpen,
      description: "Growing deeper in God's Word",
      details: {
        fullDescription: "Our Bible Study groups provide opportunities for deeper exploration of Scripture through systematic study, discussion, and practical application of God's Word in daily life.",
        ageGroups: ["Adult Bible Study", "Young Adult Study Group", "Senior Saints Study"],
        activities: ["Verse-by-verse study", "Topical studies", "Book studies", "Small group discussions", "Scripture memorization", "Application workshops"],
        meetingTimes: "Thursdays 7:00 PM - 8:30 PM, Sunday School 8:00 AM",
        leadership: "Bible Study Coordinator John Mchosa",
        contact: "biblestudy@filadelfiatz.org"
      }
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % bibleVerses.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Close language dropdown when clicking outside
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

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng.toUpperCase());
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Load pastor image from Supabase Storage
  useEffect(() => {
    const loadPastorImage = async () => {
      try {
        const result = await imageStorage.listImages('church', '');
        if (result.success && result.images.length > 0) {
          // Look for pastor image (you can make this more specific)
          const pastorImg = result.images.find(img => 
            img.name.toLowerCase().includes('pastor') || 
            img.name.toLowerCase().includes('john')
          );
          if (pastorImg) {
            setPastorImage(pastorImg.url);
          }
        }
      } catch (error) {
        console.log('Using fallback pastor image:', error);
        // Keep the fallback static image
      }
    };

    loadPastorImage();
  }, []);

  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setRegistrationData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted:', registrationData);
    // Here you would typically send the data to your backend
    alert('Thank you for registering! We will contact you soon.');
    setShowRegistrationForm(false);
    setShowJoinModal(false);
    // Reset form
    setRegistrationData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      age: '',
      occupation: '',
      previousChurch: '',
      interests: [],
      visitReason: '',
      prayerRequests: '',
      preferredContact: 'email'
    });
  };

  const handleMinistryJoinInputChange = (e) => {
    const { name, value } = e.target;
    setMinistryJoinData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (day) => {
    setMinistryJoinData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleMinistryJoinSubmit = (e) => {
    e.preventDefault();
    console.log('Ministry join submitted:', {
      ministry: selectedJoinMinistry?.name,
      data: ministryJoinData
    });
    alert(`Thank you for your interest in joining ${selectedJoinMinistry?.name}! We will contact you soon.`);
    setShowJoinMinistryModal(false);
    setSelectedJoinMinistry(null);
    // Reset form
    setMinistryJoinData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      availability: [],
      motivation: '',
      skills: '',
      previousVolunteer: '',
      references: ''
    });
  };

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
              <a
                href="/"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                {t('nav.home')}
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                {t('nav.about')}
              </a>
              <a
                href="/ministries"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                {t('nav.ministries')}
              </a>
              <a
                href="/sermons"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                {t('nav.sermons')}
              </a>
              <a
                href="/events"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                {t('nav.events')}
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                {t('nav.contact')}
              </a>
              
              <a
                href="/give"
                className="bg-[#E31E24] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
              >
                {t('nav.giveOnline')}
              </a>

              {/* Custom Attractive Button */}
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://ucarecdn.com/73435ffb-c8b5-4ffc-b8ca-cde08ab6e99d/-/format/auto/"
            alt="Filadelfia Christian Centre Sanctuary"
            className="w-full h-full object-cover"
          />
          {/* Warm gradient overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/60 via-red-500/50 to-orange-600/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-[#FFD500]/10 rounded-full animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#E31E24]/10 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {t('hero.welcomeTo')}
            <br />
            <span className="text-[#FFD500]">{t('hero.churchName')}</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
            {t('hero.subtitle')}
          </p>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8 inline-block border border-white/20">
            <p className="text-white text-lg italic mb-2 drop-shadow-lg">
              "{bibleVerses[currentVerseIndex].text}"
            </p>
            <p className="text-[#FFD500] font-semibold drop-shadow-lg">
              - {bibleVerses[currentVerseIndex].reference}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#E31E24] text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <Play size={20} />
              {t('hero.watchLive')}
            </button>
            <button className="bg-white text-[#E31E24] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <MapPin size={20} />
              {t('hero.visitUs')}
            </button>
            <button className="bg-[#FFD500] text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <Heart size={20} />
              {t('hero.giveOnline')}
            </button>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            {t('serviceTimes.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Clock className="h-12 w-12 text-[#E31E24] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('serviceTimes.sundayMorning')}</h3>
              <p className="text-gray-600">{t('serviceTimes.sundayTime')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('serviceTimes.sundayService')}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-[#FFD500] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('serviceTimes.wednesdayEvening')}</h3>
              <p className="text-gray-600">{t('serviceTimes.wednesdayTime')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('serviceTimes.prayerMeeting')}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <BookOpen className="h-12 w-12 text-[#E31E24] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('serviceTimes.fridayEvening')}</h3>
              <p className="text-gray-600">{t('serviceTimes.fridayTime')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('serviceTimes.youthFellowship')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastor's Message Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              A Word from Our Pastor
            </h2>
            <div className="w-24 h-1 bg-[#E31E24] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={pastorImage}
                alt="Pastor Neema Mndasha"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                onError={(e) => {
                  // Fallback to static image if Supabase image fails
                  e.target.src = '/images/pastors/pastor-neema.jpg';
                }}
              />
              <div className="absolute -bottom-4 -right-4 bg-[#E31E24] text-white p-4 rounded-lg shadow-lg">
                <Flame className="h-8 w-8" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Pastor Neema Mndasha
              </h3>
              <p className="text-[#E31E24] font-semibold mb-6">Senior Pastor</p>

              <div className="bg-gradient-to-r from-[#E31E24]/5 to-[#FFD500]/5 p-6 rounded-lg border-l-4 border-[#E31E24] mb-6">
                <p className="text-gray-700 leading-relaxed italic">
                  "Welcome to our church family! At Filadelfia Christian Centre,
                  we believe that every person who walks through our doors is
                  precious to God. Whether you're seeking answers, looking for
                  community, or wanting to grow deeper in your faith, you'll
                  find a warm welcome here."
                </p>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Pastor Neema has been leading our congregation for over 15 years,
                bringing passionate teaching and a heart for community outreach.
                His vision is to see every member equipped to serve God and make
                a difference in Tanzania and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#E31E24] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <BookOpen size={20} />
                  Watch Recent Message
                </button>
                <button className="border-2 border-[#E31E24] text-[#E31E24] px-6 py-3 rounded-lg font-semibold hover:bg-[#E31E24] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Meet Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Sermons Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Recent Sermons
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recentSermons.map((sermon, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-[#E31E24] to-[#FFD500] h-48 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white hover:scale-110 transition-transform cursor-pointer" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{sermon.title}</h3>
                  <p className="text-gray-600 mb-2">{sermon.speaker}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{sermon.date}</span>
                    <span>{sermon.duration}</span>
                  </div>
                  <button className="mt-4 w-full bg-[#E31E24] text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/sermons"
            className="bg-[#E31E24] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center gap-2"
          >
            View All Sermons <ChevronRight size={20} />
          </a>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#E31E24] text-white p-3 rounded-lg">
                    <Calendar size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p className="flex items-center gap-2">
                        <Calendar size={16} />
                        {event.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} />
                        {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/events"
            className="bg-[#FFD500] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
          >
            View All Events <ChevronRight size={20} />
          </a>
        </div>
      </section>

      {/* Ministries Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('ministries.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('ministries.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ministries.slice(0, 3).map((ministry, index) => {
              const IconComponent = ministry.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <IconComponent className="h-12 w-12 text-[#E31E24] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {ministry.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{ministry.description}</p>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setSelectedMinistry(ministry)}
                      className="text-[#E31E24] font-semibold hover:text-red-600 transition-colors flex items-center gap-1"
                    >
                      {t('ministries.learnMore')} <ChevronRight size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedJoinMinistry(ministry);
                        setShowJoinMinistryModal(true);
                      }}
                      className="bg-gradient-to-r from-[#E31E24] to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-[#E31E24] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Heart size={16} />
                      Join Ministry
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="/ministries"
              className="bg-[#E31E24] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center gap-2"
            >
              {t('ministries.viewAll')} <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-[#E31E24] to-[#FFD500]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you're new to faith or looking for a church home, we'd love
            to welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="bg-white text-[#E31E24] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Users size={20} />
              Learn About Us
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#E31E24] transition-colors inline-flex items-center justify-center gap-2"
            >
              <MapPin size={20} />
              Plan Your Visit
            </a>
          </div>
        </div>
      </section>

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

      {/* WhatsApp Chatbot - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/255123456789?text=Hello%20Filadelfia%20Christian%20Centre!%20I%20would%20like%20to%20know%20more%20about%20your%20church."
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-bounce"
          title={t('whatsapp.tooltip')}
        >
          <MessageCircle size={28} className="group-hover:animate-pulse" />
          
          {/* Chat bubble with message */}
          <div className="absolute bottom-full right-0 mb-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="text-sm font-medium">{t('whatsapp.helpMessage')}</div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </div>
        </a>
      </div>

      {/* Join Us Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#E31E24] to-[#FFD500] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <Flame className="h-8 w-8 animate-bounce" />
                <h2 className="text-2xl font-bold">Join Our Church Family!</h2>
              </div>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-white hover:text-gray-200 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-lg mb-4">
                  We're excited that you're interested in becoming part of our church family! 
                  Here are some ways you can get involved:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setShowRegistrationForm(true)}
                  className="bg-gradient-to-r from-[#E31E24] to-red-600 text-white p-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-center"
                >
                  <User className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Register as Member</h3>
                  <p className="text-sm opacity-90">Fill out registration form</p>
                </button>

                <a
                  href="/about"
                  onClick={() => setShowJoinModal(false)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-center"
                >
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Visit Our Church</h3>
                  <p className="text-sm opacity-90">Join us for Sunday service</p>
                </a>

                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    setSelectedMinistry(ministries[0]);
                  }}
                  className="bg-gradient-to-r from-[#FFD500] to-yellow-400 text-black p-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-center"
                >
                  <Heart className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Join a Ministry</h3>
                  <p className="text-sm opacity-75">Get involved in serving</p>
                </button>

                <a
                  href="/events"
                  onClick={() => setShowJoinModal(false)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-center"
                >
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Upcoming Events</h3>
                  <p className="text-sm opacity-90">See what's happening</p>
                </a>
              </div>

              <div className="bg-gradient-to-r from-[#E31E24]/5 to-[#FFD500]/5 p-4 rounded-lg border-l-4 border-[#E31E24] mb-6">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-[#E31E24]" />
                  Sunday Service Times
                </h4>
                <p className="text-gray-600 mb-2">
                  <strong>Main Service:</strong> Sundays at 9:00 AM & 11:00 AM
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> 123 Church Street, Dar es Salaam
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Ready to take the next step? We'd love to welcome you into our church family!
                </p>
                <a
                  href="https://wa.me/255123456789?text=Hello%20Filadelfia%20Christian%20Centre!%20I%20would%20like%20to%20join%20your%20church%20family."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowJoinModal(false)}
                  className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  Connect on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#E31E24] to-[#FFD500] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Church Registration Form</h2>
              </div>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="text-white hover:text-gray-200 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  We're excited to welcome you to our church family! Please fill out this form so we can get to know you better.
                </p>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-[#E31E24]" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={registrationData.firstName}
                    onChange={handleRegistrationInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={registrationData.lastName}
                    onChange={handleRegistrationInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={registrationData.email}
                    onChange={handleRegistrationInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={registrationData.phone}
                    onChange={handleRegistrationInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={registrationData.age}
                    onChange={handleRegistrationInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    value={registrationData.occupation}
                    onChange={handleRegistrationInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={registrationData.address}
                  onChange={handleRegistrationInputChange}
                  className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                />
              </div>

              {/* Church Background */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-[#E31E24]" />
                  Church Background
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="previousChurch"
                    placeholder="Previous Church (if any)"
                    value={registrationData.previousChurch}
                    onChange={handleRegistrationInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <textarea
                    name="visitReason"
                    placeholder="What brought you to our church?"
                    value={registrationData.visitReason}
                    onChange={handleRegistrationInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Interests & Ministries */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-[#E31E24]" />
                  Areas of Interest
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['Worship Team', 'Children\'s Ministry', 'Youth Ministry', 'Women\'s Ministry', 'Men\'s Ministry', 'Bible Study', 'Prayer Ministry', 'Evangelism Ministry', 'Administrative Support', 'Technical/Media', 'Hospitality'].map((interest) => (
                    <label key={interest} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={registrationData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="w-4 h-4 text-[#E31E24] bg-gray-100 border-gray-300 rounded focus:ring-[#E31E24] focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Communication Preferences */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageCircle size={20} className="text-[#E31E24]" />
                  Communication Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={registrationData.preferredContact === 'email'}
                          onChange={handleRegistrationInputChange}
                          className="w-4 h-4 text-[#E31E24] bg-gray-100 border-gray-300 focus:ring-[#E31E24] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={registrationData.preferredContact === 'phone'}
                          onChange={handleRegistrationInputChange}
                          className="w-4 h-4 text-[#E31E24] bg-gray-100 border-gray-300 focus:ring-[#E31E24] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">Phone</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="whatsapp"
                          checked={registrationData.preferredContact === 'whatsapp'}
                          onChange={handleRegistrationInputChange}
                          className="w-4 h-4 text-[#E31E24] bg-gray-100 border-gray-300 focus:ring-[#E31E24] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">WhatsApp</span>
                      </label>
                    </div>
                  </div>
                  <textarea
                    name="prayerRequests"
                    placeholder="Prayer requests or additional information (optional)"
                    value={registrationData.prayerRequests}
                    onChange={handleRegistrationInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      Privacy & Data Protection
                    </p>
                    <p className="text-sm text-blue-700">
                      Your information will be kept confidential and used only for church communication and ministry purposes. 
                      We will never share your details with third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#E31E24] to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-[#E31E24] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Heart size={20} />
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Ministry Modal */}
      {showJoinMinistryModal && selectedJoinMinistry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#E31E24] to-[#FFD500] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <selectedJoinMinistry.icon className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Join {selectedJoinMinistry.name}</h2>
                  <p className="text-white/90">{selectedJoinMinistry.description}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowJoinMinistryModal(false);
                  setSelectedJoinMinistry(null);
                }}
                className="text-white hover:text-gray-200 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleMinistryJoinSubmit} className="p-6 space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  We're excited about your interest in joining {selectedJoinMinistry.name}! 
                  Please fill out this form so we can connect you with the right opportunities.
                </p>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-[#E31E24]" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={ministryJoinData.firstName}
                    onChange={handleMinistryJoinInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={ministryJoinData.lastName}
                    onChange={handleMinistryJoinInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={ministryJoinData.email}
                    onChange={handleMinistryJoinInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={ministryJoinData.phone}
                    onChange={handleMinistryJoinInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Experience & Skills */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-[#E31E24]" />
                  Experience & Skills
                </h3>
                <div className="space-y-4">
                  <textarea
                    name="experience"
                    placeholder="Previous experience in this ministry area (if any)"
                    value={ministryJoinData.experience}
                    onChange={handleMinistryJoinInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <textarea
                    name="skills"
                    placeholder="Relevant skills or talents you'd like to contribute"
                    value={ministryJoinData.skills}
                    onChange={handleMinistryJoinInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="previousVolunteer"
                    placeholder="Previous volunteer experience (at this or other churches)"
                    value={ministryJoinData.previousVolunteer}
                    onChange={handleMinistryJoinInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-[#E31E24]" />
                  Availability
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Which days are you available? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                        <label key={day} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={ministryJoinData.availability.includes(day)}
                            onChange={() => handleAvailabilityChange(day)}
                            className="w-4 h-4 text-[#E31E24] bg-gray-100 border-gray-300 rounded focus:ring-[#E31E24] focus:ring-2"
                          />
                          <span className="text-sm text-gray-700">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-[#E31E24]" />
                  Your Heart for Ministry
                </h3>
                <div className="space-y-4">
                  <textarea
                    name="motivation"
                    placeholder="What motivates you to serve in this ministry? *"
                    value={ministryJoinData.motivation}
                    onChange={handleMinistryJoinInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="references"
                    placeholder="References (names of church members who know you)"
                    value={ministryJoinData.references}
                    onChange={handleMinistryJoinInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Ministry-specific Information */}
              <div className="bg-gradient-to-r from-[#E31E24]/5 to-[#FFD500]/5 p-4 rounded-lg border-l-4 border-[#E31E24]">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <selectedJoinMinistry.icon size={18} className="text-[#E31E24]" />
                  About {selectedJoinMinistry.name}
                </h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Meeting Times:</strong> {selectedJoinMinistry.details.meetingTimes}</p>
                  <p><strong>Leadership:</strong> {selectedJoinMinistry.details.leadership}</p>
                  <p><strong>Contact:</strong> {selectedJoinMinistry.details.contact}</p>
                </div>
              </div>

              {/* Commitment Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      Ministry Commitment
                    </p>
                    <p className="text-sm text-blue-700">
                      We encourage volunteers to commit to serving for at least 6 months to help build 
                      consistency and relationships within the ministry team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowJoinMinistryModal(false);
                    setSelectedJoinMinistry(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#E31E24] to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-[#E31E24] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <selectedJoinMinistry.icon size={20} />
                  Join {selectedJoinMinistry.name}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ministry Details Modal */}
      {selectedMinistry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <selectedMinistry.icon className="h-8 w-8 text-[#E31E24]" />
                <h2 className="text-2xl font-bold text-gray-800">{selectedMinistry.name}</h2>
              </div>
              <button
                onClick={() => setSelectedMinistry(null)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Ministry</h3>
                <p className="text-gray-600 leading-relaxed">{selectedMinistry.details.fullDescription}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-md font-semibold text-[#E31E24] mb-3">Age Groups</h4>
                  <ul className="space-y-2">
                    {selectedMinistry.details.ageGroups.map((group, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-[#E31E24] rounded-full"></div>
                        {group}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-[#E31E24] mb-3">Activities & Programs</h4>
                  <ul className="space-y-2">
                    {selectedMinistry.details.activities.map((activity, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-[#FFD500] rounded-full"></div>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Clock size={18} className="text-[#E31E24]" />
                    Meeting Times
                  </h4>
                  <p className="text-gray-600">{selectedMinistry.details.meetingTimes}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <User size={18} className="text-[#E31E24]" />
                    Leadership
                  </h4>
                  <p className="text-gray-600">{selectedMinistry.details.leadership}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#E31E24]/5 to-[#FFD500]/5 p-4 rounded-lg border-l-4 border-[#E31E24] mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Mail size={18} className="text-[#E31E24]" />
                  Get Involved
                </h4>
                <p className="text-gray-600 mb-3">
                  Interested in joining {selectedMinistry.name}? We'd love to have you! 
                  Contact us to learn more about how you can get involved.
                </p>
                <div className="text-sm text-[#E31E24] font-semibold">
                  Email: {selectedMinistry.details.contact}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setSelectedMinistry(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedMinistry.details.contact}?subject=Interest in ${selectedMinistry.name}`}
                  className="px-6 py-3 bg-[#E31E24] text-white rounded-lg font-semibold hover:bg-red-600 transition-colors text-center"
                >
                  Contact Ministry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
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
