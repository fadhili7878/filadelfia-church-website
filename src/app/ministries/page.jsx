"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  BookOpen,
  Baby,
  Music,
  Globe,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { imageStorage } from "@/lib/storage";
import Footer from '@/components/Footer';
import { gallery } from '@/lib/database';

export default function MinistriesPage() {
  const [selectedMinistry, setSelectedMinistry] = useState("children");
  const [showJoinMinistryModal, setShowJoinMinistryModal] = useState(false);
  const [selectedJoinMinistry, setSelectedJoinMinistry] = useState(null);
  const [youthImages, setYouthImages] = useState([]);
  const [currentYouthImageIndex, setCurrentYouthImageIndex] = useState(0);
  const [childrenImages, setChildrenImages] = useState([]);
  const [currentChildrenImageIndex, setCurrentChildrenImageIndex] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
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

  const ministries = [
    {
      id: "children",
      name: "Children's Ministry",
      tagline: "Nurturing Young Hearts in Faith",
      icon: Baby,
      color: "#E31E24",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
      description:
        "Our Children's Ministry is dedicated to creating a fun, safe, and nurturing environment where children can learn about God's love and develop a strong foundation of faith.",
      ageGroups: [
        "Nursery (0-2 years)",
        "Toddlers (3-4 years)",
        "Kids (5-8 years)",
        "Juniors (9-12 years)",
      ],
      programs: [
        {
          name: "Sunday School",
          time: "Every Sunday, 6:00-8:00 AM & 9:00 AM-1:00 PM",
          description: "Bible stories, crafts, and activities",
        },
        {
          name: "Vacation Bible School",
          time: "Annual Summer Program",
          description: "Week-long intensive Bible learning and fun",
        },
        {
          name: "Kids Choir",
          time: "Saturday, 3:00 PM",
          description: "Musical worship training for children",
        },
        {
          name: "Family Fun Day",
          time: "Monthly",
          description: "Special events for families with children",
        },
      ],
      leader: "Odeta Kalindile",
      contact: "children@filadelfiatz.org",
    },
    {
      id: "youth",
      name: "Youth Ministry",
      tagline: "Empowering the Next Generation",
      icon: Users,
      color: "#FFD500",
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=400&fit=crop",
      description:
        "Our Youth Ministry focuses on helping teenagers and young adults discover their identity in Christ while building lasting friendships and developing leadership skills.",
      ageGroups: ["Teens (13-17 years)", "Young Adults (18-25 years)"],
      programs: [
        {
          name: "Friday Fellowship",
          time: "Every Friday, 4:00-6:00 PM",
          description: "Worship, teaching, and fellowship time",
        },
        {
          name: "Youth Bible Study",
          time: "Thursday, 7:00 PM",
          description: "Deep dive into God's Word for young people",
        },
        {
          name: "Leadership Training",
          time: "Monthly Saturdays",
          description: "Developing next generation leaders",
        },
        {
          name: "Youth Camps",
          time: "Quarterly",
          description: "Retreats and outdoor adventures",
        },
      ],
      leader: "Jaston Dogoda",
      contact: "youth@filadelfiatz.org",
    },
    {
      id: "womens",
      name: "Women's Ministry",
      tagline: "Building Sisterhood in Christ",
      icon: Heart,
      color: "#E31E24",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
      description:
        "Our Women's Ministry provides a place for women of all ages to connect, grow in their faith, and support one another through life's journey.",
      ageGroups: [
        "Young Women (18-35)",
        "Mature Women (35+)",
        "Senior Saints (60+)",
      ],
      programs: [
        {
          name: "Women's Bible Study",
          time: "Tuesday, 4:00-6:00 PM",
          description: "Weekly Bible study and prayer",
        },
        {
          name: "Ladies Night Out",
          time: "First Saturday",
          description: "Fellowship and encouragement time",
        },
        {
          name: "Mother's Group",
          time: "Thursday, 10:00 AM",
          description: "Support group for mothers",
        },
        {
          name: "Women's Conference",
          time: "Annual",
          description: "Special conference with guest speakers",
        },
      ],
      leader: "Magreth Senzige",
      contact: "women@filadelfiatz.org",
    },
    {
      id: "mens",
      name: "Men's Ministry",
      tagline: "Strengthening Men of Faith",
      icon: Users,
      color: "#000000",
      image:
        "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=400&fit=crop",
      description:
        "Our Men's Ministry focuses on building strong Christian men who lead their families and communities with integrity and purpose.",
      ageGroups: ["Young Men (18-35)", "Mature Men (35+)", "Senior Men (60+)"],
      programs: [
        {
          name: "Men's Prayer Breakfast",
          time: "First Saturday, 8:00 AM",
          description: "Fellowship and prayer over breakfast",
        },
        {
          name: "Iron Sharpens Iron",
          time: "Wednesday, 7:00 PM",
          description: "Men's Bible study and accountability",
        },
        {
          name: "Men's Retreat",
          time: "Annual",
          description: "Weekend retreat for spiritual growth",
        },
        {
          name: "Service Projects",
          time: "Monthly",
          description: "Community service and outreach",
        },
      ],
      leader: "Michael Mhagama",
      contact: "men@filadelfiatz.org",
    },
    {
      id: "worship",
      name: "Worship Ministry",
      tagline: "Leading Hearts in Praise",
      icon: Music,
      color: "#FFD500",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      description:
        "Our Worship Ministry serves to create an atmosphere of reverence and celebration, helping our congregation connect with God through music and praise.",
      ageGroups: ["All Ages Welcome"],
      programs: [
        {
          name: "Choir Rehearsal",
          time: "Thursday, 7:00 PM",
          description: "Main church choir practice",
        },
        {
          name: "Praise Team",
          time: "Saturday, 4:00 PM",
          description: "Contemporary worship team",
        },
        {
          name: "Music Lessons",
          time: "By Appointment",
          description: "Individual instrument and voice training",
        },
        {
          name: "Worship Workshop",
          time: "Quarterly",
          description: "Training for worship leaders",
        },
      ],
      leader: "Jeremia Isaya",
      contact: "worship@filadelfiatz.org",
    },
    {
      id: "prayer",
      name: "Prayer Ministry",
      tagline: "Connecting with God's Heart",
      icon: Heart,
      color: "#E31E24",
      image:
        "https://images.unsplash.com/photo-1507692132682-ec2f18f1e37e?w=800&h=400&fit=crop",
      description:
        "Our Prayer Ministry is the heartbeat of our church, providing opportunities for individual and corporate prayer, intercession, and spiritual warfare.",
      ageGroups: ["All Ages Welcome"],
      programs: [
        {
          name: "Prayer Meeting",
          time: "Wednesday, 4:00-6:00 PM",
          description: "Corporate prayer and intercession",
        },
        {
          name: "Early Morning Prayer",
          time: "Saturday, 6:00 AM",
          description: "Start the weekend with prayer",
        },
        {
          name: "Prayer Chain",
          time: "24/7 Availability",
          description: "Emergency prayer requests",
        },
        {
          name: "Fasting & Prayer",
          time: "Monthly",
          description: "Special times of seeking God",
        },
      ],
      leader: "Janeth Clement",
      contact: "prayer@filadelfiatz.org",
    },
    {
      id: "evangelism",
      name: "Evangelism Ministry",
      tagline: "Sharing the Good News",
      icon: Globe,
      color: "#000000",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
      description:
        "Our Evangelism Ministry focuses on sharing the Gospel message with our community and beyond, equipping believers to be effective witnesses for Christ.",
      ageGroups: ["All Ages Welcome"],
      programs: [
        {
          name: "Evangelism Training",
          time: "Monthly",
          description: "Learning to share the Gospel effectively",
        },
        {
          name: "Street Evangelism",
          time: "Weekly",
          description: "Outreach in the community",
        },
        {
          name: "Revival Services",
          time: "Quarterly",
          description: "Special evangelistic services",
        },
        {
          name: "Crusades & Campaigns",
          time: "Bi-Annual",
          description: "Large-scale evangelistic events",
        },
      ],
      leader: "Safina Daniel",
      contact: "evangelism@filadelfiatz.org",
    },
    {
      id: "discipleship",
      name: "Discipleship & Bible Study",
      tagline: "Growing Deeper in God's Word",
      icon: BookOpen,
      color: "#FFD500",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
      description:
        "Our Discipleship Ministry helps believers grow in their relationship with God through systematic Bible study and spiritual mentorship.",
      ageGroups: ["New Believers", "Growing Christians", "Mature Believers"],
      programs: [
        {
          name: "New Members Class",
          time: "First Sunday",
          description: "Introduction to church family",
        },
        {
          name: "Bible Study Groups",
          time: "Various Times",
          description: "Small group Bible studies",
        },
        {
          name: "Mentorship Program",
          time: "Ongoing",
          description: "One-on-one spiritual guidance",
        },
        {
          name: "Theology Classes",
          time: "Monthly",
          description: "Deeper theological education",
        },
      ],
      leader: "John Mchosa",
      contact: "discipleship@filadelfiatz.org",
    },
  ];

  // Load youth images from Supabase Storage
  useEffect(() => {
    const loadYouthImages = async () => {
      try {
        // Try to load from organized youth folder first
        const folderResult = await imageStorage.listImages('ministry', 'youth');
        
        if (folderResult.success && folderResult.images.length > 0) {
          setYouthImages(folderResult.images);
        } else {
          // Fallback: Load from root ministry folder and filter
          const result = await imageStorage.listImages('ministry', '');
          if (result.success && result.images.length > 0) {
            const youthImgs = result.images.filter(img => 
              img.name.toLowerCase().startsWith('youth')
            );
            setYouthImages(youthImgs);
          }
        }
      } catch (error) {
        console.log('No youth images found:', error);
      }
    };

    loadYouthImages();
  }, []);

  // Load children images from Supabase Storage
  useEffect(() => {
    const loadChildrenImages = async () => {
      try {
        // Try to load from organized children folder first
        const folderResult = await imageStorage.listImages('ministry', 'children');
        
        if (folderResult.success && folderResult.images.length > 0) {
          setChildrenImages(folderResult.images);
        } else {
          // Fallback: Load from root ministry folder and filter
          const result = await imageStorage.listImages('ministry', '');
          if (result.success && result.images.length > 0) {
            const childrenImgs = result.images.filter(img => 
              img.name.toLowerCase().startsWith('children') ||
              img.name.toLowerCase().startsWith('child') ||
              img.name.toLowerCase().includes('kids')
            );
            setChildrenImages(childrenImgs);
          }
        }
      } catch (error) {
        console.log('No children images found:', error);
      }
    };

    loadChildrenImages();
  }, []);

  // Auto-advance youth slideshow
  useEffect(() => {
    if (youthImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentYouthImageIndex((prev) => 
          (prev + 1) % youthImages.length
        );
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [youthImages.length]);

  // Auto-advance children slideshow
  useEffect(() => {
    if (childrenImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentChildrenImageIndex((prev) => 
          (prev + 1) % childrenImages.length
        );
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [childrenImages.length]);

  const currentMinistry = ministries.find((m) => m.id === selectedMinistry);
  const IconComponent = currentMinistry.icon;

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
      {/* Navigation */}
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
                Home
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                About
              </a>
              <a href="/ministries" className="text-[#E31E24] font-semibold">
                Ministries
              </a>
              <a
                href="/sermons"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                Sermons
              </a>
              <a
                href="/events"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                Events
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                Contact
              </a>
              <a
                href="/give"
                className="bg-[#E31E24] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
              >
                Give Online
              </a>

              {/* Custom Attractive Button */}
              <a
                href="/"
                className="group relative bg-gradient-to-r from-[#FFD500] to-[#FFA500] text-black px-6 py-2 rounded-full font-semibold hover:from-[#FFA500] hover:to-[#FFD500] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>Join Us</span>
                <div className="absolute -top-1 -right-1 bg-[#E31E24] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  !
                </div>
              </a>
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
            Our Ministries
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover the various ways you can get involved, grow in faith, and
            serve others in our vibrant church community.
          </p>
        </div>
      </section>

      {/* Ministry Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Find Your Place to Serve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every member of our church family has unique gifts and talents.
              Explore our ministries to find where you can use your gifts to
              make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ministries.map((ministry) => {
              const MinistryIcon = ministry.icon;
              const isSelected = selectedMinistry === ministry.id;
              return (
                <button
                  key={ministry.id}
                  onClick={() => setSelectedMinistry(ministry.id)}
                  className={`group relative p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-br from-[#E31E24] to-red-600 text-white shadow-2xl"
                      : "bg-white hover:shadow-xl border-2 border-gray-200 hover:border-[#E31E24]/30"
                  }`}
                >
                  {/* Decorative gradient overlay */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E31E24]/0 to-[#FFD500]/0 group-hover:from-[#E31E24]/5 group-hover:to-[#FFD500]/5 transition-all duration-300"></div>
                  )}
                  
                  {/* Accent corner */}
                  <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full transition-all duration-300 ${
                    isSelected 
                      ? "bg-white/10" 
                      : "bg-[#FFD500]/10 group-hover:bg-[#FFD500]/20"
                  }`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon with background circle */}
                    <div className={`inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 ${
                      isSelected
                        ? "bg-white/10 group-hover:bg-white/20"
                        : "bg-gradient-to-br from-[#E31E24]/10 to-[#FFD500]/10 group-hover:from-[#E31E24]/20 group-hover:to-[#FFD500]/20"
                    }`}>
                      <MinistryIcon
                        className={`h-10 w-10 transition-transform duration-300 group-hover:scale-110 ${
                          isSelected
                            ? "text-white"
                            : "text-[#E31E24]"
                        }`}
                      />
                    </div>
                    
                    <h3 className={`text-lg font-bold mb-2 transition-colors ${
                      isSelected ? "text-white" : "text-gray-800 group-hover:text-[#E31E24]"
                    }`}>
                      {ministry.name}
                    </h3>
                    
                    <p
                      className={`text-sm leading-relaxed ${
                        isSelected
                          ? "text-white/90"
                          : "text-gray-600"
                      }`}
                    >
                      {ministry.tagline}
                    </p>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="mt-4 flex items-center gap-2 text-white/90">
                        <ChevronRight size={16} />
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Ministry Details */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="relative h-80 md:h-96 lg:h-[500px]">
              {/* Youth Ministry Slideshow */}
              {currentMinistry.id === 'youth' && youthImages.length > 0 ? (
                <div className="relative w-full h-full">
                  <img
                    src={youthImages[currentYouthImageIndex]?.url}
                    alt={`Youth Ministry - ${youthImages[currentYouthImageIndex]?.name}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Navigation Arrows */}
                  {youthImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentYouthImageIndex((prev) => 
                          prev === 0 ? youthImages.length - 1 : prev - 1
                        )}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors shadow-lg"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      
                      <button
                        onClick={() => setCurrentYouthImageIndex((prev) => 
                          (prev + 1) % youthImages.length
                        )}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors shadow-lg"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Slide Indicators */}
                  {youthImages.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      {youthImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentYouthImageIndex(index)}
                          className={`w-4 h-4 rounded-full transition-colors shadow-sm ${
                            index === currentYouthImageIndex 
                              ? 'bg-white' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : currentMinistry.id === 'children' && childrenImages.length > 0 ? (
                /* Children's Ministry Slideshow */
                <div className="relative w-full h-full">
                  <img
                    src={childrenImages[currentChildrenImageIndex]?.url}
                    alt={`Children's Ministry - ${childrenImages[currentChildrenImageIndex]?.name}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Navigation Arrows */}
                  {childrenImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentChildrenImageIndex((prev) => 
                          prev === 0 ? childrenImages.length - 1 : prev - 1
                        )}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors shadow-lg"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      
                      <button
                        onClick={() => setCurrentChildrenImageIndex((prev) => 
                          (prev + 1) % childrenImages.length
                        )}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors shadow-lg"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Slide Indicators */}
                  {childrenImages.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      {childrenImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentChildrenImageIndex(index)}
                          className={`w-4 h-4 rounded-full transition-colors shadow-sm ${
                            index === currentChildrenImageIndex 
                              ? 'bg-white' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Default Ministry Image */
                <img
                  src={currentMinistry.image}
                  alt={currentMinistry.name}
                  className="w-full h-full object-cover"
                />
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <div className="p-8">
                  <IconComponent className="h-16 w-16 text-white mb-4" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {currentMinistry.name}
                  </h2>
                  <p className="text-xl text-white/90">
                    {currentMinistry.tagline}
                  </p>
                  
                  {/* Image Counter for Ministry Slideshows */}
                  {currentMinistry.id === 'youth' && youthImages.length > 0 && (
                    <p className="text-sm text-white/75 mt-2">
                      {currentYouthImageIndex + 1} of {youthImages.length} photos
                    </p>
                  )}
                  {currentMinistry.id === 'children' && childrenImages.length > 0 && (
                    <p className="text-sm text-white/75 mt-2">
                      {currentChildrenImageIndex + 1} of {childrenImages.length} photos
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    About This Ministry
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {currentMinistry.description}
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Age Groups & Programs
                  </h4>
                  <div className="space-y-4">
                    {currentMinistry.programs.map((program, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-gray-800">
                            {program.name}
                          </h5>
                          <span className="text-sm text-[#E31E24] font-medium">
                            {program.time}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {program.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Ministry Leader
                    </h4>
                    <div className="flex items-center gap-3 mb-4">
                      <User className="h-8 w-8 text-[#E31E24]" />
                      <span className="font-medium text-gray-800">
                        {currentMinistry.leader}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact our ministry leader for more information or to get
                      involved.
                    </p>
                    <a
                      href={`mailto:${currentMinistry.contact}`}
                      className="text-[#E31E24] font-semibold hover:text-red-600 transition-colors"
                    >
                      {currentMinistry.contact}
                    </a>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedJoinMinistry(currentMinistry);
                      setShowJoinMinistryModal(true);
                    }}
                    className="w-full bg-gradient-to-r from-[#E31E24] to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-[#E31E24] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Heart size={20} />
                    Join This Ministry
                  </button>

                  <div className="bg-gradient-to-br from-[#E31E24]/5 to-[#FFD500]/5 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Age Groups
                    </h4>
                    <ul className="space-y-2">
                      {currentMinistry.ageGroups.map((group, index) => (
                        <li
                          key={index}
                          className="text-gray-600 text-sm flex items-center gap-2"
                        >
                          <div className="w-2 h-2 bg-[#E31E24] rounded-full"></div>
                          {group}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Ready to Get Involved?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            We believe everyone has been gifted by God to serve in unique ways.
            Take the next step and join one of our ministries today!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#E31E24]/20">
              <div className="bg-gradient-to-br from-[#E31E24]/10 to-red-100 p-4 rounded-full inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-16 w-16 text-[#E31E24]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#E31E24] transition-colors">Attend a Meeting</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visit one of our ministry meetings to see what we're all about
                and meet the team.
              </p>
              <button 
                onClick={() => setShowScheduleModal(true)}
                className="text-[#E31E24] font-semibold hover:text-red-600 transition-colors flex items-center gap-2 group-hover:gap-3"
              >
                View Schedule
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#FFD500]/30">
              <div className="bg-gradient-to-br from-[#FFD500]/20 to-yellow-100 p-4 rounded-full inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-16 w-16 text-[#FFD500]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#FFD500] transition-colors">Contact a Leader</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Reach out to our ministry leaders to ask questions and learn
                about opportunities.
              </p>
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-[#E31E24] font-semibold hover:text-red-600 transition-colors flex items-center gap-2 group-hover:gap-3"
              >
                Contact Leaders
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#E31E24]/20">
              <div className="bg-gradient-to-br from-[#E31E24]/10 to-red-100 p-4 rounded-full inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-16 w-16 text-[#E31E24]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#E31E24] transition-colors">Start Serving</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Jump in and start using your gifts to make a difference in
                people's lives.
              </p>
              <button 
                onClick={() => setShowVolunteerModal(true)}
                className="text-[#E31E24] font-semibold hover:text-red-600 transition-colors flex items-center gap-2 group-hover:gap-3"
              >
                Volunteer Form
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#E31E24] text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Users size={20} />
              Contact Us
            </a>
            <a
              href="/about"
              className="bg-white border-2 border-[#E31E24] text-[#E31E24] px-8 py-4 rounded-full font-semibold hover:bg-[#E31E24] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
            >
              <BookOpen size={20} />
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* View Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#E31E24] to-[#FFD500] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Ministry Schedule</h2>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center">
                Here's when our ministries meet. Come join us!
              </p>

              <div className="space-y-4">
                {ministries.map((ministry) => (
                  <div key={ministry.id} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-[#E31E24]/10 to-[#FFD500]/10 p-3 rounded-xl">
                        <ministry.icon className="h-8 w-8 text-[#E31E24]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{ministry.name}</h3>
                        <div className="space-y-3">
                          {ministry.programs.map((program, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                              <Clock className="h-5 w-5 text-[#E31E24] mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-gray-800">{program.name}</p>
                                <p className="text-sm text-[#E31E24] font-medium">{program.time}</p>
                                <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-[#E31E24]/5 to-[#FFD500]/5 border border-[#E31E24]/20 rounded-xl p-6 text-center">
                <p className="text-gray-700 mb-4">
                  <strong>Location:</strong> Filadelfia Christian Centre, Dar es Salaam, Tanzania
                </p>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="bg-gradient-to-r from-[#E31E24] to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-[#E31E24] transition-all transform hover:scale-105"
                >
                  Got It!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Leaders Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#FFD500] to-yellow-400 text-black px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Contact Ministry Leaders</h2>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-black hover:text-gray-700 p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center">
                Our ministry leaders are here to answer your questions and help you get connected.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {ministries.map((ministry) => (
                  <div key={ministry.id} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-[#E31E24]/20 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-br from-[#E31E24]/10 to-[#FFD500]/10 p-2 rounded-lg">
                        <ministry.icon className="h-6 w-6 text-[#E31E24]" />
                      </div>
                      <h3 className="font-bold text-gray-800">{ministry.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4 text-[#E31E24]" />
                        <span className="font-medium">{ministry.leader}</span>
                      </div>
                      <a
                        href={`mailto:${ministry.contact}`}
                        className="flex items-center gap-2 text-[#E31E24] hover:text-red-600 transition-colors group"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="group-hover:underline">{ministry.contact}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  General Church Office
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Phone:</strong> +255 123 456 789</p>
                  <p><strong>Email:</strong> info@filadelfiatz.org</p>
                  <p className="mt-3 text-gray-600 italic">For location details, please visit our contact page</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="bg-gradient-to-r from-[#E31E24] to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-[#E31E24] transition-all transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Form Modal */}
      {showVolunteerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#E31E24] to-red-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8" />
                <h2 className="text-2xl font-bold">General Volunteer Application</h2>
              </div>
              <button
                onClick={() => setShowVolunteerModal(false)}
                className="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for volunteering! We will contact you soon.');
                setShowVolunteerModal(false);
              }}
              className="p-6 space-y-6"
            >
              <div className="text-center mb-4">
                <p className="text-gray-600">
                  Thank you for your interest in serving! Please fill out this form and we'll help you find the perfect place to use your gifts.
                </p>
              </div>

              {/* Personal Information */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-5 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-[#E31E24]" />
                  Your Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name *"
                    required
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    required
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Ministry Interests */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-5 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-[#E31E24]" />
                  Ministry Interests
                </h3>
                <p className="text-sm text-gray-600 mb-3">Select all ministries you're interested in serving:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {ministries.map((ministry) => (
                    <label key={ministry.id} className="flex items-center gap-2 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#E31E24] bg-gray-100 border-gray-300 rounded focus:ring-[#E31E24] focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700">{ministry.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills & Availability */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-5 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-[#E31E24]" />
                  Your Skills & Availability
                </h3>
                <div className="space-y-4">
                  <textarea
                    placeholder="What skills, talents, or experiences can you bring to ministry? *"
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                  />
                  <textarea
                    placeholder="Tell us about your availability (days/times you're free to serve)"
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowVolunteerModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#E31E24] to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-[#E31E24] transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send size={20} />
                  Submit Application
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
                  <p className="text-white/90">{selectedJoinMinistry.tagline}</p>
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
                  <p><strong>Leader:</strong> {selectedJoinMinistry.leader}</p>
                  <p><strong>Contact:</strong> {selectedJoinMinistry.contact}</p>
                  <p><strong>Age Groups:</strong> {selectedJoinMinistry.ageGroups.join(', ')}</p>
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

      {/* Footer */}
      <Footer />

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
