const fs = require("fs");
const path = require("path");

const brands = ["xiaomi", "motorola", "samsung"];
const categories = ["smartphones", "consolas", "parlantes"];
const baseDir = path.join(__dirname, "../public/images");

// Crear carpeta base si no existe
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Crear estructura de carpetas
brands.forEach((brand) => {
  const brandPath = path.join(baseDir, brand);
  fs.mkdirSync(brandPath, { recursive: true });

  categories.forEach((category) => {
    const categoryPath = path.join(brandPath, category);
    fs.mkdirSync(categoryPath, { recursive: true });
  });
});

console.log("Estructura de carpetas creada exitosamente");
