import React, { useEffect, useState } from "react";
import { 
    FaUser,
    FaVenusMars,
    FaCalendarAlt,
    FaPhone,
    FaEnvelope,
    FaHeart,
    FaRulerVertical,
    FaWeight,
    FaCamera,
    FaBirthdayCake
} from "react-icons/fa";

import "../styles/CompleteProfile.css";

function BasicInformation({
    onNext,
    onAgeRestricted
}) {

    /*
    =========================================================
    STATE
    =========================================================
    */

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [gender, setGender] = useState("");

    const [dob, setDob] = useState("");

    const [age, setAge] = useState("");

    const [mobileNumber, setMobileNumber] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [maritalStatus, setMaritalStatus] =
        useState("");

    const [height, setHeight] =
        useState("");

    const [weight, setWeight] =
        useState("");

    const [profilePhoto, setProfilePhoto] =
        useState(null);

    const [errors, setErrors] =
        useState({});

    const [warningToast, setWarningToast] =
        useState("");


    /*
    =========================================================
    LOAD EXISTING PROFILE DATA
    =========================================================

    This is useful when editing the profile.
    */

    useEffect(() => {

        const loggedInUser =
            JSON.parse(
                localStorage.getItem(
                    "loggedInUser"
                )
            ) || {};

        const allProfiles =
            JSON.parse(
                localStorage.getItem(
                    "allProfiles"
                )
            ) || {};

        const currentUser =
            loggedInUser.email;

        const savedProfile =
            allProfiles[currentUser] || {};


        setFirstName(
            savedProfile.firstName || ""
        );

        setLastName(
            savedProfile.lastName || ""
        );

        setGender(
            savedProfile.gender || ""
        );

        setDob(
            savedProfile.dob || ""
        );

        setAge(
            savedProfile.age || ""
        );

        setMobileNumber(
            savedProfile.mobileNumber || ""
        );

        setEmail(
            savedProfile.email ||
            loggedInUser.email ||
            ""
        );

        setMaritalStatus(
            savedProfile.maritalStatus || ""
        );

        setHeight(
            savedProfile.height || ""
        );

        setWeight(
            savedProfile.weight || ""
        );

        setProfilePhoto(
            savedProfile.profilePhoto ||
            savedProfile.profileImage ||
            null
        );

    }, []);


    /*
    =========================================================
    CALCULATE AGE FROM DOB
    =========================================================
    */

    const calculateAge = (dateOfBirth) => {

        if (!dateOfBirth) {
            return "";
        }

        const birthDate =
            new Date(dateOfBirth);

        const today =
            new Date();

        let calculatedAge =
            today.getFullYear() -
            birthDate.getFullYear();

        const monthDifference =
            today.getMonth() -
            birthDate.getMonth();


        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() <
                birthDate.getDate()
            )
        ) {

            calculatedAge--;

        }


        return calculatedAge;

    };


    /*
    =========================================================
    DOB CHANGE
    =========================================================
    */

    const handleDobChange = (e) => {

        const selectedDob =
            e.target.value;

        setDob(selectedDob);

        const calculatedAge =
            calculateAge(selectedDob);

        setAge(calculatedAge);


        setErrors({
            ...errors,
            dob: "",
            age: ""
        });


        /*
        CHECK AGE IMMEDIATELY
        */

        if (
            calculatedAge &&
            calculatedAge < 18
        ) {

            setErrors({
                ...errors,
                dob:
                    "You must be at least 18 years old"
            });

            /*
            SHOW POPUP
            */

            if (onAgeRestricted) {

                onAgeRestricted();

            }

        }

    };


    /*
    =========================================================
    PROFILE PHOTO
    =========================================================
    */

    const handleProfilePhoto = (e) => {

        const file =
            e.target.files[0];

        if (!file) {
            return;
        }


        /*
        Convert image to Base64
        so it can be stored in localStorage.
        */

        const reader =
            new FileReader();

        reader.onload = () => {

            setProfilePhoto(
                reader.result
            );

        };

        reader.readAsDataURL(file);


        setErrors({
            ...errors,
            profilePhoto: ""
        });

    };


    /*
    =========================================================
    VALIDATION
    =========================================================
    */

    const validateForm = () => {

        const newErrors = {};


        /*
        FIRST NAME
        */

        if (!firstName.trim()) {

            newErrors.firstName =
                "Please enter First Name";

        }


        /*
        LAST NAME
        */

        if (!lastName.trim()) {

            newErrors.lastName =
                "Please enter Last Name";

        }


        /*
        GENDER
        */

        if (!gender) {

            newErrors.gender =
                "Please select Gender";

        }


        /*
        DATE OF BIRTH
        */

        if (!dob) {

            newErrors.dob =
                "Date Of Birth is required";

        }


        /*
        AGE
        */

        const calculatedAge =
            calculateAge(dob);


        if (
            !dob ||
            calculatedAge < 18
        ) {

            newErrors.age =
                "Age must be at least 18 years";

        }


        /*
        MOBILE
        */

        if (
            !mobileNumber ||
            !/^[0-9]{10}$/.test(
                mobileNumber
            )
        ) {

            newErrors.mobileNumber =
                "Enter a valid 10-digit mobile number";

        }


        /*
        EMAIL
        */

        if (
            !email ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email
            )
        ) {

            newErrors.email =
                "Enter a valid email address";

        }


        /*
        MARITAL STATUS
        */

        if (!maritalStatus) {

            newErrors.maritalStatus =
                "Please select Marital Status";

        }


        /*
        HEIGHT
        */

        if (
            !height ||
            isNaN(height)
        ) {

            newErrors.height =
                "Enter a valid height";

        }


        /*
        WEIGHT
        */

        if (
            !weight ||
            isNaN(weight)
        ) {

            newErrors.weight =
                "Enter a valid weight";

        }


        /*
        PROFILE PHOTO
        */

        if (!profilePhoto) {

            newErrors.profilePhoto =
                "Please upload a profile picture";

        }


        return newErrors;

    };


    /*
    =========================================================
    NEXT BUTTON
    =========================================================
    */

    const handleNext = () => {

        const newErrors =
            validateForm();


        setErrors(
            newErrors
        );


        /*
        IF UNDER 18
        */

        const calculatedAge =
            calculateAge(dob);


        if (
            dob &&
            calculatedAge < 18
        ) {

            if (onAgeRestricted) {

                onAgeRestricted();

            }

            return;

        }


        /*
        OTHER VALIDATION ERRORS
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
        SAVE PROFILE DATA
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


        const allProfiles =
            JSON.parse(
                localStorage.getItem(
                    "allProfiles"
                )
            ) || {};


        allProfiles[currentUser] = {

            ...allProfiles[currentUser],

            firstName,

            lastName,

            gender,

            dob,

            age: calculatedAge,

            mobileNumber,

            email,

            maritalStatus,

            height,

            weight,

            profilePhoto

        };


        localStorage.setItem(

            "allProfiles",

            JSON.stringify(
                allProfiles
            )

        );


        /*
        GO TO NEXT COMPONENT
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


            {warningToast && (

                <div className="toast-warning">

                    {warningToast}

                </div>

            )}


            <div className="profile-card">


                <h1 className="profile-title">

                    Complete Your Profile

                </h1>


                <p className="profile-subtitle">

                    Please complete your profile to continue.

                </p>


                <h2>

                    Basic Information

                </h2>


                {/* =================================================
                    FIRST NAME + LAST NAME
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            First Name
                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaUser className="input-icon" />

    <input

        type="text"

        value={firstName}

        onChange={(e) => {

            setFirstName(
                e.target.value.replace(
                    /[^a-zA-Z\s]/g,
                    ""
                )
            );

            setErrors({
                ...errors,
                firstName: ""
            });

        }}

        className={
            errors.firstName
                ? "input-error"
                : ""
        }

    />

</div>

                        {errors.firstName && (

                            <p className="error-text">

                                {errors.firstName}

                            </p>

                        )}

                    </div>


                    <div className="form-group">

                        <label>

                            Last Name
                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaUser className="input-icon" />

    <input

        type="text"

        value={lastName}

        onChange={(e) => {

            setLastName(
                e.target.value.replace(
                    /[^a-zA-Z\s]/g,
                    ""
                )
            );

            setErrors({
                ...errors,
                lastName: ""
            });

        }}

        className={
            errors.lastName
                ? "input-error"
                : ""
        }

    />

</div>


{errors.lastName && (

                            <p className="error-text">

                                {errors.lastName}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    GENDER + DOB
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            Gender
                            <span className="required-star">
                                *
                            </span>

                        </label>


                        <div className="gender-radio-group">
                             <FaVenusMars className="gender-icon" />


                            <label>

                                <input

                                    type="radio"

                                    name="gender"

                                    value="Male"

                                    checked={
                                        gender === "Male"
                                    }

                                    onChange={(e) => {

                                        setGender(
                                            e.target.value
                                        );

                                        setErrors({
                                            ...errors,
                                            gender: ""
                                        });

                                    }}

                                />

                                Male

                            </label>


                            <label>

                                <input

                                    type="radio"

                                    name="gender"

                                    value="Female"

                                    checked={
                                        gender === "Female"
                                    }

                                    onChange={(e) => {

                                        setGender(
                                            e.target.value
                                        );

                                        setErrors({
                                            ...errors,
                                            gender: ""
                                        });

                                    }}

                                />

                                Female

                            </label>


                        </div>


                        {errors.gender && (

                            <p className="error-text">

                                {errors.gender}

                            </p>

                        )}

                    </div>


                    <div className="form-group">

                        <label>

                            Date Of Birth
                            <span className="required-star">
                                *
                            </span>

                        </label>


                        <div className="input-with-icon">

    <FaCalendarAlt className="input-icon" />

    <input

        type="date"

        value={dob}

        onChange={
            handleDobChange
        }

        className={
            errors.dob
                ? "input-error"
                : ""
        }

    />

</div>


                        {errors.dob && (

                            <p className="error-text">

                                {errors.dob}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    AGE + MOBILE
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            Age

                        </label>
                        


                       <div className="input-with-icon">

    <FaBirthdayCake className="input-icon" />

    <input

        type="text"

        value={
            age
                ? `${age} Years`
                : ""
        }

        readOnly

    />

</div>


                        {errors.age && (

                            <p className="error-text">

                                {errors.age}

                            </p>

                        )}

                    </div>


                    <div className="form-group">

                        <label>

                            Mobile Number
                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaPhone className="input-icon" />

    <input

        type="text"

        maxLength={10}

        value={mobileNumber}

        onChange={(e) => {

            setMobileNumber(
                e.target.value.replace(
                    /[^0-9]/g,
                    ""
                )
            );

            setErrors({
                ...errors,
                mobileNumber: ""
            });

        }}

        className={
            errors.mobileNumber
                ? "input-error"
                : ""
        }

    />

</div>

                        {errors.mobileNumber && (

                            <p className="error-text">

                                {errors.mobileNumber}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    EMAIL + MARITAL STATUS
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            Email
                            <span className="required-star">
                                *
                            </span>

                        </label>


                       <div className="input-with-icon">

    <FaEnvelope className="input-icon" />

    <input

        type="email"

        value={email}

        onChange={(e) => {

            setEmail(
                e.target.value
            );

            setErrors({
                ...errors,
                email: ""
            });

        }}

        className={
            errors.email
                ? "input-error"
                : ""
        }

    />

</div>

                        {errors.email && (

                            <p className="error-text">

                                {errors.email}

                            </p>

                        )}

                    </div>


                    <div className="form-group">

                        <label>

                            Marital Status
                            <span className="required-star">
                                *
                            </span>

                        </label>


                       <div className="input-with-icon marital-select">

    <FaHeart className="input-icon" />

    <select

        value={maritalStatus}

        onChange={(e) => {

            setMaritalStatus(
                e.target.value
            );

            setErrors({
                ...errors,
                maritalStatus: ""
            });

        }}

        className={
            errors.maritalStatus
                ? "input-error"
                : ""
        }

    >
                            <option value="">

                                Select

                            </option>

                            <option>

                                Never Married

                            </option>

                            <option>

                                Divorced

                            </option>

                            <option>

                                Widowed

                            </option>

                        </select>
</div>

                        {errors.maritalStatus && (

                            <p className="error-text">

                                {errors.maritalStatus}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    HEIGHT + WEIGHT
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">
<label>

    Height
    <span className="required-star">
        *
    </span>

</label>


<div className="input-with-icon">

    <FaRulerVertical className="input-icon" />

    <input

        type="text"

        placeholder="Example: 165 cm"

        value={height}

        onChange={(e) => {

            setHeight(
                e.target.value
            );

            setErrors({
                ...errors,
                height: ""
            });

        }}

        className={
            errors.height
                ? "input-error"
                : ""
        }

    />

</div>


                        {errors.height && (

                            <p className="error-text">

                                {errors.height}

                            </p>

                        )}

                    </div>


                    <div className="form-group">

                        <label>

                            Weight
                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaWeight className="input-icon" />

    <input

        type="text"

        placeholder="Example: 60 kg"

        value={weight}

        onChange={(e) => {

            setWeight(
                e.target.value
            );

            setErrors({
                ...errors,
                weight: ""
            });

        }}

        className={
            errors.weight
                ? "input-error"
                : ""
        }

    />

</div>


                        {errors.weight && (

                            <p className="error-text">

                                {errors.weight}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    PROFILE PHOTO
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                        <label>

                            Profile Photo
                            <span className="required-star">
                                *
                            </span>

                        </label>

<div className="input-with-icon">

    <FaCamera className="input-icon" />

    <input

        type="file"

        accept=".jpg,.jpeg,.png"

        onChange={
            handleProfilePhoto
        }

        className={
            errors.profilePhoto
                ? "input-error"
                : ""
        }

    />

</div>


                        {profilePhoto && (

                            <img

                                src={profilePhoto}

                                alt="Profile Preview"

                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginTop: "10px",
                                    borderRadius: "10px"
                                }}

                            />

                        )}


                        {errors.profilePhoto && (

                            <p className="error-text">

                                {errors.profilePhoto}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    STEP
                ================================================= */}

                <div className="step-text">

                    Step 1 of 6

                </div>


                {/* =================================================
                    NEXT BUTTON
                ================================================= */}

                <div className="button-group-between">

                    <div></div>


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

export default BasicInformation;