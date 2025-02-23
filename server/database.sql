-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS dbori;
USE dbori;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255),  -- Nuevo campo para la URL de la imagen
    description TEXT,
    brand VARCHAR(100),
    category VARCHAR(50),
    isFreeShipping BOOLEAN DEFAULT false,
    style VARCHAR(100),
    ram VARCHAR(15),
    storage VARCHAR(50),  -- Nuevo campo para almacenamiento
    currencyFormat VARCHAR(10) DEFAULT 'S/',
    currencyId VARCHAR(10) DEFAULT 'PEN',
    installments INT DEFAULT 1
);

-- Create product variants table
CREATE TABLE IF NOT EXISTS product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    storage VARCHAR(50),
    ram VARCHAR(50),
    price DECIMAL(10,2),
    FOREIGN KEY (producto_id) REFERENCES Productos(id)
);

-- Insert sample products
INSERT INTO products (id, title, description, brand, category, currencyFormat, currencyId, installments, isFreeShipping, style) VALUES
(1, 'Redmi Pad SE 8.7', 'Xiaomi Redmi Pad SE 8.7', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Green/Gray'),
(2, 'Redmi A3', 'Xiaomi Redmi A3', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black/Green'),
(3, 'Redmi 14C', 'Xiaomi Redmi 14C', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black'),
(4, 'Redmi 14C', 'Xiaomi Redmi 14C', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Blue/Black'),
(5, 'Note 14 Pro', 'Xiaomi Note 14 Pro', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black/Green/Purple'),
(6, 'Poco C65', 'Xiaomi Poco C65', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black/Blue'),
(7, 'Poco C65', 'Xiaomi Poco C65', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black'),
(8, 'Poco C75', 'Xiaomi Poco C75', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black'),
(9, 'Poco M6 Pro', 'Xiaomi Poco M6 Pro', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black'),
(10, 'Poco M6 Pro', 'Xiaomi Poco M6 Pro', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black/Blue/Purple'),
(11, 'Poco X6 Pro', 'Xiaomi Poco X6 Pro', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black/Grey/Yellow'),
(12, 'Poco X7 Pro', 'Xiaomi Poco X7 Pro', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Black'),
(13, 'Xiaomi 14T', 'Xiaomi 14T', 'Xiaomi', 'smartphones', '$', 'USD', 12, true, 'Grey'),
(14, 'Motorola E14', 'Motorola E14', 'Motorola', 'smartphones', '$', 'USD', 12, true, 'Gris acero'),
(15, 'Motorola G24', 'Motorola G24', 'Motorola', 'smartphones', '$', 'USD', 12, true, 'Black'),
(16, 'Motorola G24', 'Motorola G24', 'Motorola', 'smartphones', '$', 'USD', 12, true, 'Gris acero'),
(17, 'Motorola G54', 'Motorola G54', 'Motorola', 'smartphones', '$', 'USD', 12, true, 'Green'),
(18, 'Motorola G85', 'Motorola G85', 'Motorola', 'smartphones', '$', 'USD', 12, true, 'Azul/Gris/Verde'),
(19, 'Samsung A05', 'Samsung A05', 'Samsung', 'smartphones', '$', 'USD', 12, true, 'Black'),
(20, 'Samsung A06', 'Samsung A06', 'Samsung', 'smartphones', '$', 'USD', 12, true, 'Black'),
(21, 'Samsung A06', 'Samsung A06', 'Samsung', 'smartphones', '$', 'USD', 12, true, 'Black'),
(22, 'Samsung S24 FE', 'Samsung S24 FE', 'Samsung', 'smartphones', '$', 'USD', 12, true, 'Graph'),
(23, 'Samsung S24', 'Samsung S24', 'Samsung', 'smartphones', '$', 'USD', 12, true, 'Gray'),
(24, 'Samsung S24 Plus', 'Samsung S24 Plus', 'Samsung', 'smartphones', '$', 'USD', 12, true, 'Black/Gray/Violet'),
(25, 'Samsung S24 Plus', 'Samsung S24 Plus', 'Samsung', 'smartphones', '$', 'USD', 12, true, 'Black/Violet');

-- Insert product variants
INSERT INTO product_variants (producto_id, storage, ram, price) VALUES
(1, '128GB', '4GB', 207.00),
(2, '64GB', '3GB', 103.50),
(3, '256GB', '4GB', 156.40),
(4, '256GB', '8GB', 174.80),
(5, '256GB', '8GB', 391.00),
(6, '128GB', '6GB', 151.80),
(7, '256GB', '8GB', 169.05),
(8, '256GB', '8GB', 173.65),
(9, '256GB', '8GB', 241.50),
(10, '512GB', '12GB', 299.00),
(11, '512GB', '12GB', 402.50),
(12, '256GB', '12GB', 454.25),
(13, '512GB', '12GB', 580.75),
(14, '64GB', '2GB', 97.75),
(15, '128GB', '4GB', 135.70),
(16, '128GB', '8GB', 143.75),
(17, '256GB', '8GB', 218.50),
(18, '256GB', '8GB', 299.00),
(19, '128GB', '4GB', 138.00),
(20, '64GB', '4GB', 138.00),
(21, '128GB', '4GB', 154.10),
(22, '256GB', '8GB', 759.00),
(23, '256GB', '8GB', 828.00),
(24, '256GB', '12GB', 920.00),
(25, '512GB', '12GB', 1035.00);

-- Actualizar las URLs de imagen para usar la estructura de carpetas existente
UPDATE products SET 
  imageUrl = CONCAT(
    '/images/',
    CASE 
      WHEN LOWER(brand) = 'apple' THEN 'iphone'
      WHEN LOWER(brand) = 'xiaomi' THEN 'xiaomi'
      ELSE LOWER(brand)
    END,
    '/',
    REPLACE(LOWER(title), ' ', '_'),
    CASE 
      WHEN id <= 13 THEN '.png'
      ELSE '.jpg'
    END
  );
