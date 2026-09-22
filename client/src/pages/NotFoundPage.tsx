import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="panel not-found-panel">
      <div className="panel-header">
        <h2 className="panel-title">404 - Page Not Found</h2>
      </div>
      <div className="panel-scroll not-found-content">
        <p className="not-found-message">
          Sorry, the address you tried does not exist.
        </p>
        <Link to="/" className="view-details-button not-found-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
