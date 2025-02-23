import { TbShoppingBagHeart } from "react-icons/tb";
import useOffcanvasStore from "../store/offcanvasStore";
import useCartStore from "../store/cartStore";
import useTotalStore from "../store/totalProductStore";
import useBalanceStore from "../store/balanceStore";

const MyCart = () => {
  const { balanceo } = useBalanceStore();
  const { cart } = useCartStore();
  const { getTotalProducts } = useTotalStore();
  const totalProducts = getTotalProducts(cart);
  const { toggleOffcanvas } = useOffcanvasStore();

  const buttonClass = `btn cart-badge position-relative ms-auto me-3 swing-on-hover ${
    balanceo ? "balanceo" : ""
  }`;

  return (
    <div className="cart-container">
      <button type="button" onClick={toggleOffcanvas} className={buttonClass}>
        <TbShoppingBagHeart className="shopping-bag-icon" />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {totalProducts}
          <span className="visually-hidden">productos en el carrito</span>
        </span>
      </button>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Carrito de Compras</h5>
          <button
            type="button"
            className="btn-close"
            onClick={toggleOffcanvas}
          ></button>
        </div>

        {/* <div className="offcanvas-body">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <h6 className="product-title">
                  {item.title.split("(")[0].trim()}
                </h6>
                <small className="text-muted d-block">
                  {item.selectedVariant?.storage}
                  {item.selectedVariant?.ram &&
                    ` / ${item.selectedVariant.ram}`}
                </small>
                <div className="price-quantity">
                  <span className="price">
                    {item.currencyFormat}
                    {item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default MyCart;
