import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompleteProfile.css";

function PartnerPreference() {

    const navigate = useNavigate();
    const [ageFrom, setAgeFrom] = useState("");
const [ageTo, setAgeTo] = useState("");

const [religion, setReligion] = useState("");

const [education, setEducation] = useState("");
const [occupation, setOccupation] = useState("");
const [country, setCountry] = useState("");

const [errors, setErrors] = useState({});
const [warningToast, setWarningToast] = useState("");

const handleNext = () => {

    const newErrors = {};

    if (!ageFrom) newErrors.ageFrom = "Enter minimum age";

    if (!ageTo) newErrors.ageTo = "Enter maximum age";

    if (!religion) newErrors.religion = "Select Religion";

    if (!education.trim())
        newErrors.education = "Enter Education";

    if (!occupation.trim())
        newErrors.occupation = "Enter Occupation";

    if (!country.trim())
        newErrors.country = "Enter Country";

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

        partnerAgeFrom: ageFrom,
        partnerAgeTo: ageTo,
        partnerReligion: religion,
        partnerEducation: education,
        partnerOccupation: occupation,
        partnerCountry: country
    };

    localStorage.setItem(
        "allProfiles",
        JSON.stringify(allProfiles)
    );

    navigate("/complete-profile/verification");
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

                <h2>Partner Preference</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Preferred Age From *</label>
                       <input
    type="text"
    maxLength={2}
    value={ageFrom}
    onChange={(e) => {
        setAgeFrom(
            e.target.value.replace(/[^0-9]/g, "")
        );

        setErrors({
            ...errors,
            ageFrom: ""
        });
    }}
    className={errors.ageFrom ? "input-error" : ""}
/>

{errors.ageFrom && (
    <p className="error-text">
        {errors.ageFrom}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Preferred Age To *</label>
                        <input
    type="text"
    maxLength={2}
    value={ageTo}
    onChange={(e) => {
        setAgeTo(
            e.target.value.replace(/[^0-9]/g, "")
        );

        setErrors({
            ...errors,
            ageTo: ""
        });
    }}
    className={errors.ageTo ? "input-error" : ""}
/>

{errors.ageTo && (
    <p className="error-text">
        {errors.ageTo}
    </p>
)}
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Preferred Education *</label>
                        <input
    type="text"
    value={education}
    onChange={(e) => {
        setEducation(e.target.value);

        setErrors({
            ...errors,
            education: ""
        });
    }}
    className={errors.education ? "input-error" : ""}
/>

{errors.education && (
    <p className="error-text">
        {errors.education}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Preferred Occupation</label>
                        <input
    type="text"
    value={occupation}
    onChange={(e) => {
        setOccupation(e.target.value);

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

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Preferred Location</label>
                        <input
    type="text"
    value={country}
    onChange={(e) => {
        setCountry(e.target.value);

        setErrors({
            ...errors,
            country: ""
        });
    }}
    className={errors.country ? "input-error" : ""}
/>

{errors.country && (
    <p className="error-text">
        {errors.country}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Preferred Religion / Community</label>
                        <input
    type="text"
    value={religion}
    onChange={(e) => {
        setReligion(
            e.target.value.replace(/[^a-zA-Z\s]/g, "")
        );

        setErrors({
            ...errors,
            religion: ""
        });
    }}
    className={errors.religion ? "input-error" : ""}
/>

{errors.religion && (
    <p className="error-text">
        {errors.religion}
    </p>
)}
                    </div>

                </div>

                <div className="step-text">
                    Step 5 of 7
                </div>

                <div className="button-group-between">

                    <button
                        className="previous-btn"
                        onClick={() =>
                            navigate("/complete-profile/family")
                        }
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

export default PartnerPreference;