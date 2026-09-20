import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="section-title">Your Cart</h1>
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="section-title">Your Cart</h1>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} className="cart-item-image" />

            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">${item.price}</p>
            </div>

            <div className="cart-item-quantity">
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              className="btn btn-outline btn-small remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <button className="btn btn-outline" onClick={clearCart}>
          Clear Cart
        </button>
        <h2 className="cart-total">Total: ${cartTotal.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;