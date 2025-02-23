import { useEffect, useMemo, useState } from "react";
import useCartStore from "./store/cartStore";
import useOffcanvasStore from "./store/offcanvasStore";
import useTotalStore from "./store/totalProductStore";
import useBalanceStore from "./store/balanceStore";
import useSizeFilterStore from "./store/sizeFilterStore";

import ProductsList from "./components/ProductsList";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SidebarOffCanvas from "./components/SidebarOffCanvas";
import SizeFilter from "./components/SizeFilter";
import useFetch from "./hooks/useFetch"; // Importar el custom hook
import TitleTypeWriter from "./components/TitleTypeWriter";
import SizeFilterSkeleton from "./components/SizeFilterSkeleton";
import CategoryProducts from "./components/CategoryProducts";

const App = () => {
  const { data: products, loading, error } = useFetch("/products"); // Ahora usa el endpoint de la API

  const { cart } = useCartStore();
  const { getTotalProducts } = useTotalStore();
  const { toggleBalanceo } = useBalanceStore();
  const { isVisible, toggleOffcanvas } = useOffcanvasStore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtrar productos por categoría
  const productsByCategory = useMemo(() => {
    if (!products) return { smartphones: [], consolas: [], parlantes: [] };

    return {
      smartphones: products.filter((p) => p.category === "smartphones"),
      consolas: products.filter((p) => p.category === "consola"),
      parlantes: products.filter((p) => p.category === "parlante"),
    };
  }, [products]);

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products?.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  useEffect(() => {
    if (cart.length > 0) {
      const totalProductsBalanceo = getTotalProducts(cart);
      if (!isVisible) {
        toggleOffcanvas(true);
      }
      if (totalProductsBalanceo > 0) {
        toggleBalanceo(true);
      }
    }
  }, [cart, getTotalProducts, toggleBalanceo, toggleOffcanvas, isVisible]);

  return (
    <>
      <Nav onCategorySelect={handleCategorySelect} />
      <div className="container mt-5 mb-5">
        <TitleTypeWriter />
        <div className="row">
          {loading ? (
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="col-12">
              <h2 className="text-center text-danger">
                Error cargando productos: {error.message}
              </h2>
            </div>
          ) : (
            <>
              <div className="col-md-10 mx-auto">
                {selectedCategory ? (
                  <CategoryProducts
                    products={filteredProducts}
                    category={
                      selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)
                    }
                  />
                ) : (
                  <>
                    {Object.entries(productsByCategory).map(
                      ([category, products]) =>
                        products.length > 0 && (
                          <CategoryProducts
                            key={category}
                            products={products}
                            category={
                              category.charAt(0).toUpperCase() +
                              category.slice(1)
                            }
                          />
                        )
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isVisible && <SidebarOffCanvas />}
      <Footer />
    </>
  );
};

export default App;
