import { useState, useMemo } from "react";
import useCartStore from "../store/cartStore";
import SmartphoneCard from "./products/SmartphoneCard";
import ConsoleCard from "./products/ConsoleCard";
import ParlanteCard from "./products/ParlanteCard";
import "../styles/ProductsList.css";

const ProductsList = ({ products }) => {
  const { addToCart } = useCartStore();
  const [imageErrors, setImageErrors] = useState({});

  // Agrupar productos por modelo
  const groupedProducts = useMemo(() => {
    const grouped = products.reduce((acc, product) => {
      const baseTitle = product.title.split("(")[0].trim(); // Obtener título base sin variantes
      if (!acc[baseTitle]) {
        acc[baseTitle] = {
          ...product,
          variants: [],
        };
      }
      // Añadir variantes al producto base
      acc[baseTitle].variants = [
        ...acc[baseTitle].variants,
        ...product.variants,
      ];
      return acc;
    }, {});

    return Object.values(grouped);
  }, [products]);

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const getImageUrl = (product) => {
    if (!product.imageUrl) {
      return "/images/placeholder.png";
    }

    // Limpiar la ruta de la imagen
    const cleanPath = product.imageUrl.startsWith("/")
      ? product.imageUrl
      : `/${product.imageUrl}`;
    const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");
    const imageUrl = `${baseUrl}${cleanPath}`;

    console.log("Product Category:", product.category);
    console.log("Image URL:", imageUrl);
    return imageUrl;
  };

  const handleAddToCart = (product, variant) => {
    const variantId = `${product.id}-${variant.storage}-${variant.ram}`;

    const productToAdd = {
      ...product,
      id: variantId,
      price: variant.price,
      title: `${product.title} (${variant.ram}/${variant.storage})`,
      selectedVariant: variant,
    };

    addToCart(productToAdd);
  };

  const renderProductCard = (product) => {
    // Normalizar la categoría a minúsculas para la comparación
    const category = product.category.toLowerCase();
    console.log("Rendering product category:", category); // Debug

    switch (category) {
      case "smartphones":
        return (
          <SmartphoneCard product={product} onAddToCart={handleAddToCart} />
        );
      case "consola": // Solo mantener esta variante
        return <ConsoleCard product={product} onAddToCart={handleAddToCart} />;
      case "parlante":
        return <ParlanteCard product={product} onAddToCart={handleAddToCart} />;
      default:
        console.log("Unknown category:", category); // Debug
        return null;
    }
  };

  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {groupedProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="card custom-card h-100">
              <div className="position-relative">
                <img
                  src={getImageUrl(product)}
                  className="card-img-top"
                  alt={product.title}
                  onError={(e) => {
                    e.target.onerror = null; // Prevenir bucle infinito
                    e.target.src = "/images/placeholder.png";
                  }}
                />
                {product.isFreeShipping && (
                  <span className="shipping-badge">Envío gratis</span>
                )}
              </div>
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-primary me-2">{product.brand}</span>
                  <span className="badge bg-secondary">{product.category}</span>
                </div>
                <h5 className="card-title mb-2">
                  {product.title.split("(")[0].trim()}
                </h5>
                <p className="card-text small text-muted mb-2">
                  {product.description}
                </p>

                {renderProductCard(product)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
