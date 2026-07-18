import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompleteProfile.css";

function EducationCareer() {

    const navigate = useNavigate();
    const [qualification, setQualification] = useState("");
const [college, setCollege] = useState("");
const [occupation, setOccupation] = useState("");
const [company, setCompany] = useState("");
const [income, setIncome] = useState("");
const [workLocation, setWorkLocation] = useState("");

const [errors, setErrors] = useState({});
const [warningToast, setWarningToast] = useState("");

const handleNext = () => {

    const newErrors = {};

    if (!qualification.trim()) {
        newErrors.qualification = "Please enter Qualification";
    }

    if (!college.trim()) {
        newErrors.college = "Please enter College";
    }

    if (!occupation.trim()) {
        newErrors.occupation = "Please enter Occupation";
    }

    if (!income.trim()) {
        newErrors.income = "Please enter Annual Income";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {

        setWarningToast(
            "Please complete all required fields before continuing."
        );

        setTimeout(() => {
            setWarningToast("");
        }, 3000);

        return;
    }

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser")) || {};

    const currentUser = loggedInUser.email;

    const allProfiles =
        JSON.parse(localStorage.getItem("allProfiles")) || {};

    allProfiles[currentUser] = {

        ...allProfiles[currentUser],

        qualification,
        college,
        occupation,
        company,
        income,
        workLocation

    };

    localStorage.setItem(
        "allProfiles",
        JSON.stringify(allProfiles)
    );

    navigate("/complete-profile/family");

};

    return (
        <div className="profile-page">

            <div className="profile-card">
                {warningToast && (
    <div className="toast-warning">
        {warningToast}
    </div>
)}

                <h1 className="profile-title">
                    Complete Your Profile
                </h1>

                <p className="profile-subtitle">
                    Please complete your profile to continue.
                </p>

                <h2>Education & Career</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Highest Qualification *</label>
                        <input
    type="text"
    value={qualification}
    onChange={(e) => {

        setQualification(
            e.target.value.replace(/[^a-zA-Z\s]/g, "")
        );

        setErrors({
            ...errors,
            qualification: ""
        });

    }}
    className={errors.qualification ? "input-error" : ""}
/>

{errors.qualification && (
    <p className="error-text">
        {errors.qualification}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>College / University *</label>
                        <input
    type="text"
    value={college}
    onChange={(e) => {

        setCollege(e.target.value);

        setErrors({
            ...errors,
            college: ""
        });

    }}
    className={errors.college ? "input-error" : ""}
/>

{errors.college && (
    <p className="error-text">
        {errors.college}
    </p>
)}
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Occupation *</label>
                        <input
    type="text"
    value={occupation}
    onChange={(e) => {

        setOccupation(
            e.target.value.replace(/[^a-zA-Z\s]/g, "")
        );

        setErrors({
            ...errors,
            occupation: ""
        });

    }}
    className={errors.occupation ? "input-error" : ""}
/>

{errors.occupation && (
    <p className="error-text">
        {errors.occupation}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Company Name</label>
                        <input
    type="text"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
/>
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Annual Income *</label>
                        <input
    type="text"
    value={income}
    maxLength={8}
    onChange={(e) => {

        setIncome(
            e.target.value.replace(/[^0-9]/g, "")
        );

        setErrors({
            ...errors,
            income: ""
        });

    }}
    className={errors.income ? "input-error" : ""}
/>

{errors.income && (
    <p className="error-text">
        {errors.income}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Work Location</label>
                        <input
    type="text"
    value={workLocation}
    onChange={(e) => {

        setWorkLocation(
            e.target.value.replace(/[^a-zA-Z\s]/g, "")
        );

    }}
/>
                    </div>

                </div>

                <div className="step-text">
                    Step 3 of 7
                </div>

                <div className="button-group-between">

                    <button
                        className="previous-btn"
                        onClick={() => navigate("/complete-profile/religion")}
                    >
                        ← Previous
                    </button>

                    <button
                        className="next-btn"
                        onClick={handleNext}
                    >
                        Next →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EducationCareer;