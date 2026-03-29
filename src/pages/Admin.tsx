import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, LayoutDashboard, Package, Users, ShoppingCart } from "lucide-react";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <aside className="w-full md:w-64 space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "products", icon: Package, label: "Products" },
            { id: "orders", icon: ShoppingCart, label: "Orders" },
            { id: "users", icon: Users, label: "Users" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-6 py-4 text-sm font-bold transition-colors border-b border-gray-50 last:border-none ${
                activeTab === item.id ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
          {activeTab === "products" && (
            <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors flex items-center space-x-2 rtl:space-x-reverse">
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left rtl:text-right">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <img src={product.image} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <span className="text-sm font-bold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${product.stock < 10 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Admin;
