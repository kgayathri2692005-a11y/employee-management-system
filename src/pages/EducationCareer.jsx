import React, { useEffect, useState } from "react";
import "../styles/CompleteProfile.css";

function EducationCareer({ onNext, onPrevious }) {

    // ==========================================
    // STATE
    // ==========================================

    const [qualification, setQualification] = useState("");
    const [college, setCollege] = useState("");
    const [occupation, setOccupation] = useState("");
    const [company, setCompany] = useState("");
    const [income, setIncome] = useState("");
    const [workLocation, setWorkLocation] = useState("");

    const [errors, setErrors] = useState({});
    const [warningToast, setWarningToast] = useState("");


    // ==========================================
    // LOAD SAVED DATA
    // This keeps data when user goes Previous/Next
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


        setQualification(
            savedProfile.qualification || ""
        );

        setCollege(
            savedProfile.college || ""
        );

        setOccupation(
            savedProfile.occupation || ""
        );

        setCompany(
            savedProfile.company || ""
        );

        setIncome(
            savedProfile.income || ""
        );

        setWorkLocation(
            savedProfile.workLocation || ""
        );

    }, []);


    // ==========================================
    // SAVE DATA TO LOCAL STORAGE
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

    };


    // ==========================================
    // NEXT BUTTON
    // ==========================================

    const handleNext = () => {

        const newErrors = {};


        // Qualification
        if (!qualification) {

            newErrors.qualification =
                "Please select Qualification";

        }


        // College
        if (!college.trim()) {

            newErrors.college =
                "Please enter College / University";

        }


        // Occupation
        if (!occupation) {

            newErrors.occupation =
                "Please select Occupation";

        }


        // Annual Income
        if (!income.trim()) {

            newErrors.income =
                "Please enter Annual Income";

        }


        setErrors(newErrors);


        // If validation errors exist
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


        // Go to next step
        if (onNext) {

            onNext();

        }

    };


    // ==========================================
    // PREVIOUS BUTTON
    // ==========================================

    const handlePrevious = () => {

        // Save current data before going back
        saveData();


        if (onPrevious) {

            onPrevious();

        }

    };


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="profile-page">

            {/* Warning Toast */}

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

                    Education & Career

                </h2>


                {/* ==========================================
                    QUALIFICATION + COLLEGE
                ========================================== */}

                <div className="form-row">


                    {/* Qualification */}

                    <div className="form-group">

                        <label>

                            Highest Qualification

                            <span className="required-star">

                                *

                            </span>

                        </label>


                        <select

                            value={qualification}

                            onChange={(e) => {

                                setQualification(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    qualification: ""

                                });

                            }}

                            className={
                                errors.qualification
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Qualification

                            </option>

                            <option value="10th">

                                10th

                            </option>

                            <option value="12th">

                                12th

                            </option>

                            <option value="Diploma">

                                Diploma

                            </option>

                            <option value="BCA">

                                BCA

                            </option>

                            <option value="BBA">

                                BBA

                            </option>

                            <option value="B.Com">

                                B.Com

                            </option>

                            <option value="B.Sc">

                                B.Sc

                            </option>

                            <option value="B.E / B.Tech">

                                B.E / B.Tech

                            </option>

                            <option value="MBBS">

                                MBBS

                            </option>

                            <option value="LLB">

                                LLB

                            </option>

                            <option value="MCA">

                                MCA

                            </option>

                            <option value="MBA">

                                MBA

                            </option>

                            <option value="M.Com">

                                M.Com

                            </option>

                            <option value="M.Sc">

                                M.Sc

                            </option>

                            <option value="M.E / M.Tech">

                                M.E / M.Tech

                            </option>

                            <option value="PhD">

                                PhD

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>


                        {errors.qualification && (

                            <p className="error-text">

                                {errors.qualification}

                            </p>

                        )}

                    </div>


                    {/* College */}

                    <div className="form-group">

                        <label>

                            College / University

                            <span className="required-star">

                                *

                            </span>

                        </label>


                        <input

                            type="text"

                            value={college}

                            onChange={(e) => {

                                setCollege(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    college: ""

                                });

                            }}

                            className={
                                errors.college
                                    ? "input-error"
                                    : ""
                            }

                        />


                        {errors.college && (

                            <p className="error-text">

                                {errors.college}

                            </p>

                        )}

                    </div>

                </div>


                {/* ==========================================
                    OCCUPATION + COMPANY
                ========================================== */}

                <div className="form-row">


                    {/* Occupation */}

                    <div className="form-group">

                        <label>

                            Occupation

                            <span className="required-star">

                                *

                            </span>

                        </label>


                        <select

                            value={occupation}

                            onChange={(e) => {

                                setOccupation(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    occupation: ""

                                });

                            }}

                            className={
                                errors.occupation
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Occupation

                            </option>

                            <option value="Software Developer">

                                Software Developer

                            </option>

                            <option value="Software Engineer">

                                Software Engineer

                            </option>

                            <option value="Web Developer">

                                Web Developer

                            </option>

                            <option value="Data Analyst">

                                Data Analyst

                            </option>

                            <option value="Teacher">

                                Teacher

                            </option>

                            <option value="Professor">

                                Professor

                            </option>

                            <option value="Doctor">

                                Doctor

                            </option>

                            <option value="Nurse">

                                Nurse

                            </option>

                            <option value="Engineer">

                                Engineer

                            </option>

                            <option value="Lawyer">

                                Lawyer

                            </option>

                            <option value="Government Employee">

                                Government Employee

                            </option>

                            <option value="Business">

                                Business

                            </option>

                            <option value="Banking Professional">

                                Banking Professional

                            </option>

                            <option value="Accountant">

                                Accountant

                            </option>

                            <option value="Designer">

                                Designer

                            </option>

                            <option value="Student">

                                Student

                            </option>

                            <option value="Homemaker">

                                Homemaker

                            </option>

                            <option value="Housewife">

                                Housewife

                            </option>

                            <option value="Self Employed">

                                Self Employed

                            </option>

                            <option value="Not Working">

                                Not Working

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>


                        {errors.occupation && (

                            <p className="error-text">

                                {errors.occupation}

                            </p>

                        )}

                    </div>


                    {/* Company */}

                    <div className="form-group">

                        <label>

                            Company Name

                        </label>


                        <input

                            type="text"

                            value={company}

                            onChange={(e) => {

                                setCompany(
                                    e.target.value
                                );

                            }}

                        />

                    </div>

                </div>


                {/* ==========================================
                    INCOME + WORK LOCATION
                ========================================== */}

                <div className="form-row">


                    {/* Income */}

                    <div className="form-group">

                        <label>

                            Annual Income

                            <span className="required-star">

                                *

                            </span>

                        </label>


                        <input

                            type="text"

                            maxLength={10}

                            placeholder="Example: 500000"

                            value={income}

                            onChange={(e) => {

                                setIncome(

                                    e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    )

                                );

                                setErrors({

                                    ...errors,

                                    income: ""

                                });

                            }}

                            className={
                                errors.income
                                    ? "input-error"
                                    : ""
                            }

                        />


                        {errors.income && (

                            <p className="error-text">

                                {errors.income}

                            </p>

                        )}

                    </div>


                    {/* Work Location */}

                    <div className="form-group">

                        <label>

                            Work Location

                        </label>


                        <input

                            type="text"

                            value={workLocation}

                            onChange={(e) => {

                                setWorkLocation(

                                    e.target.value.replace(
                                        /[^a-zA-Z\s]/g,
                                        ""
                                    )

                                );

                            }}

                        />

                    </div>

                </div>


                {/* ==========================================
                    STEP
                ========================================== */}

                <div className="step-text">

                    Step 3 of 6

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


export default EducationCareer;