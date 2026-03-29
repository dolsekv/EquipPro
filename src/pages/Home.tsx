import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight, ChevronLeft, Zap, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { motion } from "motion/react";

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden bg-gray-900 flex items-center">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://picsum.photos/seed/kitchen-hero/1920/1080"
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-2xl px-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs">
              Premium B2B Marketplace
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mt-4">
              {t("home.hero_title")}
            </h1>
            <p className="text-gray-300 text-lg max-w-md mt-4">
              {t("home.hero_subtitle")}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-8">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center space-x-2 rtl:space-x-reverse">
                <span>{t("home.shop_now")}</span>
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold transition-all">
                View Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Truck, title: "Fast Delivery", sub: "Global shipping in 3-5 days" },
          { icon: ShieldCheck, title: "Secure Payment", sub: "100% encrypted transactions" },
          { icon: Zap, title: "Expert Support", sub: "24/7 technical assistance" }
        ].map((item, i) => (
          <div key={i} className="flex items-center space-x-4 rtl:space-x-reverse p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{item.title}</h4>
              <p className="text-gray-500 text-xs">{item.sub}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">{t("home.featured")}</h2>
          <button className="text-orange-600 font-bold text-sm flex items-center space-x-1 rtl:space-x-reverse hover:underline">
            <span>View All</span>
            {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">{t("home.categories")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Cooking", nameAr: "الطبخ", img: "cooking" },
            { name: "Refrigeration", nameAr: "التبريد", img: "fridge" },
            { name: "Coffee", nameAr: "القهوة", img: "coffee" },
            { name: "Bakery", nameAr: "المخبوزات", img: "bakery" }
          ].map((cat, i) => (
            <Link
              key={i}
              to={`/category/${cat.name.toLowerCase()}`}
              className="group relative h-48 rounded-2xl overflow-hidden"
            >
              <img
                src={`https://picsum.photos/seed/${cat.img}/600/400`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl">
                  {isRtl ? cat.nameAr : cat.name}
                </h3>
                <span className="text-orange-400 text-xs font-bold flex items-center space-x-1 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
