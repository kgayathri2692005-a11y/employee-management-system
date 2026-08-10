import React, { useEffect, useState } from "react";
import {
    FaPrayingHands,
    FaUsers,
    FaLanguage,
    FaFlag,
    FaMapMarkerAlt,
    FaCity,
    FaMap,
    FaGlobe
} from "react-icons/fa";

import "../styles/CompleteProfile.css";

function ReligionIdentity({
    onNext,
    onPrevious
}) {

    const [religion, setReligion] = useState("");
    const [caste, setCaste] = useState("");
    const [motherTongue, setMotherTongue] = useState("");
    const [nationality, setNationality] = useState("");

    const [currentAddress, setCurrentAddress] = useState("");
    const [currentCity, setCurrentCity] = useState("");
    const [currentState, setCurrentState] = useState("");
    const [currentCountry, setCurrentCountry] = useState("");

    const [sameAddress, setSameAddress] = useState(false);

    const [permanentAddress, setPermanentAddress] = useState("");
    const [permanentCity, setPermanentCity] = useState("");
    const [permanentState, setPermanentState] = useState("");
    const [permanentCountry, setPermanentCountry] = useState("");

    const [errors, setErrors] = useState({});
    const [warningToast, setWarningToast] = useState("");


    /*
    =========================================================
    LOAD EXISTING PROFILE DATA
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


        setReligion(
            savedProfile.religion || ""
        );

        setCaste(
            savedProfile.caste || ""
        );

        setMotherTongue(
            savedProfile.motherTongue || ""
        );

        setNationality(
            savedProfile.nationality || ""
        );

        setCurrentAddress(
            savedProfile.currentAddress || ""
        );

        setCurrentCity(
            savedProfile.currentCity || ""
        );

        setCurrentState(
            savedProfile.currentState || ""
        );

        setCurrentCountry(
            savedProfile.currentCountry || ""
        );

        setSameAddress(
            savedProfile.sameAddress || false
        );

        setPermanentAddress(
            savedProfile.permanentAddress || ""
        );

        setPermanentCity(
            savedProfile.permanentCity || ""
        );

        setPermanentState(
            savedProfile.permanentState || ""
        );

        setPermanentCountry(
            savedProfile.permanentCountry || ""
        );

    }, []);


    /*
    =========================================================
    SAME ADDRESS CHECKBOX
    =========================================================
    */

    const handleSameAddress = (e) => {

        const checked =
            e.target.checked;

        setSameAddress(checked);

        if (checked) {

            // Copy current address to permanent address

            setPermanentAddress(
                currentAddress
            );

            setPermanentCity(
                currentCity
            );

            setPermanentState(
                currentState
            );

            setPermanentCountry(
                currentCountry
            );

            // Clear permanent address errors

            setErrors({
                ...errors,
                permanentAddress: "",
                permanentCity: "",
                permanentState: "",
                permanentCountry: ""
            });

        } else {

            // Allow user to enter a different address

            setPermanentAddress("");
            setPermanentCity("");
            setPermanentState("");
            setPermanentCountry("");

        }

    };


    /*
    =========================================================
    VALIDATION
    =========================================================
    */

    const validateForm = () => {

        const newErrors = {};


        // Religion

        if (!religion) {

            newErrors.religion =
                "Please select Religion";

        }


        // Caste

        if (!caste.trim()) {

            newErrors.caste =
                "Please enter Caste";

        }


        // Mother Tongue

        if (!motherTongue) {

            newErrors.motherTongue =
                "Please select Mother Tongue";

        }


        // Nationality

        if (!nationality) {

            newErrors.nationality =
                "Please select Nationality";

        }


        // Current Address

        if (!currentAddress.trim()) {

            newErrors.currentAddress =
                "Current Address is required";

        }


        // Current City

        if (!currentCity) {

            newErrors.currentCity =
                "Please select Current City";

        }


        // Current State

        if (!currentState) {

            newErrors.currentState =
                "Please select Current State";

        }


        // Current Country

        if (!currentCountry) {

            newErrors.currentCountry =
                "Please select Current Country";

        }


        /*
        =====================================================
        PERMANENT ADDRESS VALIDATION

        Only validate separately if
        Same Address checkbox is NOT selected.
        =====================================================
        */

        if (!sameAddress) {

            if (!permanentAddress.trim()) {

                newErrors.permanentAddress =
                    "Permanent Address is required";

            }

            if (!permanentCity) {

                newErrors.permanentCity =
                    "Please select Permanent City";

            }

            if (!permanentState) {

                newErrors.permanentState =
                    "Please select Permanent State";

            }

            if (!permanentCountry) {

                newErrors.permanentCountry =
                    "Please select Permanent Country";

            }

        }


        return newErrors;

    };


    /*
    =========================================================
    NEXT BUTTON
    =========================================================
    */

    const handleNext = () => {

        /*
        If checkbox is selected,
        make sure permanent address always
        contains current address values.
        */

        let finalPermanentAddress =
            permanentAddress;

        let finalPermanentCity =
            permanentCity;

        let finalPermanentState =
            permanentState;

        let finalPermanentCountry =
            permanentCountry;


        if (sameAddress) {

            finalPermanentAddress =
                currentAddress;

            finalPermanentCity =
                currentCity;

            finalPermanentState =
                currentState;

            finalPermanentCountry =
                currentCountry;

        }


        const newErrors =
            validateForm();


        setErrors(newErrors);


        /*
        =====================================================
        SHOW WARNING IF VALIDATION FAILS
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
        GET LOGGED-IN USER
        =====================================================
        */

        const loggedInUser =
            JSON.parse(
                localStorage.getItem(
                    "loggedInUser"
                )
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
                localStorage.getItem(
                    "allProfiles"
                )
            ) || {};


        /*
        =====================================================
        SAVE PROFILE DATA
        =====================================================
        */

        allProfiles[currentUser] = {

            ...allProfiles[currentUser],

            religion,

            caste,

            motherTongue,

            nationality,

            currentAddress,

            currentCity,

            currentState,

            currentCountry,

            sameAddress,

            permanentAddress:
                finalPermanentAddress,

            permanentCity:
                finalPermanentCity,

            permanentState:
                finalPermanentState,

            permanentCountry:
                finalPermanentCountry

        };


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

                    Religion & Location

                </h2>


                {/* =================================================
                    RELIGION + CASTE
                ================================================= */}

                <div className="form-row">


                    {/* RELIGION */}

                    <div className="form-group">

                        <label>

                            Religion

                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaPrayingHands className="input-icon" />
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


                    {/* CASTE */}

                    <div className="form-group">

                        <label>

                            Caste

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon">

    <FaUsers className="input-icon" />

                        <input

                            type="text"

                            value={caste}

                            onChange={(e) => {

                                setCaste(
                                    e.target.value
                                );

                                setErrors({
                                    ...errors,
                                    caste: ""
                                });

                            }}

                            className={
                                errors.caste
                                    ? "input-error"
                                    : ""
                            }

                        />
                        </div>


                        {errors.caste && (

                            <p className="error-text">

                                {errors.caste}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    MOTHER TONGUE + NATIONALITY
                ================================================= */}

                <div className="form-row">


                    {/* MOTHER TONGUE */}

                    <div className="form-group">

                        <label>

                            Mother Tongue

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon">

    <FaLanguage className="input-icon" />

                        <select

                            value={motherTongue}

                            onChange={(e) => {

                                setMotherTongue(
                                    e.target.value
                                );

                                setErrors({
                                    ...errors,
                                    motherTongue: ""
                                });

                            }}

                            className={
                                errors.motherTongue
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Mother Tongue

                            </option>

                            <option>
                                Kannada
                            </option>

                            <option>
                                Telugu
                            </option>

                            <option>
                                Tamil
                            </option>

                            <option>
                                Malayalam
                            </option>

                            <option>
                                Hindi
                            </option>

                            <option>
                                English
                            </option>

                            <option>
                                Marathi
                            </option>

                            <option>
                                Urdu
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
                        </div>


                        {errors.motherTongue && (

                            <p className="error-text">

                                {errors.motherTongue}

                            </p>

                        )}

                    </div>


                    {/* NATIONALITY */}

                    <div className="form-group">

                        <label>

                            Nationality

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon">

    <FaFlag className="input-icon" />

                        <select

                            value={nationality}

                            onChange={(e) => {

                                setNationality(
                                    e.target.value
                                );

                                setErrors({
                                    ...errors,
                                    nationality: ""
                                });

                            }}

                            className={
                                errors.nationality
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Nationality

                            </option>

                            <option>
                                Indian
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
                        </div>

                        {errors.nationality && (

                            <p className="error-text">

                                {errors.nationality}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    CURRENT ADDRESS
                ================================================= */}

                <h3 className="address-heading">

                    Current Address

                </h3>


                <div className="form-row">


                    {/* CURRENT ADDRESS */}

                    <div className="form-group">

                        <label>

                            Address

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon textarea-with-icon">

    <FaMapMarkerAlt className="input-icon" />

                        <textarea

                            rows="3"

                            value={currentAddress}

                            onChange={(e) => {

                                const value =
                                    e.target.value;

                                setCurrentAddress(
                                    value
                                );


                                /*
                                If Same Address is checked,
                                update permanent address automatically.
                                */

                                if (sameAddress) {

                                    setPermanentAddress(
                                        value
                                    );

                                }


                                setErrors({
                                    ...errors,
                                    currentAddress: ""
                                });

                            }}

                            className={
                                errors.currentAddress
                                    ? "input-error"
                                    : ""
                            }

                        ></textarea>
                        </div>


                        {errors.currentAddress && (

                            <p className="error-text">

                                {errors.currentAddress}

                            </p>

                        )}

                    </div>

                </div>


                {/* CURRENT CITY + STATE */}

                <div className="form-row">


                    {/* CITY */}

                    <div className="form-group">

                        <label>

                            City

                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaCity className="input-icon" />
                        <select

                            value={currentCity}

                            onChange={(e) => {

                                const value =
                                    e.target.value;

                                setCurrentCity(
                                    value
                                );


                                if (sameAddress) {

                                    setPermanentCity(
                                        value
                                    );

                                }


                                setErrors({
                                    ...errors,
                                    currentCity: ""
                                });

                            }}

                            className={
                                errors.currentCity
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select City

                            </option>

                            <option>
                                Ballari
                            </option>

                            <option>
                                Bengaluru
                            </option>

                            <option>
                                Mysuru
                            </option>

                            <option>
                                Hubballi
                            </option>

                            <option>
                                Mangaluru
                            </option>

                            <option>
                                Hyderabad
                            </option>

                            <option>
                                Chennai
                            </option>

                            <option>
                                Mumbai
                            </option>

                            <option>
                                Delhi
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
                        </div>


                        {errors.currentCity && (

                            <p className="error-text">

                                {errors.currentCity}

                            </p>

                        )}

                    </div>


                    {/* STATE */}

                    <div className="form-group">

                        <label>

                            State

                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaMap className="input-icon" />
                        <select

                            value={currentState}

                            onChange={(e) => {

                                const value =
                                    e.target.value;

                                setCurrentState(
                                    value
                                );


                                if (sameAddress) {

                                    setPermanentState(
                                        value
                                    );

                                }


                                setErrors({
                                    ...errors,
                                    currentState: ""
                                });

                            }}

                            className={
                                errors.currentState
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select State

                            </option>

                            <option>
                                Karnataka
                            </option>

                            <option>
                                Andhra Pradesh
                            </option>

                            <option>
                                Telangana
                            </option>

                            <option>
                                Tamil Nadu
                            </option>

                            <option>
                                Kerala
                            </option>

                            <option>
                                Maharashtra
                            </option>

                            <option>
                                Delhi
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
                        </div>


                        {errors.currentState && (

                            <p className="error-text">

                                {errors.currentState}

                            </p>

                        )}

                    </div>

                </div>


                {/* CURRENT COUNTRY */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            Country

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon">

    <FaGlobe className="input-icon" />

                        <select

                            value={currentCountry}

                            onChange={(e) => {

                                const value =
                                    e.target.value;

                                setCurrentCountry(
                                    value
                                );


                                if (sameAddress) {

                                    setPermanentCountry(
                                        value
                                    );

                                }


                                setErrors({
                                    ...errors,
                                    currentCountry: ""
                                });

                            }}

                            className={
                                errors.currentCountry
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Country

                            </option>

                            <option>
                                India
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
                        </div>


                        {errors.currentCountry && (

                            <p className="error-text">

                                {errors.currentCountry}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    SAME ADDRESS CHECKBOX
                ================================================= */}

                <div className="address-checkbox">
    <input
        type="checkbox"
        checked={sameAddress}
        onChange={handleSameAddress}
    />

    <label>
        Same as Current Address
    </label>
</div>

                {/* =================================================
                    PERMANENT ADDRESS
                ================================================= */}

                <h3 className="address-heading">

                    Permanent Address

                </h3>


                {/* PERMANENT ADDRESS */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            Address

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon textarea-with-icon">

    <FaMapMarkerAlt className="input-icon" />

                        <textarea

                            rows="3"

                            value={permanentAddress}

                            onChange={(e) => {

                                setPermanentAddress(
                                    e.target.value
                                );

                                setErrors({
                                    ...errors,
                                    permanentAddress: ""
                                });

                            }}

                            disabled={sameAddress}

                            className={
                                errors.permanentAddress
                                    ? "input-error"
                                    : ""
                            }

                        ></textarea>
                         </div>

                        {errors.permanentAddress && (

                            <p className="error-text">

                                {errors.permanentAddress}

                            </p>

                        )}

                    </div>

                </div>


                {/* PERMANENT CITY + STATE */}

                <div className="form-row">


                    {/* CITY */}

                    <div className="form-group">

                        <label>

                            City

                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaCity className="input-icon" />
                        <select

                            value={permanentCity}

                            onChange={(e) => {

                                setPermanentCity(
                                    e.target.value
                                );

                                setErrors({
                                    ...errors,
                                    permanentCity: ""
                                });

                            }}

                            disabled={sameAddress}

                            className={
                                errors.permanentCity
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select City

                            </option>

                            <option>
                                Ballari
                            </option>

                            <option>
                                Bengaluru
                            </option>

                            <option>
                                Mysuru
                            </option>

                            <option>
                                Hubballi
                            </option>

                            <option>
                                Mangaluru
                            </option>

                            <option>
                                Hyderabad
                            </option>

                            <option>
                                Chennai
                            </option>

                            <option>
                                Mumbai
                            </option>

                            <option>
                                Delhi
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
                        </div>


                        {errors.permanentCity && (

                            <p className="error-text">

                                {errors.permanentCity}

                            </p>

                        )}

                    </div>


                    {/* STATE */}

                    <div className="form-group">

                        <label>

                            State

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon">

    <FaMap className="input-icon" />

                        <select

                            value={permanentState}

                            onChange={(e) => {

                                setPermanentState(
                                    e.target.value
                                );

                                setErrors({
                                    ...errors,
                                    permanentState: ""
                                });

                            }}

                            disabled={sameAddress}

                            className={
                                errors.permanentState
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select State

                            </option>

                            <option>
                                Karnataka
                            </option>

                            <option>
                                Andhra Pradesh
                            </option>

                            <option>
                                Telangana
                            </option>

                            <option>
                                Tamil Nadu
                            </option>

                            <option>
                                Kerala
                            </option>

                            <option>
                                Maharashtra
                            </option>

                            <option>
                                Delhi
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
</div>

                        {errors.permanentState && (

                            <p className="error-text">

                                {errors.permanentState}

                            </p>

                        )}

                    </div>

                </div>


                {/* PERMANENT COUNTRY */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            Country

                            <span className="required-star">
                                *
                            </span>

                        </label>
<div className="input-with-icon">

    <FaGlobe className="input-icon" />

                        <select

                            value={permanentCountry}

                            onChange={(e) => {

                                setPermanentCountry(
                                    e.target.value
                                );

                                setErrors({
                                    ...errors,
                                    permanentCountry: ""
                                });

                            }}

                            disabled={sameAddress}

                            className={
                                errors.permanentCountry
                                    ? "input-error"
                                    : ""
                            }

                        >

                            <option value="">

                                Select Country

                            </option>

                            <option>
                                India
                            </option>

                            <option>
                                Other
                            </option>

                        </select>
</div>

                        {errors.permanentCountry && (

                            <p className="error-text">

                                {errors.permanentCountry}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    STEP
                ================================================= */}

                <div className="step-text">

                    Step 2 of 6

                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="button-group-between">


                    <button

                        className="previous-btn"

                        type="button"

                        onClick={onPrevious}

                    >

                        ← Previous

                    </button>


                    <button

                        className="next-btn"

                        type="button"

                        onClick={handleNext}

                    >

                        Next →

                    </button>


                </div>


            </div>

        </div>

    );

}

export default ReligionIdentity;