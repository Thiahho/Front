import { useState, useEffect } from "react";
import logo from "../assets/imgs/logo.png";
import MyCart from "./MyCart";
import { CiMenuFries } from "react-icons/ci";
import "../styles/Nav.css";

const Nav = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener categorías desde la API
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products`
        );
        const data = await response.json();
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg mb-5 custom-navbar fixed-top w-100">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <CiMenuFries className="menu-icon text-white" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => handleCategoryClick(null)}
              >
                Inicio
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Categorías
              </a>
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category}>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-category={category.toLowerCase()}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <MyCart />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
