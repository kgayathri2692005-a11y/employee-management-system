import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompleteProfile.css";

function FamilyLifestyle() {

    const navigate = useNavigate();
    const [fatherName, setFatherName] = useState("");
const [motherName, setMotherName] = useState("");
const [siblings, setSiblings] = useState("");
const [familyType, setFamilyType] = useState("");
const [foodPreference, setFoodPreference] = useState("");
const [smokingHabit, setSmokingHabit] = useState("");
const [drinkingHabit, setDrinkingHabit] = useState("");
const [hobbies, setHobbies] = useState("");

const [errors, setErrors] = useState({});
const [warningToast, setWarningToast] = useState("");

const handleNext = () => {

    const newErrors = {};

    if (!fatherName.trim()) {
        newErrors.fatherName = "Please enter Father Name";
    }

    if (!motherName.trim()) {
        newErrors.motherName = "Please enter Mother Name";
    }

    if (!siblings.trim()) {
        newErrors.siblings = "Please enter Number of Siblings";
    }

    if (!familyType) {
        newErrors.familyType = "Please select Family Type";
    }

    if (!foodPreference) {
        newErrors.foodPreference = "Please select Food Preference";
    }

    if (!smokingHabit) {
        newErrors.smokingHabit = "Please select Smoking Habit";
    }

    if (!drinkingHabit) {
        newErrors.drinkingHabit = "Please select Drinking Habit";
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

        fatherName,
        motherName,
        siblings,
        familyType,
        foodPreference,
        smokingHabit,
        drinkingHabit,
        hobbies

    };

    localStorage.setItem(
        "allProfiles",
        JSON.stringify(allProfiles)
    );

    navigate("/complete-profile/partner");

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

                <h2>Family & Lifestyle</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Father Name *</label>
                        <input
    type="text"
    value={fatherName}
    onChange={(e) => {
        setFatherName(
            e.target.value.replace(/[^a-zA-Z\s]/g, "")
        );

        setErrors({
            ...errors,
            fatherName: ""
        });
    }}
    className={errors.fatherName ? "input-error" : ""}
/>

{errors.fatherName && (
    <p className="error-text">
        {errors.fatherName}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Mother Name *</label>
                        <input
    type="text"
    value={motherName}
    onChange={(e) => {
        setMotherName(
            e.target.value.replace(/[^a-zA-Z\s]/g, "")
        );

        setErrors({
            ...errors,
            motherName: ""
        });
    }}
    className={errors.motherName ? "input-error" : ""}
/>

{errors.motherName && (
    <p className="error-text">
        {errors.motherName}
    </p>
)}
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Number of Siblings *</label>
                        <input
    type="text"
    maxLength={2}
    value={siblings}
    onChange={(e) => {
        setSiblings(
            e.target.value.replace(/[^0-9]/g, "")
        );

        setErrors({
            ...errors,
            siblings: ""
        });
    }}
    className={errors.siblings ? "input-error" : ""}
/>

{errors.siblings && (
    <p className="error-text">
        {errors.siblings}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Family Type *</label>

                        <select
    value={familyType}
    onChange={(e) => {
        setFamilyType(e.target.value);

        setErrors({
            ...errors,
            familyType: ""
        });
    }}
    className={errors.familyType ? "input-error" : ""}
>
    <option value="">Select</option>
    <option>Nuclear</option>
    <option>Joint</option>
</select>

{errors.familyType && (
    <p className="error-text">
        {errors.familyType}
    </p>
)}
                        

                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Food Preference *</label>

                        <select
    value={foodPreference}
    onChange={(e) => {
        setFoodPreference(e.target.value);

        setErrors({
            ...errors,
            foodPreference: ""
        });
    }}
    className={errors.foodPreference ? "input-error" : ""}
>
    <option value="">Select</option>
    <option>Vegetarian</option>
    <option>Non Vegetarian</option>
    <option>Vegan</option>
</select>

{errors.foodPreference && (
    <p className="error-text">
        {errors.foodPreference}
    </p>
)}

                    </div>

                    <div className="form-group">
                        <label>Smoking Habit *</label>

                        <select
    value={smokingHabit}
    onChange={(e) => {
        setSmokingHabit(e.target.value);

        setErrors({
            ...errors,
            smokingHabit: ""
        });
    }}
    className={errors.smokingHabit ? "input-error" : ""}
>
    <option value="">Select</option>
    <option>Never</option>
    <option>Occasionally</option>
    <option>Regularly</option>
</select>

{errors.smokingHabit && (
    <p className="error-text">
        {errors.smokingHabit}
    </p>
)}

                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Drinking Habit *</label>

                        <select
    value={drinkingHabit}
    onChange={(e) => {
        setDrinkingHabit(e.target.value);

        setErrors({
            ...errors,
            drinkingHabit: ""
        });
    }}
    className={errors.drinkingHabit ? "input-error" : ""}
>
    <option value="">Select</option>
    <option>Never</option>
    <option>Occasionally</option>
    <option>Regularly</option>
</select>

{errors.drinkingHabit && (
    <p className="error-text">
        {errors.drinkingHabit}
    </p>
)}

                    </div>

                    <div className="form-group">
                        <label>Hobbies & Interests</label>

                        <textarea
    rows="4"
    value={hobbies}
    onChange={(e) => setHobbies(e.target.value)}
></textarea>

                    </div>

                </div>

                <div className="step-text">
                    Step 4 of 7
                </div>

                <div className="button-group-between">

                    <button
                        className="previous-btn"
                        onClick={() =>
                            navigate("/complete-profile/education")
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

export default FamilyLifestyle;