import "./../styles/PageNavigation.css";
import { useNavigate } from "react-router-dom";

function PageNavigation() {

  const navigate = useNavigate();

  /*
  =========================================================
  BROWSER-LIKE BACK
  =========================================================
  */

  const handlePrevious = () => {
    navigate(-1);
  };


  /*
  =========================================================
  BROWSER-LIKE FORWARD
  =========================================================
  */

  const handleNext = () => {
    navigate(1);
  };


  return (
    <div className="page-navigation">

      <button
        type="button"
        className="previous-btn"
        onClick={handlePrevious}
      >
        <span className="nav-arrow">←</span>
        <span>Previous</span>
      </button>


      <button
        type="button"
        className="next-btn"
        onClick={handleNext}
      >
        <span>Next</span>
        <span className="nav-arrow">→</span>
      </button>

    </div>
  );
}

export default PageNavigation;