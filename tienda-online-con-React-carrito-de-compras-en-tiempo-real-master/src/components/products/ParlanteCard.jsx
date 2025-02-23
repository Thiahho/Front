import { useState, useMemo } from "react";
import { BsCartPlus } from "react-icons/bs";

const ParlanteCard = ({ product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  const variantOptions = useMemo(() => {
    const variants = product.variants;

    // Crear mapa de variantes únicas por almacenamiento
    const uniqueVariants = variants.reduce((acc, variant) => {
      if (!acc[variant.storage]) {
        acc[variant.storage] = {
          ...variant,
          count: 1,
        };
      } else {
        acc[variant.storage].count++;
      }
      return acc;
    }, {});

    // Crear mapa de precios
    const priceMap = variants.reduce((acc, v) => {
      acc[v.storage] = {
        price: v.price,
        variantId: v.id,
      };
      return acc;
    }, {});

    return { uniqueVariants, priceMap };
  }, [product.variants]);

  const handleModelSelect = (storage) => {
    const variantInfo = variantOptions.priceMap[storage];
    const selectedVariant = product.variants.find(
      (v) => v.id === variantInfo?.variantId
    );
    setSelectedVariant(selectedVariant);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const productToAdd = {
      ...product,
      selectedVariant,
      price: selectedVariant.price,
      quantity: 1,
    };

    console.log("Adding speaker to cart:", productToAdd);
    onAddToCart(product, selectedVariant);
  };

  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <div className="specs-info mb-3">
      <p className="mb-2 fw-bold">Modelo:</p>
      <div className="d-flex gap-2 flex-wrap mb-3">
        {Object.keys(variantOptions.uniqueVariants).map((storage) => (
          <button
            key={storage}
            className={`btn btn-sm ${
              selectedVariant?.storage === storage
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() => handleModelSelect(storage)}
          >
            {storage}
          </button>
        ))}
      </div>

      <div className="price-section mt-3">
        <p className="mb-2">
          <strong>Precio:</strong>{" "}
          {selectedVariant ? (
            <span className="text-success fw-bold">
              {product.currencyFormat}
              {selectedVariant.price.toLocaleString()}
            </span>
          ) : (
            <span className="text-muted">
              Desde {product.currencyFormat}
              {minPrice.toLocaleString()}
            </span>
          )}
        </p>

        <button
          className="btn btn-cart w-100"
          onClick={handleAddToCart}
          disabled={!selectedVariant}
        >
          {selectedVariant ? (
            <>
              Agregar al carrito &nbsp; <BsCartPlus />
            </>
          ) : (
            "Seleccione modelo"
          )}
        </button>
      </div>
    </div>
  );
};

export default ParlanteCard;
