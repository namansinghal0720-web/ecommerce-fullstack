import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());

  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchData();
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);

    if (value.length >= 1) {
      setShowSearchResults(true);

      try {
        const response = await axios.get(
          `/products/search?keyword=${value}`
        );

        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "dark-theme"
        ? "light-theme"
        : "dark-theme";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    alert("Logged out successfully");

    navigate("/login");

    window.location.reload();
  };

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container-fluid">

            <Link className="navbar-brand" to="/">
              E-Commerce
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">

                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                {isLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/add_product">
                      Add Product
                    </Link>
                  </li>
                )}

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </a>

                  <ul className="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleCategorySelect(category)
                          }
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>

              </ul>

              <button
                className="theme-btn me-3"
                onClick={toggleTheme}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              <div className="d-flex align-items-center">

                {isLoggedIn && (
                  <Link
                    to="/cart"
                    className="nav-link me-3"
                  >
                    <i className="bi bi-cart">
                      {" "}Cart
                    </i>
                  </Link>
                )}

                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Products"
                  value={input}
                  onChange={(e) =>
                    handleChange(e.target.value)
                  }
                />

                {showSearchResults && (
                  <ul
                    className="list-group position-absolute"
                    style={{
                      top: "60px",
                      right: "10px",
                      width: "300px",
                      zIndex: 1000,
                    }}
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="list-group-item"
                        >
                          <Link
                            to={`/product/${result.id}`}
                            className="text-decoration-none"
                          >
                            {result.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      noResults && (
                        <li className="list-group-item">
                          No Products Found
                        </li>
                      )
                    )}
                  </ul>
                )}

                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-outline-primary ms-3"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="btn btn-primary ms-2"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    className="btn btn-danger ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}

              </div>

            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;