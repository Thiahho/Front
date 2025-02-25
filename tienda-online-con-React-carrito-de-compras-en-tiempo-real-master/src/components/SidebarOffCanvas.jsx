import { RiDeleteBin6Line } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import useCartStore from "../store/cartStore";
import useOffcanvasStore from "../store/offcanvasStore";
import { useEffect, useCallback } from "react";

const SidebarOffCanvas = () => {
  const { cart, removeFromCart } = useCartStore();
  const { isVisible, forceClose } = useOffcanvasStore();

  const handleClose = useCallback(() => {
    console.log("Intentando cerrar sidebar con productos:", cart.length);
    forceClose();
  }, [cart.length, forceClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isVisible) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, handleClose]);

  const calculateSubtotal = () => {
    return cart.reduce((acc, p) => acc + p.price * (p.quantity || 1), 0);
  };

  const getImageUrl = (product) => {
    if (!product.imageUrl) {
      return "/images/placeholder.png";
    }
    const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");
    return `${baseUrl}${product.imageUrl}`;
  };

  const generateWhatsAppMessage = () => {
    if (!cart.length) return "";

    let message = "Hola, me interesa comprar:\n\n";
    cart.forEach((product) => {
      message += `${product.title}\n`;
      if (product.selectedVariant) {
        message += `Modelo: ${product.selectedVariant.storage || ""} ${
          product.selectedVariant.ram ? `- ${product.selectedVariant.ram}` : ""
        }\n`;
      }
      message += `Precio: ${product.currencyFormat}${product.price}\n\n`;
    });
    message += `Total: ${
      cart[0]?.currencyFormat || "S/"
    }${calculateSubtotal().toFixed(2)}`;
    return encodeURIComponent(message);
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${isVisible ? "show" : ""}`}
        tabIndex="-1"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          display: isVisible ? "block" : "none",
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-uppercase text-center fw-bold">
            Mi carrito de compras ({cart.length})
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          {cart.map((productCart) => (
            <div
              className="row align-items-center mb-2 py-1"
              style={{ borderBottom: "1px dashed rgb(176, 176, 176)" }}
              key={productCart.id}
            >
              <div className="col-6">
                <h4 className="mb-2 title-product">
                  {productCart.title.split("(")[0].trim()}
                </h4>
                {productCart.selectedVariant && (
                  <p className="mb-0 detalles-product">
                    {productCart.selectedVariant.storage}
                    {productCart.selectedVariant.ram &&
                      ` - ${productCart.selectedVariant.ram}`}
                  </p>
                )}
                <small className="text-muted">
                  Cantidad: {productCart.quantity || 1}
                </small>
              </div>
              <div className="col-6 text-end">
                <span className="fw-bold">
                  <strong className="fs-5 precio">
                    {productCart.currencyFormat}
                    {(
                      productCart.price * (productCart.quantity || 1)
                    ).toLocaleString()}
                  </strong>
                </span>
                <button
                  className="btn mt-2 delete-product"
                  onClick={() => removeFromCart(productCart.id)}
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="offcanvas-footer mt-4 px-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              <span className="fw-bold">SUBTOTAL:</span>
              <span className="fw-bold ms-2 fs-4">
                {cart[0]?.currencyFormat || "S/"}
                {calculateSubtotal().toLocaleString()}
              </span>
            </h5>
          </div>
          {cart.length > 0 && (
            <a
              href={`https://api.whatsapp.com/send?phone=+51999999999&text=${generateWhatsAppMessage()}`}
              className="btn btn-success w-100 py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="me-2" /> Completar pedido
            </a>
          )}
        </div>
      </div>
      {isVisible && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        ></div>
      )}
    </>
  );
};

export default SidebarOffCanvas;
