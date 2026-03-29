import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, ChevronRight, ChevronLeft } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import { motion } from "motion/react";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        const p = data.find((item: any) => item.id === id);
        setProduct(p);
      });
  }, [id]);

  if (!product) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <img
              src={product.image}
              alt={isRtl ? product.nameAr : product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:border-orange-500 transition-colors">
                <img src={`https://picsum.photos/seed/${product.id + i}/200/200`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                {isRtl ? product.categoryAr : product.category}
              </span>
              <span className="text-xs font-bold text-gray-400">SKU: EP-{product.id}001</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {isRtl ? product.nameAr : product.name}
            </h1>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= Math.floor(product.rating) ? "fill-current" : ""}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-600">{product.rating} ({product.reviews} {t("product.reviews")})</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-gray-400 text-sm font-medium">Professional Price</span>
            <div className="flex items-baseline space-x-3 rtl:space-x-reverse">
              <span className="text-4xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
              <span className="text-gray-400 line-through text-lg">${(product.price * 1.2).toLocaleString()}</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Premium quality professional equipment designed for high-performance commercial kitchens. Built with durability and efficiency in mind.
          </p>

          <div className="flex items-center space-x-4 rtl:space-x-reverse pt-4">
            <button
              onClick={() => {
                addToCart(product);
                toast.success(isRtl ? "تمت الإضافة إلى السلة" : "Added to cart");
              }}
              className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center space-x-3 rtl:space-x-reverse shadow-lg shadow-gray-900/10"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{t("product.add_to_cart")}</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <Heart className="w-6 h-6 text-gray-400 hover:text-red-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium text-gray-600">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium text-gray-600">2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <RefreshCw className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium text-gray-600">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specs Section */}
      <section className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("product.specs")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          {[
            { label: "Material", value: "304 Stainless Steel" },
            { label: "Power Source", value: "Electric 220V" },
            { label: "Dimensions", value: "800 x 600 x 900 mm" },
            { label: "Weight", value: "45 kg" },
            { label: "Certification", value: "CE, NSF Certified" },
            { label: "Brand", value: product.brand }
          ].map((spec, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-50">
              <span className="text-gray-500 text-sm">{spec.label}</span>
              <span className="text-gray-900 text-sm font-bold">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
