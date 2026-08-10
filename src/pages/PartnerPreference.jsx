import React, { useEffect, useState } from "react";
import {
    FaBirthdayCake,
    FaGraduationCap,
    FaBriefcase,
    FaMapMarkerAlt,
    FaHeart
} from "react-icons/fa";
import "../styles/CompleteProfile.css";

function PartnerPreference({
    onNext,
    onPrevious
}) {

    const [ageFrom, setAgeFrom] = useState("");
    const [ageTo, setAgeTo] = useState("");

    const [religion, setReligion] = useState("");
    const [education, setEducation] = useState("");
    const [occupation, setOccupation] = useState("");
    const [country, setCountry] = useState("");

    const [errors, setErrors] = useState({});
    const [warningToast, setWarningToast] = useState("");


    /*
    =========================================================
    LOAD SAVED DATA
    =========================================================
    */

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


        setAgeFrom(
            savedProfile.partnerAgeFrom || ""
        );

        setAgeTo(
            savedProfile.partnerAgeTo || ""
        );

        setReligion(
            savedProfile.partnerReligion || ""
        );

        setEducation(
            savedProfile.partnerEducation || ""
        );

        setOccupation(
            savedProfile.partnerOccupation || ""
        );

        setCountry(
            savedProfile.partnerCountry || ""
        );

    }, []);


    /*
    =========================================================
    VALIDATION
    =========================================================
    */

    const handleNext = () => {

        const newErrors = {};


        /*
        AGE FROM
        */

        if (!ageFrom) {

            newErrors.ageFrom =
                "Please select minimum age";

        }


        /*
        AGE TO
        */

        if (!ageTo) {

            newErrors.ageTo =
                "Please select maximum age";

        }


        /*
        CHECK AGE RANGE
        */

        if (
            ageFrom &&
            ageTo &&
            Number(ageFrom) > Number(ageTo)
        ) {

            newErrors.ageTo =
                "Maximum age must be greater than minimum age";

        }


        /*
        RELIGION
        */

        if (!religion) {

            newErrors.religion =
                "Please select Religion";

        }


        /*
        EDUCATION
        */

        if (!education) {

            newErrors.education =
                "Please select Education";

        }


        /*
        OCCUPATION
        */

        if (!occupation) {

            newErrors.occupation =
                "Please select Occupation";

        }


        /*
        COUNTRY / LOCATION
        */

        if (!country.trim()) {

            newErrors.country =
                "Please enter Preferred Location";

        }


        setErrors(newErrors);


        /*
        =====================================================
        IF ERRORS
        =====================================================
        */

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


        /*
        =====================================================
        GET LOGGED IN USER
        =====================================================
        */

        const loggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            ) || {};


        const currentUser =
            loggedInUser.email;


        /*
        =====================================================
        GET ALL PROFILES
        =====================================================
        */

        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};


        /*
        =====================================================
        SAVE PARTNER PREFERENCE
        =====================================================
        */

        allProfiles[currentUser] = {

            ...allProfiles[currentUser],

            partnerAgeFrom: ageFrom,

            partnerAgeTo: ageTo,

            partnerReligion: religion,

            partnerEducation: education,

            partnerOccupation: occupation,

            partnerCountry: country

        };


        /*
        =====================================================
        SAVE TO LOCAL STORAGE
        =====================================================
        */

        localStorage.setItem(

            "allProfiles",

            JSON.stringify(
                allProfiles
            )

        );


        /*
        =====================================================
        GO TO NEXT STEP
        =====================================================
        */

        if (onNext) {

            onNext();

        }

    };


    /*
    =========================================================
    RENDER
    =========================================================
    */

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

                    Partner Preference

                </h2>


                {/* =================================================
                    AGE RANGE
                ================================================= */}

                <div className="form-row">


                    {/* AGE FROM */}

                    <div className="form-group">

                        <label>

                            Preferred Age From

                            <span className="required-star">

                                *

                            </span>

                        </label>
