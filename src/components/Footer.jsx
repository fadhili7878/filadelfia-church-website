import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="https://ucarecdn.com/a249fb92-9b2c-4213-9811-b343543f6162/-/format/auto/"
                alt="TAG Logo"
                className="h-10 w-10"
              />
              <div>
                <h3 className="text-base font-bold">
                  Filadelfia Christian Centre
                </h3>
                <p className="text-xs text-gray-400">
                  Tanzania Assemblies of God
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              A community of faith, hope, and love in Jesus Christ.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-1.5 text-sm">
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
            <h4 className="font-semibold mb-3 text-sm">Contact Info</h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              <p>123 Church Street</p>
              <p>Dar es Salaam, Tanzania</p>
              <p>+255 123 456 789</p>
              <p>info@filadelfiatz.org</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
            <div className="flex gap-2">
              <a
                href="https://facebook.com/filadelfiatz"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com/filadelfiatz"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E4405F] text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/255123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="https://youtube.com/@filadelfiatz"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0000] text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                title="Subscribe to our YouTube channel"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Filadelfia Christian Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
