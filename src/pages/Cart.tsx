import React from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Cart: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const isRtl = i18n.language === "ar";

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t("cart.empty")}</h2>
        <Link
          to="/"
          className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
        >
          {t("home.shop_now")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("cart.title")}</h1>
        <div className="space-y-4">
          {cart.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-6 rtl:space-x-reverse bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <img
                src={item.image}
                alt={isRtl ? item.nameAr : item.name}
                className="w-24 h-24 object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-gray-900">{isRtl ? item.nameAr : item.name}</h3>
                <p className="text-orange-600 font-bold">${item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>{t("cart.subtotal")}</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-gray-900">
              <span>{t("cart.total")}</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <span>{t("cart.checkout")}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
