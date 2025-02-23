const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configurar ruta para servir imágenes estáticas
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Obtener todos los productos
app.get("/api/products", async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT 
        p.id, 
        p.title, 
        p.description, 
        p.brand, 
        p.category,
        p.isFreeShipping,
        p.style,
        p.sku,
        p.currencyFormat,
        p.currencyId,
        p.installments,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'storage', v.storage,
            'ram', v.ram,
            'price', v.price,
            'model', v.model
          )
        ) as variants
      FROM products p
      LEFT JOIN product_variants v ON p.id = v.product_id
      GROUP BY p.id
    `);

    // Parse variants JSON string
    products.forEach((product) => {
      product.variants = JSON.parse(product.variants);
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// Obtener productos por categoría
app.get("/api/products/:category", async (req, res) => {
  try {
    const [products] = await pool.query(
      `
      SELECT 
        p.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'storage', v.storage,
            'ram', v.ram,
            'price', v.price,
            'model', v.model
          )
        ) as variants
      FROM products p
      LEFT JOIN product_variants v ON p.id = v.product_id
      WHERE p.category = ?
      GROUP BY p.id
    `,
      [req.params.category]
    );

    products.forEach((product) => {
      product.variants = JSON.parse(product.variants);
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener productos por categoría" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
