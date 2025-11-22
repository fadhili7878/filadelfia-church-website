"use client";

import { useState } from "react";
import {
  Heart,
  DollarSign,
  Calendar,
  Users,
  Shield,
  CheckCircle,
  CreditCard,
  Smartphone,
  Building,
  Globe,
  ArrowRight,
  Gift,
  Target,
  TrendingUp,
} from "lucide-react";

export default function GivePage() {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [givingCategory, setGivingCategory] = useState("general");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const givingCategories = [
    {
      id: "general",
      name: "General Giving",
      description: "Support the overall ministry and operations of our church",
      icon: Heart,
      color: "#E31E24",
    },
    {
      id: "missions",
      name: "Missions & Outreach",
      description: "Support local and international missions work",
      icon: Globe,
      color: "#0066CC",
    },
    {
      id: "building",
      name: "Building Fund",
      description: "Help with church facility improvements and expansion",
      icon: Building,
      color: "#00AA44",
    },
    {
      id: "youth",
      name: "Youth Ministry",
      description: "Support programs and activities for young people",
      icon: Users,
      color: "#FFD500",
    },
    {
      id: "special",
      name: "Special Projects",
      description: "One-time projects and community initiatives",
      icon: Target,
      color: "#9933CC",
    },
  ];

  const impactStats = [
    {
      amount: "$25",
      impact: "Provides Sunday school materials for 5 children for one month",
      icon: Heart,
    },
    {
      amount: "$50",
      impact: "Supports a family in need with food and essentials",
      icon: Gift,
    },
    {
      amount: "$100",
      impact: "Sponsors a youth camp scholarship for one teen",
      icon: Users,
    },
    {
      amount: "$250",
      impact: "Supports a local missionary for one month",
      icon: Globe,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mwamba",
      quote:
        "Giving has become a joy in our family. We love seeing how our contributions help our community grow in faith.",
      role: "Church Member since 2018",
    },
    {
      name: "Joseph Kileo",
      quote:
        "When we give, we are participating in Gods work. The impact we see in lives changed motivates us to give generously.",
      role: "Ministry Leader",
    },
    {
      name: "Grace Mushi",
      quote:
        "Through regular giving, our family has learned the joy of generosity and witnessed Gods faithful provision.",
      role: "Volunteer Coordinator",
    },
  ];

  const handleAmountClick = (selectedAmount) => {
    setAmount(selectedAmount.toString());
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount("");
  };

  const handleDonorInfoChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;
    console.log("Donation submitted:", {
      type: donationType,
      amount: finalAmount,
      category: givingCategory,
      method: paymentMethod,
      donor: donorInfo,
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const getCurrentCategory = () => {
    return givingCategories.find((cat) => cat.id === givingCategory);
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
                className="bg-[#E31E24] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-semibold"
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
            Give Generously
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Your generosity enables us to spread God's love, support our
            community, and impact lives for Christ. Join us in making a
            difference through faithful giving.
          </p>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 inline-block border border-white/20">
            <p className="text-white text-lg italic mb-2 drop-shadow-lg">
              "Each of you should give what you have decided in your heart to
              give, not reluctantly or under compulsion, for God loves a
              cheerful giver."
            </p>
            <p className="text-[#FFD500] font-semibold drop-shadow-lg">- 2 Corinthians 9:7</p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how your generous giving makes a real difference in our
              community and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 text-center"
                >
                  <div className="bg-[#E31E24] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#E31E24] mb-2">
                    {stat.amount}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.impact}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Giving Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Giving Form */}
            <div>
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Make a Donation
                </h2>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">
                      Thank you for your generous donation! Blessings to you.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Donation Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDonationType("one-time")}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          donationType === "one-time"
                            ? "border-[#E31E24] bg-[#E31E24]/5 text-[#E31E24]"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <Gift className="h-6 w-6 mx-auto mb-2" />
                        <span className="font-semibold">One-Time</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("recurring")}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          donationType === "recurring"
                            ? "border-[#E31E24] bg-[#E31E24]/5 text-[#E31E24]"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <Calendar className="h-6 w-6 mx-auto mb-2" />
                        <span className="font-semibold">Monthly</span>
                      </button>
                    </div>
                  </div>

                  {/* Giving Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Giving Category
                    </label>
                    <select
                      value={givingCategory}
                      onChange={(e) => setGivingCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                    >
                      {givingCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-2">
                      {getCurrentCategory()?.description}
                    </p>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((preAmount) => (
                        <button
                          key={preAmount}
                          type="button"
                          onClick={() => handleAmountClick(preAmount)}
                          className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                            amount === preAmount.toString()
                              ? "border-[#E31E24] bg-[#E31E24] text-white"
                              : "border-gray-300 hover:border-[#E31E24] hover:text-[#E31E24]"
                          }`}
                        >
                          ${preAmount}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          paymentMethod === "card"
                            ? "border-[#E31E24] bg-[#E31E24]/5 text-[#E31E24]"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <CreditCard className="h-5 w-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("mpesa")}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          paymentMethod === "mpesa"
                            ? "border-[#E31E24] bg-[#E31E24]/5 text-[#E31E24]"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <Smartphone className="h-5 w-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">M-Pesa</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bank")}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          paymentMethod === "bank"
                            ? "border-[#E31E24] bg-[#E31E24]/5 text-[#E31E24]"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <Building className="h-5 w-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">Bank</span>
                      </button>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Donor Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={donorInfo.firstName}
                        onChange={handleDonorInfoChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={donorInfo.lastName}
                        onChange={handleDonorInfoChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={donorInfo.email}
                      onChange={handleDonorInfoChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={donorInfo.phone}
                      onChange={handleDonorInfoChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                    />
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        Secure & Safe
                      </p>
                      <p className="text-sm text-blue-700">
                        Your donation is processed securely through encrypted
                        payment systems.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!amount && !customAmount}
                    className="w-full bg-[#E31E24] text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart size={20} />
                    Give ${customAmount || amount || "0"}{" "}
                    {donationType === "recurring" ? "Monthly" : "Now"}
                  </button>
                </form>
              </div>
            </div>

            {/* Information Sidebar */}
            <div className="space-y-8">
              {/* Ways to Give */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Other Ways to Give
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#E31E24] text-white p-2 rounded-lg">
                      <Building size={16} />
                    </div>
                    <div>
                      <p className="font-semibold">In Person</p>
                      <p className="text-sm text-gray-600">
                        During Sunday service or at our office
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#FFD500] text-black p-2 rounded-lg">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="font-semibold">Bank Transfer</p>
                      <p className="text-sm text-gray-600">
                        Direct bank transfer - contact us for details
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#E31E24] text-white p-2 rounded-lg">
                      <Smartphone size={16} />
                    </div>
                    <div>
                      <p className="font-semibold">Mobile Money</p>
                      <p className="text-sm text-gray-600">
                        M-Pesa, Tigo Pesa, Airtel Money
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Transparency */}
              <div className="bg-gradient-to-br from-[#E31E24]/5 to-[#FFD500]/5 rounded-lg p-6 border border-[#E31E24]/20">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Financial Transparency
                </h3>
                <p className="text-gray-600 mb-4">
                  We believe in being good stewards of your generous gifts.
                  Here's how your donations are used:
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ministry & Operations</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#E31E24] h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Community Outreach</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#FFD500] h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Missions</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#00AA44] h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Administration</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                </div>

                <button className="mt-4 text-[#E31E24] font-semibold hover:text-red-600 transition-colors flex items-center gap-1">
                  View Annual Report <ArrowRight size={16} />
                </button>
              </div>

              {/* Contact for Questions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Questions about Giving?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our finance team is here to help you with any questions about
                  donations, tax receipts, or planned giving.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> finance@filadelfiatz.org
                  </p>
                  <p>
                    <strong>Phone:</strong> +255 123 456 789
                  </p>
                  <p>
                    <strong>Office Hours:</strong> Mon-Fri 9AM-5PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Stories of Generosity
            </h2>
            <p className="text-gray-600">
              Hear from our church family about the joy of giving
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#E31E24] text-white w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#E31E24] to-[#FFD500]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of generous givers and see how God can use your
            gifts to impact lives and spread His love.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .querySelector("form")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-[#E31E24] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Heart size={20} />
              Give Now
            </button>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#E31E24] transition-colors inline-flex items-center justify-center gap-2"
            >
              <TrendingUp size={20} />
              Learn About Planned Giving
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
              <h4 className="font-semibold mb-4">Giving Options</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-400">Online Donations</span>
                </li>
                <li>
                  <span className="text-gray-400">Bank Transfer</span>
                </li>
                <li>
                  <span className="text-gray-400">Mobile Money</span>
                </li>
                <li>
                  <span className="text-gray-400">In-Person Giving</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>123 Church Street</p>
                <p>Dar es Salaam, Tanzania</p>
                <p>+255 123 456 789</p>
                <p>finance@filadelfiatz.org</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 Filadelfia Christian Centre. All rights reserved. |
              Tax-exempt organization
            </p>
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
