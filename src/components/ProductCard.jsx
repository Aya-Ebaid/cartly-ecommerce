import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, price, image, description, category } = product;

  // Shorten the description so cards stay consistent in height
  const shortDescription =
    description?.length > 80 ? description.slice(0, 80) + "..." : description;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{shortDescription}</p>
        <div className="product-price-row">
          <span className="product-price">${price}</span>
        </div>
        <div className="product-actions">
          {/* React Router navigation — no page reload */}
          <Link to={`/products/${id}`} className="btn btn-outline btn-small">
            View Details
          </Link>
          <button className="btn btn-primary btn-small" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;