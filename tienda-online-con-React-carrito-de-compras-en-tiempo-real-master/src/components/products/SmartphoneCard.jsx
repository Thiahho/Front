import { useState, useMemo } from "react";
import { BsCartPlus } from "react-icons/bs";

const SmartphoneCard = ({ product, onAddToCart }) => {
  const [selectedVariants, setSelectedVariants] = useState({
    ram: null,
    storage: null,
    variantId: null,
  });

  const variantOptions = useMemo(() => {
    const variants = product.variants;

    // Crear un mapa de variantes únicas
    const uniqueVariants = variants.reduce((acc, variant) => {
      const key = `${variant.ram}-${variant.storage}`;
      if (!acc[key]) {
        acc[key] = {
          ...variant,
          count: 1,
        };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    // Obtener RAMs únicas
    const rams = [...new Set(variants.map((v) => v.ram))].sort();

    // Obtener almacenamientos únicos por RAM
    const storagesByRam = rams.reduce((acc, ram) => {
      acc[ram] = [
        ...new Set(variants.filter((v) => v.ram === ram).map((v) => v.storage)),
      ].sort();
      return acc;
    }, {});

    // Crear mapa de precios por combinación
    const priceMap = variants.reduce((acc, v) => {
      acc[`${v.ram}-${v.storage}`] = {
        price: v.price,
        variantId: v.id,
      };
      return acc;
    }, {});

    return { rams, storagesByRam, priceMap, uniqueVariants };
  }, [product.variants]);

  const handleRamSelect = (ram) => {
    setSelectedVariants({
      ram,
      storage: null,
      variantId: null,
    });
  };

  const handleStorageSelect = (storage) => {
    const ram = selectedVariants.ram;
    const key = `${ram}-${storage}`;
    const variantInfo = variantOptions.priceMap[key];

    setSelectedVariants({
      ram,
      storage,
      variantId: variantInfo?.variantId,
    });
  };

  const handleAddToCart = () => {
    const { ram, storage, variantId } = selectedVariants;
    if (!ram || !storage || !variantId) return;

    const selectedVariant = product.variants.find((v) => v.id === variantId);
    if (!selectedVariant) return;

    const productToAdd = {
      ...product,
      selectedVariant,
      price: selectedVariant.price,
      quantity: 1,
    };

    console.log("Adding to cart:", productToAdd);
    onAddToCart(product, selectedVariant);
  };

  // Obtener el precio actual basado en la selección completa
  const getCurrentPrice = () => {
    const { ram, storage } = selectedVariants;
    if (!ram || !storage) return null;
    return variantOptions.priceMap[`${ram}-${storage}`]?.price;
  };

  const currentPrice = getCurrentPrice();
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <div className="specs-info mb-3">
      <div className="mb-3">
        <p className="mb-2 fw-bold">Memoria RAM:</p>
        <div className="d-flex gap-2 flex-wrap">
          {variantOptions.rams.map((ram) => (
            <button
              key={ram}
              className={`btn btn-sm ${
                selectedVariants.ram === ram ? "btn-info" : "btn-outline-info"
              }`}
              onClick={() => handleRamSelect(ram)}
            >
              {ram}
            </button>
          ))}
        </div>
      </div>

      {selectedVariants.ram && (
        <div className="mb-3">
          <p className="mb-2 fw-bold">Almacenamiento:</p>
          <div className="d-flex gap-2 flex-wrap">
            {variantOptions.storagesByRam[selectedVariants.ram].map(
              (storage) => (
                <button
                  key={storage}
                  className={`btn btn-sm ${
                    selectedVariants.storage === storage
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => handleStorageSelect(storage)}
                >
                  {storage}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <div className="price-section mt-3">
        <p className="mb-2">
          <strong>Precio:</strong>{" "}
          {currentPrice ? (
            <span className="text-success fw-bold">
              {product.currencyFormat}
              {currentPrice.toLocaleString()}
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
          disabled={!selectedVariants.variantId}
        >
          {selectedVariants.variantId ? (
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

export default SmartphoneCard;
