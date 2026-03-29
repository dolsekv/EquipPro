import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "categories": "Categories",
        "about": "About",
        "contact": "Contact",
        "search": "Search equipment...",
        "cart": "Cart",
        "login": "Login",
        "account": "Account",
        "wishlist": "Wishlist"
      },
      "home": {
        "hero_title": "Professional Kitchen Equipment",
        "hero_subtitle": "Equipping the future of gastronomy with premium tools.",
        "shop_now": "Shop Now",
        "featured": "Featured Products",
        "categories": "Shop by Category"
      },
      "product": {
        "add_to_cart": "Add to Cart",
        "view_details": "View Details",
        "price": "Price",
        "stock": "In Stock",
        "out_of_stock": "Out of Stock",
        "reviews": "Reviews",
        "specs": "Specifications"
      },
      "cart": {
        "title": "Shopping Cart",
        "empty": "Your cart is empty",
        "checkout": "Proceed to Checkout",
        "total": "Total",
        "subtotal": "Subtotal"
      },
      "auth": {
        "login": "Login",
        "register": "Register",
        "logout": "Logout",
        "email": "Email",
        "password": "Password"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية",
        "categories": "الفئات",
        "about": "من نحن",
        "contact": "اتصل بنا",
        "search": "ابحث عن معدات...",
        "cart": "السلة",
        "login": "تسجيل الدخول",
        "account": "حسابي",
        "wishlist": "المفضلة"
      },
      "home": {
        "hero_title": "معدات مطابخ احترافية",
        "hero_subtitle": "تجهيز مستقبل فن الطهي بأدوات متميزة.",
        "shop_now": "تسوق الآن",
        "featured": "منتجات مميزة",
        "categories": "تسوق حسب الفئة"
      },
      "product": {
        "add_to_cart": "أضف إلى السلة",
        "view_details": "عرض التفاصيل",
        "price": "السعر",
        "stock": "متوفر",
        "out_of_stock": "غير متوفر",
        "reviews": "مراجعات",
        "specs": "المواصفات"
      },
      "cart": {
        "title": "سلة التسوق",
        "empty": "سلتك فارغة",
        "checkout": "المتابعة للدفع",
        "total": "الإجمالي",
        "subtotal": "المجموع الفرعي"
      },
      "auth": {
        "login": "تسجيل الدخول",
        "register": "إنشاء حساب",
        "logout": "تسجيل الخروج",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
