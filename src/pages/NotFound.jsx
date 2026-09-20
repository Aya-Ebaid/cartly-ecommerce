import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="details-page" style={{ textAlign: "center" }}>
      <h1>404</h1>
      <p className="status-message">Page not found</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;