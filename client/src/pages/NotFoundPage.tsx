import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="panel not-found-page">
      <div className="panel-scroll">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Sorry, the page you are looking for does not exist or has been
            moved.
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
