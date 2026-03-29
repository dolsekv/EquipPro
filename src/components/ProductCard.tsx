import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import { motion } from "motion/react";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const isRtl = i18n.language === "ar";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(isRtl ? "تمت الإضافة إلى السلة" : "Added to cart");
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group"
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={isRtl ? product.nameAr : product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-orange-600 transition-colors shadow-sm">
          <Heart className="w-4 h-4" />
        </button>
      </Link>

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
            {isRtl ? product.categoryAr : product.category}
          </span>
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold text-gray-600">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors h-10">
            {isRtl ? product.nameAr : product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">{product.brand}</span>
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2.5 bg-gray-900 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
