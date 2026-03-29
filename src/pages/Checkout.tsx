import React from "react";
import { useCart } from "../hooks/useCart";
import { useTranslation } from "react-i18next";
import { CreditCard, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const { total, clearCart } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === "ar";

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isRtl ? "تم تقديم الطلب بنجاح" : "Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2 rtl:space-x-reverse">
              <Truck className="w-5 h-5 text-orange-600" />
              <span>Shipping Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500" required />
              <input type="text" placeholder="Last Name" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500" required />
              <input type="email" placeholder="Email Address" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 md:col-span-2" required />
              <input type="text" placeholder="Street Address" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 md:col-span-2" required />
              <input type="text" placeholder="City" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500" required />
              <input type="text" placeholder="Country" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500" required />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2 rtl:space-x-reverse">
              <CreditCard className="w-5 h-5 text-orange-600" />
              <span>Payment Method</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 border-2 border-orange-600 bg-orange-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                  <span className="font-bold text-gray-900">Credit / Debit Card</span>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
              <input type="text" placeholder="Card Number" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500" required />
                <input type="text" placeholder="CVC" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500" required />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <span>Complete Order</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Checkout with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
