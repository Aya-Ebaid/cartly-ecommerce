import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Learn more about Cartly and our vision for online shopping</p>
      </section>

      <section className="about-content">
        <div className="about-block">
          <h2>🎯 Who We Are</h2>
          <p>
             Cartly is your one-stop online store for quality products at honest
            prices. We bring together a wide range of items across different
            categories, so you can find what you need quickly and shop with
            confidence — all from one simple, easy-to-use platform.
          </p>
        </div>

        <div className="about-block">
          <h2>🚀 Our Vision</h2>
          <p>
                We believe online shopping should be simple, fast, and enjoyable. That's
                why we focus on a clean browsing experience, quick access to product
                details, and a design that works just as well on your phone as it does
                on your desktop.

          </p>
        </div>

        <div className="about-features">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Fast Performance</h3>
            <p>Instant navigation between pages with no reloads, powered by React Router.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure Accounts</h3>
            <p>A simple and secure sign-up and login system for every user.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Responsive Design</h3>
            <p>A smooth interface that works on every screen size.</p>
          </div>
        </div>

        <div className="about-cta">
          <p>Ready to start shopping?</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;