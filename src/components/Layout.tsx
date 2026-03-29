import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, ShoppingCart, User, Heart, Menu, Globe, X } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { motion, AnimatePresence } from "motion/react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { cart } = useCart();
  const location = useLocation();
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isRtl, i18n.language]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className={`min-h-screen bg-gray-50 font-sans ${isRtl ? "font-arabic" : ""}`}>
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">EquipPro</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t("nav.search")}
                  className="w-full bg-gray-100 border-none rounded-full py-2.5 px-11 focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                />
                <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors text-sm font-medium"
              >
                <Globe className="w-5 h-5" />
                <span>{i18n.language === "en" ? "العربية" : "English"}</span>
              </button>

              <Link to="/wishlist" className="text-gray-600 hover:text-orange-600 transition-colors relative">
                <Heart className="w-6 h-6" />
              </Link>

              <Link to="/cart" className="text-gray-600 hover:text-orange-600 transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              <Link to="/account" className="text-gray-600 hover:text-orange-600 transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu / Categories */}
        <nav className="bg-white border-t border-gray-100 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 rtl:space-x-reverse h-12 text-sm font-medium text-gray-600">
              <Link to="/category/cooking" className="hover:text-orange-600 transition-colors">Cooking Equipment</Link>
              <Link to="/category/refrigeration" className="hover:text-orange-600 transition-colors">Refrigeration</Link>
              <Link to="/category/coffee" className="hover:text-orange-600 transition-colors">Coffee & Beverage</Link>
              <Link to="/category/bakery" className="hover:text-orange-600 transition-colors">Bakery</Link>
              <Link to="/category/furniture" className="hover:text-orange-600 transition-colors">Kitchen Furniture</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="text-xl font-bold tracking-tight">EquipPro</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium B2B marketplace for professional kitchen and restaurant equipment.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-gray-800 border-none rounded-l-lg rtl:rounded-l-none rtl:rounded-r-lg px-4 py-2 w-full text-sm focus:ring-1 focus:ring-orange-500"
                />
                <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg transition-colors text-sm font-bold">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-xs">
            © 2026 EquipPro Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
