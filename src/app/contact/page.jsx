"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
  Heart,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    requestType: "general",
    visitPlanning: false,
    prayerRequest: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      requestType: "general",
      visitPlanning: false,
      prayerRequest: false,
    });
  };

  const contactInfo = {
    address: "Goba-Tegeta A, Dar es Salaam, Tanzania",
    phone: "+255 123 456 789",
    email: "info@filadelfiatz.org",
    website: "www.filadelfiatz.org",
  };

  const serviceHours = [
    { day: "Sunday", time: "6:00 AM - 1:00 PM", service: "Sunday Services" },
    {
      day: "Monday - Friday",
      time: "9:00 AM - 5:00 PM",
      service: "Office Hours",
    },
    { day: "Wednesday", time: "4:00 PM - 6:00 PM", service: "Bible Study" },
    { day: "Friday", time: "4:00 PM - 6:00 PM", service: "Prayer Meeting" },
    { day: "Saturday", time: "2:00 PM - 5:00 PM", service: "Special Programs" },
  ];

  const staff = [
    {
      name: "Pastor Neema Mndasha",
      position: "Senior Pastor",
      email: "pastor.neema@filadelfiatz.org",
      phone: "+255 123 456 790",
      image: "/images/pastors/pastor-john.jpg",
    },
    {
      name: "Pastor Stanley Mndasha",
      position: "Associate Pastor",
      email: "pastor.stanley@filadelfiatz.org",
      phone: "+255 123 456 791",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Dora Ntimizi",
      position: "Church Administrator",
      email: "admin@filadelfiatz.org",
      phone: "+255 123 456 792",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
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
              <a
                href="/events"
                className="text-gray-700 hover:text-[#E31E24] transition-colors"
              >
                Events
              </a>
              <a href="/contact" className="text-[#E31E24] font-semibold">
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
            Get in Touch
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you're planning a visit, need
            prayer, or have questions about our church, we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-[#E31E24] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {contactInfo.address}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#FFD500] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">Main Office</p>
              <p className="text-[#E31E24] font-semibold">
                {contactInfo.phone}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#E31E24] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">General Inquiries</p>
              <p className="text-[#E31E24] font-semibold">
                {contactInfo.email}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#FFD500] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
              <p className="text-gray-600 text-sm">Mon - Fri</p>
              <p className="text-[#E31E24] font-semibold">9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send us a Message
                </h2>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">
                      Thank you! Your message has been sent successfully.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                        placeholder="+255 xxx xxx xxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What can we help you with?
                    </label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="visit">Planning a Visit</option>
                      <option value="ministry">Ministry Information</option>
                      <option value="prayer">Prayer Request</option>
                      <option value="pastoral">Pastoral Care</option>
                      <option value="volunteer">Volunteer Opportunities</option>
                      <option value="events">Event Information</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent resize-none"
                      placeholder="Please share your message, questions, or how we can help you..."
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="visitPlanning"
                        checked={formData.visitPlanning}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#E31E24] focus:ring-[#E31E24] border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        I'm planning to visit your church
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="prayerRequest"
                        checked={formData.prayerRequest}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#E31E24] focus:ring-[#E31E24] border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        This includes a prayer request
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E31E24] text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-[#E31E24]/20 to-[#FFD500]/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-[#E31E24] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Find Us Here
                    </h3>
                    <p className="text-gray-600 max-w-xs">
                      {contactInfo.address}
                    </p>
                    <a
                      href="https://www.google.com/maps?q=-6.737132755245019,39.12922699510519"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-[#E31E24] text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Hours */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Service Hours
                </h3>
                <div className="space-y-4">
                  {serviceHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {schedule.day}
                        </p>
                        <p className="text-sm text-gray-500">
                          {schedule.service}
                        </p>
                      </div>
                      <span className="text-[#E31E24] font-semibold">
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-[#E31E24] to-[#FFD500] text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">
                    Need Prayer or Support?
                  </h3>
                </div>
                <p className="mb-4 text-white/90">
                  If you're going through a difficult time and need immediate
                  prayer or pastoral care, please don't hesitate to reach out.
                </p>
                <button className="bg-white text-[#E31E24] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Emergency Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Connect with Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our pastoral staff and administrators are here to serve you. Feel
              free to reach out directly for specific needs or questions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#E31E24] font-medium mb-4">
                    {member.position}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-600 hover:text-[#E31E24] transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{member.phone}</span>
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-[#E31E24] text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Connect Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Stay Connected
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow us on social media for updates, inspirational content, and
            live streaming of our services.
          </p>

          <div className="flex justify-center gap-6 mb-8">
            <a
              href="#"
              className="bg-[#1877F2] text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="bg-[#1DA1F2] text-white p-4 rounded-full hover:bg-blue-500 transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="bg-[#E4405F] text-white p-4 rounded-full hover:bg-pink-600 transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="bg-[#FF0000] text-white p-4 rounded-full hover:bg-red-600 transition-colors"
            >
              <Youtube size={24} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Calendar className="h-12 w-12 text-[#E31E24] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Schedule a Visit</h3>
              <p className="text-gray-600 mb-4">
                Planning to visit? Let us know so we can prepare a warm welcome
                for you and your family.
              </p>
              <button className="bg-[#E31E24] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                Plan Your Visit
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MessageSquare className="h-12 w-12 text-[#FFD500] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Join Our Newsletter
              </h3>
              <p className="text-gray-600 mb-4">
                Get weekly updates, prayer requests, and announcements delivered
                to your inbox.
              </p>
              <button className="bg-[#FFD500] text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Subscribe Now
              </button>
            </div>
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
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>123 Church Street</p>
                <p>Dar es Salaam, Tanzania</p>
                <p>+255 123 456 789</p>
                <p>info@filadelfiatz.org</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Service Times</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Sunday: 6:00-8:00 AM & 9:00 AM-1:00 PM</p>
                <p>Wednesday: 4:00-6:00 PM (Bible Study)</p>
                <p>Friday: 4:00-6:00 PM (Prayer Meeting)</p>
                <p>Office: Mon-Fri 9AM-5PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Filadelfia Christian Centre. All rights reserved.</p>
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
          title="Chat with us on WhatsApp"
        >
          <MessageSquare size={28} className="group-hover:animate-pulse" />
          
          {/* Chat bubble with message */}
          <div className="absolute bottom-full right-0 mb-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="text-sm font-medium">Need help? Chat with us!</div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </div>
        </a>
      </div>

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
