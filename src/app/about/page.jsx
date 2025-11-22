"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  BookOpen,
  Flame,
  Award,
  Globe,
  Target,
  Eye,
  ChevronRight,
  Calendar,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { imageStorage } from '@/lib/storage';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("history");
  const [seniorPastorImage, setSeniorPastorImage] = useState("/images/pastors/pastor-john.jpg"); // Fallback

  const leadership = [
    {
      name: "Pastor Neema Mndasha",
      position: "Senior Pastor",
      image: seniorPastorImage,
      bio: "Pastor Neema has been serving Filadelfia Christian Centre with dedication and passion. His heart for teaching and community outreach has helped grow our congregation into a vibrant family of believers.",
      experience: "15+ years",
      education: "Master of Divinity, Pentecostal Bible College",
    },
    {
      name: "Pastor Stanley Mndasha",
      position: "Associate Pastor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Pastor Stanley serves as associate pastor with a heart for discipleship and prayer. His dedication and spiritual leadership have impacted countless lives in our community.",
      experience: "12+ years",
      education: "Bachelor of Theology, East Africa School of Theology",
    },
  ];

  // Load senior pastor image from Supabase Storage
  useEffect(() => {
    const loadSeniorPastorImage = async () => {
      try {
        const result = await imageStorage.listImages('church', '');
        if (result.success && result.images.length > 0) {
          // Look for pastor1 image
          const pastor1Img = result.images.find(img => 
            img.name.toLowerCase().includes('pastor1')
          );
          if (pastor1Img) {
            setSeniorPastorImage(pastor1Img.url);
          }
        }
      } catch (error) {
        console.log('Using fallback senior pastor image:', error);
        // Keep the fallback image
      }
    };

    loadSeniorPastorImage();
  }, []);

  const values = [
    {
      icon: BookOpen,
      title: "Biblical Foundation",
      description:
        "We believe in the authority and truth of God's Word as our foundation for faith and practice.",
    },
    {
      icon: Heart,
      title: "Love & Compassion",
      description:
        "We strive to show Christ's love to everyone, creating a welcoming environment for all people.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We believe in the power of fellowship and building strong relationships within the body of Christ.",
    },
    {
      icon: Flame,
      title: "Spirit-Led Ministry",
      description:
        "We depend on the Holy Spirit's guidance in all our worship, teaching, and ministry activities.",
    },
    {
      icon: Globe,
      title: "Global Vision",
      description:
        "We are committed to spreading the Gospel locally in Tanzania and supporting missions worldwide.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We pursue excellence in all we do, giving our best effort to honor God in every aspect of ministry.",
    },
  ];

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
              <a href="/about" className="text-[#E31E24] font-semibold">
                About
              </a>
              <a
                href="/ministries"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
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
            About Our Church
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Learn about our history, mission, and the people who make Filadelfia
            Christian Centre a vibrant community of faith in Tanzania.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#E31E24]/5 to-[#FFD500]/5 p-8 rounded-lg border-l-4 border-[#E31E24]">
              <Target className="h-12 w-12 text-[#E31E24] mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To worship God, make disciples of Jesus Christ, and serve our
                community and the world with the love and power of the Holy
                Spirit. We exist to see lives transformed through the Gospel and
                to build a strong foundation of faith in Tanzania.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFD500]/5 to-[#E31E24]/5 p-8 rounded-lg border-l-4 border-[#FFD500]">
              <Eye className="h-12 w-12 text-[#FFD500] mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To be a thriving, Spirit-filled church that impacts Tanzania and
                beyond with the Gospel of Jesus Christ. We envision communities
                transformed, families restored, and a generation equipped to
                serve God with passion and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center mb-12 border-b">
            {[
              { id: "history", label: "Our History" },
              { id: "beliefs", label: "Statement of Faith" },
              { id: "tag", label: "TAG Affiliation" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-[#E31E24] border-b-2 border-[#E31E24]"
                    : "text-gray-600 hover:text-[#E31E24]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "history" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&h=400&fit=crop"
                  alt="Church History"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Our Story
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Filadelfia Christian Centre was founded in 2008 with a
                    vision to create a welcoming space where people could
                    encounter God's love and grow in their faith.
                  </p>
                  <p>
                    What started as a small group of believers meeting in a
                    rented hall has grown into a thriving congregation of over
                    500 members, impacting our community through various
                    ministries and outreach programs.
                  </p>
                  <p>
                    Throughout our journey, we have remained committed to our
                    core values of biblical teaching, Spirit-led worship, and
                    compassionate service to others.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "beliefs" && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                What We Believe
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "The Bible",
                    content:
                      "We believe the Bible is the inspired, infallible Word of God and our ultimate authority for faith and practice.",
                  },
                  {
                    title: "The Trinity",
                    content:
                      "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.",
                  },
                  {
                    title: "Salvation",
                    content:
                      "We believe salvation comes through faith in Jesus Christ alone, by grace alone, not by works.",
                  },
                  {
                    title: "Baptism",
                    content:
                      "We believe in baptism by immersion as a public declaration of faith in Jesus Christ.",
                  },
                  {
                    title: "Holy Spirit",
                    content:
                      "We believe in the gifts of the Holy Spirit and their operation in the church today.",
                  },
                  {
                    title: "Second Coming",
                    content:
                      "We believe in the personal return of Jesus Christ and the resurrection of the dead.",
                  },
                ].map((belief, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow">
                    <h4 className="text-lg font-semibold text-[#E31E24] mb-3">
                      {belief.title}
                    </h4>
                    <p className="text-gray-600">{belief.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tag" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Tanzania Assemblies of God
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Filadelfia Christian Centre is proudly affiliated with the
                    Tanzania Assemblies of God (TAG), a fellowship of
                    Spirit-filled churches committed to spreading the Gospel
                    throughout Tanzania.
                  </p>
                  <p>
                    TAG was established to provide accountability, support, and
                    fellowship among Pentecostal churches in Tanzania. Through
                    this partnership, we receive theological training, ministry
                    resources, and opportunities for collaborative ministry.
                  </p>
                  <p>
                    This affiliation connects us with hundreds of other churches
                    across Tanzania, enabling us to participate in nationwide
                    evangelism, church planting, and humanitarian efforts.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <img
                  src="https://ucarecdn.com/a249fb92-9b2c-4213-9811-b343543f6162/-/format/auto/"
                  alt="TAG Logo"
                  className="h-48 w-48 mx-auto mb-6"
                />
                <p className="text-sm text-gray-500">
                  Official Member of Tanzania Assemblies of God
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do as a church community and
              shape our approach to ministry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <IconComponent className="h-12 w-12 text-[#E31E24] mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated pastors and leaders are committed to serving God and
              shepherding our congregation with wisdom and love.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-48 md:flex-shrink-0">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        // Fallback to static image if Supabase image fails
                        if (leader.position === "Senior Pastor") {
                          e.target.src = "/images/pastors/pastor-john.jpg";
                        }
                      }}
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-[#E31E24] font-medium mb-3">
                      {leader.position}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {leader.bio}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {leader.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {leader.education}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-r from-[#E31E24] to-[#FFD500]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-xl text-white/90 mb-8">
            Have questions about our church or want to learn more? We'd love to
            connect with you.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-white">
              <MapPin size={20} />
              <span>123 Church Street, Dar es Salaam</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <Phone size={20} />
              <span>+255 123 456 789</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <Mail size={20} />
              <span>info@filadelfiatz.org</span>
            </div>
          </div>
          <a
            href="/contact"
            className="bg-white text-[#E31E24] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Contact Us <ChevronRight size={20} />
          </a>
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
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/ministries"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Ministries
                  </a>
                </li>
                <li>
                  <a
                    href="/sermons"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sermons
                  </a>
                </li>
                <li>
                  <a
                    href="/events"
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
                    href="/ministries"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Children's Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="/ministries"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Youth Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="/ministries"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Women's Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="/ministries"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Men's Ministry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>123 Church Street</p>
                <p>Dar es Salaam, Tanzania</p>
                <p>+255 123 456 789</p>
                <p>info@filadelfiatz.org</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Filadelfia Christian Centre. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
