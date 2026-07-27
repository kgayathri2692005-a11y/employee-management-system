import "./../styles/PageNavigation.css";
import { useNavigate } from "react-router-dom";

function PageNavigation({ previous, next }) {
  const navigate = useNavigate();

  return (
    <div className="page-navigation">

      {previous && (
        <button
          className="previous-btn"
          onClick={() => navigate(previous)}
        >
          ← Previous
        </button>
      )}

      {next && (
        <button
          className="next-btn"
          onClick={() => navigate(next)}
        >
          Next →
        </button>
      )}

    </div>
  );
}

export default PageNavigation;