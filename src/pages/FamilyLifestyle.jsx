import React, { useEffect, useState } from "react";
import {
    FaUserTie,
    FaUser,
    FaUsers,
    FaHome,
    FaUtensils,
    FaSmoking,
    FaWineGlass,
    FaPalette
} from "react-icons/fa";
import "../styles/CompleteProfile.css";

function FamilyLifestyle({ onNext, onPrevious }) {

    // ==========================================
    // STATE
    // ==========================================

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


    // ==========================================
    // LOAD SAVED DATA
    // ==========================================

    useEffect(() => {

        const loggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            ) || {};

        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};

        const currentUser =
            loggedInUser.email;

        const savedProfile =
            allProfiles[currentUser] || {};


        setFatherName(
            savedProfile.fatherName || ""
        );

        setMotherName(
            savedProfile.motherName || ""
        );

        setSiblings(
            savedProfile.siblings || ""
        );

        setFamilyType(
            savedProfile.familyType || ""
        );

        setFoodPreference(
            savedProfile.foodPreference || ""
        );

        setSmokingHabit(
            savedProfile.smokingHabit || ""
        );

        setDrinkingHabit(
            savedProfile.drinkingHabit || ""
        );

        setHobbies(
            savedProfile.hobbies || ""
        );

    }, []);


    // ==========================================
    // SAVE DATA
    // ==========================================

    const saveData = () => {

        const loggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            ) || {};

        const currentUser =
            loggedInUser.email;

        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};


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

    };


    // ==========================================
    // NEXT
    // ==========================================

    const handleNext = () => {

        const newErrors = {};


        // Father Name
        if (!fatherName.trim()) {

            newErrors.fatherName =
                "Please enter Father Name";

        }


        // Mother Name
        if (!motherName.trim()) {

            newErrors.motherName =
                "Please enter Mother Name";

        }


        // Siblings
        if (!siblings.trim()) {

            newErrors.siblings =
                "Please enter Number of Siblings";

        }


        // Family Type
        if (!familyType) {

            newErrors.familyType =
                "Please select Family Type";

        }


        // Food Preference
        if (!foodPreference) {

            newErrors.foodPreference =
                "Please select Food Preference";

        }


        // Smoking Habit
        if (!smokingHabit) {

            newErrors.smokingHabit =
                "Please select Smoking Habit";

        }


        // Drinking Habit
        if (!drinkingHabit) {

            newErrors.drinkingHabit =
                "Please select Drinking Habit";

        }


        setErrors(newErrors);


        // If validation fails
        if (
            Object.keys(newErrors).length > 0
        ) {

            setWarningToast(
                "Please complete all required fields before continuing."
            );


            setTimeout(() => {

                setWarningToast("");

            }, 3000);


            return;

        }


        // Save data
        saveData();


        // Move to next step
        if (onNext) {

            onNext();

        }

    };


    // ==========================================
    // PREVIOUS
    // ==========================================

    const handlePrevious = () => {

        // Save current data
        saveData();


        // Move to previous step
        if (onPrevious) {

            onPrevious();

        }

    };


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="profile-page">


            {/* WARNING TOAST */}

            {warningToast && (

                <div className="toast-warning">

                    {warningToast}

                </div>

            )}


            <div className="profile-card">


                {/* TITLE */}

                <h1 className="profile-title">

                    Complete Your Profile

                </h1>


                <p className="profile-subtitle">

                    Please complete your profile to continue.

                </p>


                <h2>

                    Family & Lifestyle

                </h2>


                {/* ==========================================
                    FATHER + MOTHER
                ========================================== */}

                <div className="form-row">


                    {/* FATHER NAME */}

                    <div className="form-group">

                        <label>

                            Father Name

                            <span className="required-star">

                                *

                            </span>

                        </label>

<div className="input-with-icon">

    <FaUserTie className="input-icon" />
                        <input

                            type="text"

                            value={fatherName}

                            onChange={(e) => {

                                setFatherName(

                                    e.target.value.replace(
                                        /[^a-zA-Z\s]/g,
                                        ""
                                    )

                                );

                                setErrors({

                                    ...errors,

                                    fatherName: ""

                                });

                            }}

                            className={
                                errors.fatherName
                                    ? "input-error"
                                    : ""
                            }

                        />
                        </div>


                        {errors.fatherName && (

                            <p className="error-text">

                                {errors.fatherName}

                            </p>

                        )}

                    </div>


                    {/* MOTHER NAME */}

                    <div className="form-group">

                        <label>

                            Mother Name

                            <span className="required-star">

                                *

                            </span>

                        </label>

<div className="input-with-icon">

    <FaUser className="input-icon" />
                        <input

                            type="text"

                            value={motherName}

                            onChange={(e) => {

                                setMotherName(

                                    e.target.value.replace(
                                        /[^a-zA-Z\s]/g,
                                        ""
                                    )

                                );

                                setErrors({

                                    ...errors,

                                    motherName: ""

                                });

                            }}

                            className={
                                errors.motherName
                                    ? "input-error"
                                    : ""
                            }

                        />
                        </div>


                        {errors.motherName && (

                            <p className="error-text">

                                {errors.motherName}

                            </p>

                        )}

                    </div>

                </div>


                {/* ==========================================
                    SIBLINGS + FAMILY TYPE
                ========================================== */}

                <div className="form-row">


                    {/* SIBLINGS */}

                    <div className="form-group">

                        <label>

                            Number of Siblings

                            <span className="required-star">

                                *

                            </span>

                        </label>
