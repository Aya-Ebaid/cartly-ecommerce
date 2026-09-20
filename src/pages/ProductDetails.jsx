import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await getProductById(id);

        // Fake Store API returns null/empty body for an invalid id
        if (!data || !data.id) {
          setError("Product not found");
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError("Something went wrong while loading the product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // re-fetch whenever the id in the URL changes

  const handleAddToCart = () => {
    addToCart(product);
    setAddedMessage("Added to cart!");
    setTimeout(() => setAddedMessage(""), 2000);
  };

  if (loading) {
    return (
      <div className="details-page">
        <p className="status-message">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="details-page">
        <p className="status-message error">{error || "Product not found"}</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
    );
  }

  const { title, image, price, description, category, rating } = product;

  return (
    <div className="details-page">
      <div className="details-card">
        <div className="details-image-wrapper">
          <img src={image} alt={title} className="details-image" />
        </div>

        <div className="details-info">
          <span className="product-category">{category}</span>
          <h1 className="details-title">{title}</h1>
          <p className="details-price">${price}</p>
          <p className="details-description">{description}</p>

          {rating && (
            <p className="details-rating">
              ⭐ {rating.rate} ({rating.count} reviews)
            </p>
          )}

          {addedMessage && <div className="alert alert-success">{addedMessage}</div>}

          <div className="details-actions">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {/* React Router navigation back to Home — no reload */}
            <Link to="/" className="btn btn-outline">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;