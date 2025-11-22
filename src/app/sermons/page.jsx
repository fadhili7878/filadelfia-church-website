"use client";

import { useState } from "react";
import {
  Play,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Download,
  Share2,
  ChevronRight,
  Tag,
} from "lucide-react";

export default function SermonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState("all");

  const sermonSeries = [
    { id: "all", name: "All Series" },
    { id: "walking-in-faith", name: "Walking in Faith" },
    { id: "power-of-prayer", name: "The Power of Prayer" },
    { id: "gods-love", name: "God's Unfailing Love" },
    { id: "victory-in-christ", name: "Victory in Christ" },
    { id: "holy-spirit", name: "Life in the Spirit" },
  ];

  const speakers = [
    { id: "all", name: "All Speakers" },
    { id: "john-mwakasege", name: "Pastor John Mwakasege" },
    { id: "mary-kileo", name: "Pastor Mary Kileo" },
    { id: "david-moshi", name: "Pastor David Moshi" },
    { id: "grace-mbwana", name: "Elder Grace Mbwana" },
  ];

  const sermons = [
    {
      id: 1,
      title: "Walking in Faith Through Trials",
      speaker: "Pastor John Mwakasege",
      speakerId: "john-mwakasege",
      date: "November 3, 2025",
      duration: "45 min",
      series: "Walking in Faith",
      seriesId: "walking-in-faith",
      thumbnail:
        "https://images.unsplash.com/photo-1507692132682-ec2f18f1e37e?w=800&h=450&fit=crop",
      description:
        "Learn how to maintain your faith even in the midst of life's greatest challenges. Pastor John shares practical wisdom from the scriptures.",
      tags: ["Faith", "Trials", "Perseverance"],
      views: 1205,
      likes: 87,
    },
    {
      id: 2,
      title: "The Power of Persistent Prayer",
      speaker: "Pastor Mary Kileo",
      speakerId: "mary-kileo",
      date: "October 27, 2025",
      duration: "38 min",
      series: "The Power of Prayer",
      seriesId: "power-of-prayer",
      thumbnail:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=450&fit=crop",
      description:
        "Discover the transformative power of prayer that never gives up. Pastor Mary teaches on persistence in prayer through biblical examples.",
      tags: ["Prayer", "Persistence", "Faith"],
      views: 892,
      likes: 64,
    },
    {
      id: 3,
      title: "God's Unfailing Love for His Children",
      speaker: "Pastor John Mwakasege",
      speakerId: "john-mwakasege",
      date: "October 20, 2025",
      duration: "42 min",
      series: "God's Unfailing Love",
      seriesId: "gods-love",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
      description:
        "A powerful message about the depth and consistency of God's love for every believer, regardless of circumstances.",
      tags: ["Love", "Grace", "Identity"],
      views: 1456,
      likes: 112,
    },
    {
      id: 4,
      title: "Victory Through Christ",
      speaker: "Pastor David Moshi",
      speakerId: "david-moshi",
      date: "October 13, 2025",
      duration: "36 min",
      series: "Victory in Christ",
      seriesId: "victory-in-christ",
      thumbnail:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=450&fit=crop",
      description:
        "Understanding what it means to live victoriously in Christ and how to overcome life's obstacles through His strength.",
      tags: ["Victory", "Strength", "Overcoming"],
      views: 743,
      likes: 58,
    },
    {
      id: 5,
      title: "Living in the Spirit's Power",
      speaker: "Pastor Mary Kileo",
      speakerId: "mary-kileo",
      date: "October 6, 2025",
      duration: "40 min",
      series: "Life in the Spirit",
      seriesId: "holy-spirit",
      thumbnail:
        "https://images.unsplash.com/photo-1494790108755-2616b612b547?w=800&h=450&fit=crop",
      description:
        "A deep dive into what it means to be led by the Holy Spirit in daily life and ministry.",
      tags: ["Holy Spirit", "Power", "Guidance"],
      views: 967,
      likes: 73,
    },
    {
      id: 6,
      title: "Teaching Children About Jesus",
      speaker: "Elder Grace Mbwana",
      speakerId: "grace-mbwana",
      date: "September 29, 2025",
      duration: "32 min",
      series: "Walking in Faith",
      seriesId: "walking-in-faith",
      thumbnail:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=450&fit=crop",
      description:
        "Practical guidance for parents and teachers on how to effectively share the Gospel with children in age-appropriate ways.",
      tags: ["Children", "Teaching", "Evangelism"],
      views: 624,
      likes: 45,
    },
    {
      id: 7,
      title: "Prayer That Moves Mountains",
      speaker: "Pastor John Mwakasege",
      speakerId: "john-mwakasege",
      date: "September 22, 2025",
      duration: "47 min",
      series: "The Power of Prayer",
      seriesId: "power-of-prayer",
      thumbnail:
        "https://images.unsplash.com/photo-1507692132682-ec2f18f1e37e?w=800&h=450&fit=crop",
      description:
        "Jesus taught us about faith-filled prayer that can literally move mountains. Learn the principles of effective prayer.",
      tags: ["Prayer", "Faith", "Miracles"],
      views: 1334,
      likes: 94,
    },
    {
      id: 8,
      title: "God's Love in Action",
      speaker: "Pastor Mary Kileo",
      speakerId: "mary-kileo",
      date: "September 15, 2025",
      duration: "39 min",
      series: "God's Unfailing Love",
      seriesId: "gods-love",
      thumbnail:
        "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=450&fit=crop",
      description:
        "How God's love is demonstrated not just in words but in actions throughout scripture and in our lives today.",
      tags: ["Love", "Action", "Service"],
      views: 856,
      likes: 67,
    },
  ];

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.series.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries =
      selectedSeries === "all" || sermon.seriesId === selectedSeries;
    const matchesSpeaker =
      selectedSpeaker === "all" || sermon.speakerId === selectedSpeaker;

    return matchesSearch && matchesSeries && matchesSpeaker;
  });

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
              <a
                href="/ministries"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                Ministries
              </a>
              <a href="/sermons" className="text-[#E31E24] font-semibold">
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
            Sermons & Messages
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Access our library of inspiring messages and teachings. Grow in your
            faith through God's Word as shared by our pastors and ministry
            leaders.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search sermons, speakers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31E24] focus:border-transparent appearance-none"
              >
                {sermonSeries.map((series) => (
                  <option key={series.id} value={series.id}>
                    {series.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31E24] focus:border-transparent appearance-none"
              >
                {speakers.map((speaker) => (
                  <option key={speaker.id} value={speaker.id}>
                    {speaker.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Showing {filteredSermons.length} of {sermons.length} sermons
            </p>
          </div>
        </div>
      </section>

      {/* Featured Sermon */}
      {filteredSermons.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Featured Message
              </h2>
              <p className="text-gray-600">Our most recent sermon</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <img
                  src={filteredSermons[0].thumbnail}
                  alt={filteredSermons[0].title}
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-20 w-20 text-white" />
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {filteredSermons[0].duration}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-[#E31E24]" />
                  <span className="text-[#E31E24] font-semibold text-sm">
                    {filteredSermons[0].series}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {filteredSermons[0].title}
                </h3>

                <div className="flex items-center gap-6 mb-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{filteredSermons[0].speaker}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{filteredSermons[0].date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{filteredSermons[0].duration}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {filteredSermons[0].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {filteredSermons[0].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="bg-[#E31E24] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2">
                    <Play size={20} />
                    Watch Now
                  </button>
                  <button className="border-2 border-[#E31E24] text-[#E31E24] px-6 py-3 rounded-lg font-semibold hover:bg-[#E31E24] hover:text-white transition-colors flex items-center gap-2">
                    <Download size={20} />
                    Download
                  </button>
                  <button className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sermon Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              All Messages
            </h2>
            <p className="text-gray-600">
              Browse our complete library of sermons and teachings
            </p>
          </div>

          {filteredSermons.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No sermons found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.slice(1).map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute top-4 left-4 bg-[#E31E24] text-white px-2 py-1 rounded text-xs font-semibold">
                      {sermon.series}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {sermon.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {sermon.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{sermon.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {sermon.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Play className="h-4 w-4 text-[#E31E24]" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      <div className="text-xs text-gray-500">
                        {sermon.views.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sermon Series Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sermon Series
            </h2>
            <p className="text-gray-600">
              Explore our ongoing and completed sermon series
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermonSeries.slice(1).map((series) => {
              const seriesSermons = sermons.filter(
                (s) => s.seriesId === series.id,
              );
              const latestSermon = seriesSermons[0];

              return (
                <div
                  key={series.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        latestSermon?.thumbnail ||
                        "https://images.unsplash.com/photo-1507692132682-ec2f18f1e37e?w=800&h=300&fit=crop"
                      }
                      alt={series.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-semibold text-lg">
                        {series.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {seriesSermons.length} messages
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Latest: {latestSermon?.title || "Coming Soon"}
                    </p>
                    <button
                      onClick={() => setSelectedSeries(series.id)}
                      className="w-full bg-[#E31E24] text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      View Series <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#E31E24] to-[#FFD500]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Never Miss a Message
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to get notifications when new sermons are available
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-[#E31E24] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
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
              <h4 className="font-semibold mb-4">Recent Series</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setSelectedSeries("walking-in-faith")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Walking in Faith
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedSeries("power-of-prayer")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Power of Prayer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedSeries("gods-love")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    God's Love
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedSeries("victory-in-christ")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Victory in Christ
                  </button>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
