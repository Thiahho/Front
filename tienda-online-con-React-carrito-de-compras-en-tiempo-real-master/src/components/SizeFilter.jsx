import { useMemo, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import useSizeFilterStore from "../store/sizeFilterStore";

const SizeFilter = ({ products, totalFiltered }) => {
  const ref = useRef(null);
  const { selectedSizes, handleFilter } = useSizeFilterStore();

  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  const specifications = useMemo(() => {
    if (!products || products.length === 0) return [];
    const allSpecs = products.flatMap((product) => product.availableSizes);
    return [...new Set(allSpecs)].sort();
  }, [products]);

  const handleFilterClick = (value) => {
    ref.current.continuousStart();
    const isSelected = selectedSizes.includes(value);
    const newFilters = isSelected
      ? selectedSizes.filter((item) => item !== value)
      : [...selectedSizes, value];

    setTimeout(() => {
      handleFilter(newFilters);
      ref.current.complete();
    }, 100);
  };

  return (
    <div className="mt-5 p-3 mb-3">
      <LoadingBar color="#ff9c08" ref={ref} shadow={true} />
      <div className="mb-4">
        <h6 className="mb-3">
          Categorías
          <span className="fw-bold float-end">({totalFiltered})</span>
        </h6>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-sm ${
                selectedSizes.includes(category)
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handleFilterClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h6 className="mb-3">Especificaciones</h6>
        <div className="d-flex flex-wrap gap-2">
          {specifications.map((spec) => (
            <button
              key={spec}
              className={`btn btn-sm ${
                selectedSizes.includes(spec)
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => handleFilterClick(spec)}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeFilter;
