import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">

      <div className="notfound-card">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist.
        </p>

        <Link to="/">
          <button>
            Back To Home
          </button>
        </Link>

      </div>

    </div>
  );
}

export default NotFound;