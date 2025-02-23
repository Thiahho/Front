import { useState } from "react";

const ProductCard = ({ product }) => {
  const baseUrl = "http://localhost:5000";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageFormats = [".jpg", ".png"];

  const getFolderName = (brand) => {
    brand = brand.toLowerCase();
    if (brand === "apple") return "iphone";
    if (brand === "xiaomi") return "xiaomi";
    return brand.toLowerCase();
  };

  const getImagePath = (format) => {
    const folder = getFolderName(product.brand);
    return `${baseUrl}/images/${folder}/${product.title
      .toLowerCase()
      .replace(/ /g, "_")}${format}`;
  };

  const handleImageError = (e) => {
    const nextIndex = (currentImageIndex + 1) % imageFormats.length;

    if (nextIndex !== 0) {
      setCurrentImageIndex(nextIndex);
      e.target.src = getImagePath(imageFormats[nextIndex]);
    } else {
      e.target.src = `${baseUrl}/images/placeholder.jpg`;
    }
  };

  return (
    <div className="card">
      <img
        src={getImagePath(imageFormats[currentImageIndex])}
        className="card-img-top"
        alt={product.title}
        onError={handleImageError}
      />
      {/* ...resto del código... */}
    </div>
  );
};

export default ProductCard;
