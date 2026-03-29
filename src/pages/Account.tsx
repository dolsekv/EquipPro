import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Package, Heart, Settings, LogOut, Mail, Lock } from "lucide-react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { toast } from "sonner";

const Account: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(auth.currentUser);
  const isRtl = i18n.language === "ar";

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success(isRtl ? "تم تسجيل الدخول بنجاح" : "Logged in successfully!");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    toast.info("Logged out");
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{t("auth.login")}</h1>
          <p className="text-gray-500">Access your professional dashboard</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">{t("auth.email")}</label>
              <div className="relative">
                <input type="email" className="w-full bg-gray-50 border-none rounded-xl px-11 py-3 text-sm focus:ring-2 focus:ring-orange-500" />
                <Mail className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">{t("auth.password")}</label>
              <div className="relative">
                <input type="password" title="password" className="w-full bg-gray-50 border-none rounded-xl px-11 py-3 text-sm focus:ring-2 focus:ring-orange-500" />
                <Lock className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
          <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all">
            {t("auth.login")}
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            <span>Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-4">
          <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto flex items-center justify-center text-orange-600 overflow-hidden">
            {user.photoURL ? <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-10 h-10" />}
          </div>
          <div>
            <h2 className="font-bold text-gray-900">{user.displayName || "Professional User"}</h2>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse text-red-500 font-bold text-sm py-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t("auth.logout")}</span>
          </button>
        </div>

        <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {[
            { icon: Package, label: "My Orders" },
            { icon: Heart, label: "Wishlist" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center space-x-3 rtl:space-x-reverse px-6 py-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition-colors border-b border-gray-50 last:border-none">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="lg:col-span-3 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Active Orders", value: "0" },
            { label: "Wishlist Items", value: "12" },
            { label: "Reward Points", value: "450" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <div className="text-center py-12 text-gray-400 text-sm">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>You haven't placed any orders yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
