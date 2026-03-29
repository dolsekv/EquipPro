import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import { Filter, SlidersHorizontal } from "lucide-react";

const Category: React.FC = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        // Filter by category slug (mock logic)
        setProducts(data);
      });
  }, [slug]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{slug} Equipment</h1>
          <p className="text-gray-500 text-sm mt-1">Showing {products.length} professional tools</p>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 focus:ring-orange-500">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
