import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover the Best Products at Great Prices</h1>
        <p>
          Shop a wide range of high-quality products, with fast delivery and
          a smooth, secure shopping experience.
        </p>
        <a href="#products-section" className="btn btn-primary btn-large">
          Browse Products
        </a>
      </div>
    </section>
  );
};

export default Hero;