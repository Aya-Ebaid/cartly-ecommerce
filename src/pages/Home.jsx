import { useState, useEffect, useMemo } from "react";
import { getAllProducts, getCategories } from "../services/api";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch products + categories once when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Something went wrong while loading products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products dynamically — no reload, no extra API calls
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="home-page">
      <Hero />

      <section id="products-section" className="products-section">
        <h2 className="section-title">Our Products</h2>

        <div className="products-toolbar">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {loading && <p className="status-message">Loading products...</p>}

        {error && <p className="status-message error">{error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="status-message">No products match your search.</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;