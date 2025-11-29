"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Share2,
  Bell,
  Filter,
} from "lucide-react";

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 8)); // November 8, 2025
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("upcoming"); // 'upcoming', 'calendar', 'past'
  const [categoryFilter, setCategoryFilter] = useState("all");

  const eventCategories = [
    { id: "all", name: "All Events", color: "#6B6B6B" },
    { id: "worship", name: "Worship Services", color: "#E31E24" },
    { id: "fellowship", name: "Fellowship", color: "#FFD500" },
    { id: "ministry", name: "Ministry Events", color: "#00AA44" },
    { id: "outreach", name: "Outreach", color: "#0066CC" },
    { id: "special", name: "Special Events", color: "#9933CC" },
  ];

  const events = [
    {
      id: 1,
      title: "Pastor's Day Celebration",
      description:
        "Join us for a special day of thanksgiving and appreciation for our beloved pastors who have faithfully shepherded our souls. We celebrate their dedication, love, and unwavering commitment to serving God and our church family. Come and honor those who have poured their hearts into ministry and blessed our lives with their faithful service.",
      date: "2025-12-07",
      time: "09:00",
      endTime: "15:00",
      location: "Main Sanctuary",
      address: "123 Church Street, Dar es Salaam",
      category: "special",
      recurring: "annual",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      organizer: "Church Board",
      featured: true,
      tags: ["Pastors", "Appreciation", "Thanksgiving", "Celebration"],
    },
  ];

  const getFilteredEvents = () => {
    const now = new Date();
    let filtered = events;

    if (categoryFilter !== "all") {
      filtered = filtered.filter((event) => event.category === categoryFilter);
    }

    if (viewMode === "upcoming") {
      filtered = filtered.filter((event) => new Date(event.date) >= now);
    } else if (viewMode === "past") {
      filtered = filtered.filter((event) => new Date(event.date) < now);
    }

    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const featuredEvents = events.filter(
    (event) => event.featured && new Date(event.date) >= new Date(),
  );

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
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
              <a href="/events" className="text-[#E31E24] font-semibold">
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
            Church Events
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join us for worship, fellowship, and community events. Stay
            connected with what's happening in our church family.
          </p>
        </div>
      </section>

      {/* View Mode & Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("upcoming")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === "upcoming"
                    ? "bg-[#E31E24] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === "calendar"
                    ? "bg-[#E31E24] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setViewMode("past")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === "past"
                    ? "bg-[#E31E24] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Past Events
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
              >
                {eventCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {viewMode === "upcoming" && featuredEvents.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Featured Events
              </h2>
              <p className="text-gray-600">
                Don't miss these special upcoming events
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#E31E24] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star size={14} />
                        Featured
                      </span>
                    </div>

                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>
                          {formatTime(event.time)} - {formatTime(event.endTime)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex-1 bg-[#E31E24] text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        View Details
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart size={18} className="text-gray-600" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-3 text-center text-gray-500 font-medium"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: getFirstDayOfMonth(currentDate) }).map(
                  (_, index) => (
                    <div key={index} className="h-20 bg-gray-50 rounded"></div>
                  ),
                )}

                {Array.from({ length: getDaysInMonth(currentDate) }).map(
                  (_, index) => {
                    const day = index + 1;
                    const dayEvents = getEventsForDate(day);
                    const isToday =
                      new Date().toDateString() ===
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day,
                      ).toDateString();

                    return (
                      <div
                        key={day}
                        className={`h-20 p-1 border rounded cursor-pointer hover:bg-gray-50 transition-colors ${
                          isToday
                            ? "bg-[#E31E24]/10 border-[#E31E24]"
                            : "border-gray-200"
                        }`}
                      >
                        <div
                          className={`text-sm font-medium ${isToday ? "text-[#E31E24]" : "text-gray-800"}`}
                        >
                          {day}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayEvents.slice(0, 2).map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className="text-xs bg-[#E31E24] text-white px-1 rounded truncate"
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events List */}
      {(viewMode === "upcoming" || viewMode === "past") && (
        <section
          className={`py-16 ${viewMode === "upcoming" ? "bg-gray-50" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {viewMode === "upcoming"
                  ? "All Upcoming Events"
                  : "Past Events"}
              </h2>
              <p className="text-gray-600">
                {getFilteredEvents().length} events found
              </p>
            </div>

            <div className="space-y-6">
              {getFilteredEvents().map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="md:flex">
                    <div className="md:w-64 md:flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: eventCategories.find(
                                  (c) => c.id === event.category,
                                )?.color,
                              }}
                            ></span>
                            <span className="text-sm font-medium text-gray-600">
                              {
                                eventCategories.find(
                                  (c) => c.id === event.category,
                                )?.name
                              }
                            </span>
                            {event.featured && (
                              <span className="bg-[#FFD500] text-black px-2 py-1 rounded text-xs font-semibold">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {event.title}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell size={18} className="text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Share2 size={18} className="text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>
                            {formatTime(event.time)} -{" "}
                            {formatTime(event.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Organizer: {event.organizer}</span>
                        </div>

                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="bg-[#E31E24] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: eventCategories.find(
                      (c) => c.id === selectedEvent.category,
                    )?.color,
                  }}
                ></span>
                <span className="text-sm font-medium text-gray-600">
                  {
                    eventCategories.find((c) => c.id === selectedEvent.category)
                      ?.name
                  }
                </span>
                {selectedEvent.featured && (
                  <span className="bg-[#FFD500] text-black px-2 py-1 rounded text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedEvent.title}
              </h2>

              <div className="space-y-3 mb-6 text-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} />
                  <span>
                    {formatTime(selectedEvent.time)} -{" "}
                    {formatTime(selectedEvent.endTime)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <div>
                    <div>{selectedEvent.location}</div>
                    <div className="text-sm text-gray-500">
                      {selectedEvent.address}
                    </div>
                  </div>
                </div>

              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedEvent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#E31E24] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                  Register for Event
                </button>
                <button className="px-6 py-3 border-2 border-[#E31E24] text-[#E31E24] rounded-lg font-semibold hover:bg-[#E31E24] hover:text-white transition-colors">
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-[#E31E24] to-[#FFD500]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stay Updated on Church Events
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get notifications about upcoming events and never miss what's
            happening in our community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-[#E31E24] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Bell size={18} />
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
              <h4 className="font-semibold mb-4">Upcoming Events</h4>
              <ul className="space-y-2 text-sm">
                {featuredEvents.slice(0, 4).map((event) => (
                  <li key={event.id}>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {event.title}
                    </button>
                  </li>
                ))}
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