<div className="input-with-icon">

    <FaBirthdayCake className="input-icon" />

                        <select

                            value={ageFrom}

                            onChange={(e) => {

                                setAgeFrom(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    ageFrom: ""

                                });

                            }}

                            className={
                                errors.ageFrom
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Minimum Age

                            </option>


                            {Array.from(
                                { length: 23 },
                                (_, index) => {

                                    const age =
                                        index + 18;

                                    return (

                                        <option
                                            key={age}
                                            value={age}
                                        >

                                            {age} Years

                                        </option>

                                    );

                                }
                            )}

                        </select>
                        </div>


                        {errors.ageFrom && (

                            <p className="error-text">

                                {errors.ageFrom}

                            </p>

                        )}

                    </div>


                    {/* AGE TO */}

                    <div className="form-group">

                        <label>

                            Preferred Age To

                            <span className="required-star">

                                *

                            </span>

                        </label>
                        <div className="input-with-icon">

    <FaBirthdayCake className="input-icon" />



                        <select

                            value={ageTo}

                            onChange={(e) => {

                                setAgeTo(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    ageTo: ""

                                });

                            }}

                            className={
                                errors.ageTo
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Maximum Age

                            </option>


                            {Array.from(
                                { length: 23 },
                                (_, index) => {

                                    const age =
                                        index + 18;

                                    return (

                                        <option
                                            key={age}
                                            value={age}
                                        >

                                            {age} Years

                                        </option>

                                    );

                                }
                            )}

                        </select>
                        </div>


                        {errors.ageTo && (

                            <p className="error-text">

                                {errors.ageTo}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    EDUCATION + OCCUPATION
                ================================================= */}

                <div className="form-row">


                    {/* EDUCATION */}

                    <div className="form-group">

                        <label>

                            Preferred Education

                            <span className="required-star">

                                *

                            </span>

                        </label>
                        <div className="input-with-icon">

    <FaGraduationCap className="input-icon" />



                        <select

                            value={education}

                            onChange={(e) => {

                                setEducation(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    education: ""

                                });

                            }}

                            className={
                                errors.education
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Education

                            </option>

                            <option>

                                Any Education

                            </option>

                            <option>

                                SSLC

                            </option>

                            <option>

                                PUC

                            </option>

                            <option>

                                Diploma

                            </option>

                            <option>

                                BCA

                            </option>

                            <option>

                                BBA

                            </option>

                            <option>

                                B.Com

                            </option>

                            <option>

                                BA

                            </option>

                            <option>

                                B.Sc

                            </option>

                            <option>

                                BE / B.Tech

                            </option>

                            <option>

                                MCA

                            </option>

                            <option>

                                MBA

                            </option>

                            <option>

                                M.Com

                            </option>

                            <option>

                                MA

                            </option>

                            <option>

                                M.Sc

                            </option>

                            <option>

                                M.Tech

                            </option>

                            <option>

                                PhD

                            </option>

                        </select>
                        </div>


                        {errors.education && (

                            <p className="error-text">

                                {errors.education}

                            </p>

                        )}

                    </div>


                    {/* OCCUPATION */}

                    <div className="form-group">

                        <label>

                            Preferred Occupation

                            <span className="required-star">

                                *

                            </span>

                        </label>
                        <div className="input-with-icon">

    <FaBriefcase className="input-icon" />


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

                            <option>

                                Any Occupation

                            </option>

                            <option>

                                Software Developer

                            </option>

                            <option>

                                Government Employee

                            </option>

                            <option>

                                Private Employee

                            </option>

                            <option>

                                Teacher

                            </option>

                            <option>

                                Doctor

                            </option>

                            <option>

                                Engineer

                            </option>

                            <option>

                                Business

                            </option>

                            <option>

                                Banking Professional

                            </option>

                            <option>

                                Lawyer

                            </option>

                            <option>

                                Homemaker / Housewife

                            </option>

                            <option>

                                Student

                            </option>

                            <option>

                                Other

                            </option>

                        </select>
                        </div>


                        {errors.occupation && (

                            <p className="error-text">

                                {errors.occupation}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    PREFERRED LOCATION + RELIGION
                ================================================= */}

                <div className="form-row">


                    {/* LOCATION */}

                    <div className="form-group">

                        <label>

                            Preferred Location

                            <span className="required-star">

                                *

                            </span>

                        </label>
                        <div className="input-with-icon">

    <FaMapMarkerAlt className="input-icon" />


                        <input

                            type="text"

                            placeholder="Enter preferred city / country"

                            value={country}

                            onChange={(e) => {

                                setCountry(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    country: ""

                                });

                            }}

                            className={
                                errors.country
                                    ? "input-error"
                                    : ""
                            }

                        />
                        </div>


                        {errors.country && (

                            <p className="error-text">

                                {errors.country}

                            </p>

                        )}

                    </div>


                    {/* RELIGION */}

                    <div className="form-group">

                        <label>

                            Preferred Religion / Community

                            <span className="required-star">

                                *

                            </span>

                        </label>
                        <div className="input-with-icon">

    <FaHeart className="input-icon" />


                        <select

                            value={religion}

                            onChange={(e) => {

                                setReligion(
                                    e.target.value
                                );

                                setErrors({

                                    ...errors,

                                    religion: ""

                                });

                            }}

                            className={
                                errors.religion
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Religion

                            </option>

                            <option>

                                Any Religion

                            </option>

                            <option>

                                Hindu

                            </option>

                            <option>

                                Muslim

                            </option>

                            <option>

                                Christian

                            </option>

                            <option>

                                Sikh

                            </option>

                            <option>

                                Buddhist

                            </option>

                            <option>

                                Jain

                            </option>

                            <option>

                                Other

                            </option>

                        </select>
                        </div>


                        {errors.religion && (

                            <p className="error-text">

                                {errors.religion}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    STEP
                ================================================= */}

                <div className="step-text">

                    Step 5 of 6

                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="button-group-between">


                    <button

                        className="previous-btn"

                        onClick={onPrevious}

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