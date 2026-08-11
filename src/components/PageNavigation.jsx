import "./../styles/PageNavigation.css";
import { useNavigate } from "react-router-dom";

function PageNavigation() {
    const navigate = useNavigate();

    /*
    =====================================================
    BROWSER-LIKE BACK
    Goes to the previous page in browser history
    =====================================================
    */
    const handlePrevious = () => {
        navigate(-1);
    };

    /*
    =====================================================
    BROWSER-LIKE FORWARD
    Goes to the next page in browser history
    =====================================================
    */
    const handleNext = () => {
        navigate(1);
    };

    return (
        <div className="page-navigation">

            {/* PREVIOUS */}

            <button
                type="button"
                className="previous-btn"
                onClick={handlePrevious}
            >
                <span className="nav-arrow">
                    ←
                </span>

                <span>
                    Previous
                </span>
            </button>


            {/* NEXT */}

            <button
                type="button"
                className="next-btn"
                onClick={handleNext}
            >
                <span>
                    Next
                </span>

                <span className="nav-arrow">
                    →
                </span>
            </button>

        </div>
    );
}

export default PageNavigation;