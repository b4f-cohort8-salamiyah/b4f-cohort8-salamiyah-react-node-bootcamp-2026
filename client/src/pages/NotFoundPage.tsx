import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="panel not-found-page">
      <div className="panel-scroll">
        <div className="not-found-content">
          <h2 className="panel-title">Page not found</h2>
          <p className="not-found-message">
            There is no page at this address. Double-check the link, or head
            back to the homepage.
          </p>
          <Link to="/" className="view-details-button">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