<div className="input-with-icon">

    <FaUsers className="input-icon" />

                        <input

                            type="text"

                            maxLength={2}

                            value={siblings}

                            onChange={(e) => {

                                setSiblings(

                                    e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    )

                                );

                                setErrors({

                                    ...errors,

                                    siblings: ""

                                });

                            }}

                            className={
                                errors.siblings
                                    ? "input-error"
                                    : ""
                            }

                        />
                        </div>


                        {errors.siblings && (

                            <p className="error-text">

                                {errors.siblings}

                            </p>

                        )}

                    </div>


                    {/* FAMILY TYPE */}

                    <div className="form-group">

                        <label>

                            Family Type

                            <span className="required-star">

                                *

                            </span>

                        </label>
<div className="input-with-icon">

    <FaHome className="input-icon" />

                        <select

                            value={familyType}

                            onChange={(e) => {

                                setFamilyType(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    familyType: ""

                                });

                            }}

                            className={
                                errors.familyType
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Family Type

                            </option>

                            <option value="Nuclear">

                                Nuclear

                            </option>

                            <option value="Joint">

                                Joint

                            </option>

                            <option value="Extended">

                                Extended

                            </option>

                        </select>
                        </div>


                        {errors.familyType && (

                            <p className="error-text">

                                {errors.familyType}

                            </p>

                        )}

                    </div>

                </div>


                {/* ==========================================
                    FOOD + SMOKING
                ========================================== */}

                <div className="form-row">


                    {/* FOOD */}

                    <div className="form-group">

                        <label>

                            Food Preference

                            <span className="required-star">

                                *

                            </span>

                        </label>
<div className="input-with-icon">

    <FaUtensils className="input-icon" />

                        <select

                            value={foodPreference}

                            onChange={(e) => {

                                setFoodPreference(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    foodPreference: ""

                                });

                            }}

                            className={
                                errors.foodPreference
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Food Preference

                            </option>

                            <option value="Vegetarian">

                                Vegetarian

                            </option>

                            <option value="Non Vegetarian">

                                Non Vegetarian

                            </option>

                            <option value="Vegan">

                                Vegan

                            </option>

                            <option value="Eggetarian">

                                Eggetarian

                            </option>

                        </select>
                        </div>


                        {errors.foodPreference && (

                            <p className="error-text">

                                {errors.foodPreference}

                            </p>

                        )}

                    </div>


                    {/* SMOKING */}

                    <div className="form-group">

                        <label>

                            Smoking Habit

                            <span className="required-star">

                                *

                            </span>

                        </label>
                        <div className="input-with-icon">

    <FaSmoking className="input-icon" />


                        <select

                            value={smokingHabit}

                            onChange={(e) => {

                                setSmokingHabit(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    smokingHabit: ""

                                });

                            }}

                            className={
                                errors.smokingHabit
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Smoking Habit

                            </option>

                            <option value="Never">

                                Never

                            </option>

                            <option value="Occasionally">

                                Occasionally

                            </option>

                            <option value="Regularly">

                                Regularly

                            </option>

                        </select>
                        </div>


                        {errors.smokingHabit && (

                            <p className="error-text">

                                {errors.smokingHabit}

                            </p>

                        )}

                    </div>

                </div>


                {/* ==========================================
                    DRINKING + HOBBIES
                ========================================== */}

                <div className="form-row">


                    {/* DRINKING */}

                    <div className="form-group">

                        <label>

                            Drinking Habit

                            <span className="required-star">

                                *

                            </span>

                        </label>
                        <div className="input-with-icon">

    <FaWineGlass className="input-icon" />


                        <select

                            value={drinkingHabit}

                            onChange={(e) => {

                                setDrinkingHabit(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    drinkingHabit: ""

                                });

                            }}

                            className={
                                errors.drinkingHabit
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Drinking Habit

                            </option>

                            <option value="Never">

                                Never

                            </option>

                            <option value="Occasionally">

                                Occasionally

                            </option>

                            <option value="Regularly">

                                Regularly

                            </option>

                        </select>
                        </div>


                        {errors.drinkingHabit && (

                            <p className="error-text">

                                {errors.drinkingHabit}

                            </p>

                        )}

                    </div>


                    {/* HOBBIES */}

                    <div className="form-group">

                        <label>

                            Hobbies & Interests

                        </label>
                        <div className="input-with-icon textarea-with-icon">

    <FaPalette className="input-icon" />


                        <textarea

                            rows="4"

                            value={hobbies}

                            onChange={(e) => {

                                setHobbies(
                                    e.target.value
                                );

                            }}

                        ></textarea>
                        </div>

                    </div>

                </div>


                {/* ==========================================
                    STEP
                ========================================== */}

                <div className="step-text">

                    Step 4 of 6

                </div>


                {/* ==========================================
                    BUTTONS
                ========================================== */}

                <div className="button-group-between">


                    <button

                        className="previous-btn"

                        onClick={handlePrevious}

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