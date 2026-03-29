import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for products
  app.get("/api/products", (req, res) => {
    res.json([
      {
        id: "1",
        name: "Professional Espresso Machine",
        nameAr: "ماكينة إسبريسو احترافية",
        price: 2500,
        category: "Coffee Equipment",
        categoryAr: "معدات القهوة",
        image: "https://picsum.photos/seed/espresso/400/400",
        rating: 4.8,
        reviews: 124,
        brand: "BrewMaster",
        stock: 15
      },
      {
        id: "2",
        name: "Industrial Convection Oven",
        nameAr: "فرن حراري صناعي",
        price: 4800,
        category: "Cooking Equipment",
        categoryAr: "معدات الطبخ",
        image: "https://picsum.photos/seed/oven/400/400",
        rating: 4.9,
        reviews: 89,
        brand: "CookPro",
        stock: 8
      },
      {
        id: "3",
        name: "Stainless Steel Prep Table",
        nameAr: "طاولة تحضير ستانلس ستيل",
        price: 350,
        category: "Kitchen Furniture",
        categoryAr: "أثاث المطبخ",
        image: "https://picsum.photos/seed/table/400/400",
        rating: 4.7,
        reviews: 210,
        brand: "SteelCraft",
        stock: 45
      },
      {
        id: "4",
        name: "High-Speed Commercial Blender",
        nameAr: "خلاط تجاري عالي السرعة",
        price: 850,
        category: "Food Prep",
        categoryAr: "تحضير الطعام",
        image: "https://picsum.photos/seed/blender/400/400",
        rating: 4.6,
        reviews: 156,
        brand: "MixMaster",
        stock: 22
      }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
