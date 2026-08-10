import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaShieldAlt,
    FaMobileAlt,
    FaEnvelope,
    FaIdCard,
    FaAward,
    FaCalendarAlt,
    FaCheckCircle,
    FaArrowLeft,
    FaCheck
} from "react-icons/fa";
import "../styles/CompleteProfile.css";

function Verification({
    onPrevious
}) {

    const navigate = useNavigate();

    /*
    =========================================================
    STATE
    =========================================================
    */

    const [mobileNumber, setMobileNumber] = useState("");

    const [email, setEmail] = useState("");

    const [mobileStatus, setMobileStatus] =
        useState("Not Verified");

    const [emailStatus, setEmailStatus] =
        useState("Not Verified");

    const [idProof, setIdProof] =
        useState(null);

    const [mobileOtp, setMobileOtp] =
        useState("");

    const [emailOtp, setEmailOtp] =
        useState("");

    const [enteredMobileOtp, setEnteredMobileOtp] =
        useState("");

    const [enteredEmailOtp, setEnteredEmailOtp] =
        useState("");

    const [showMobileOtp, setShowMobileOtp] =
        useState(false);

    const [showEmailOtp, setShowEmailOtp] =
        useState(false);

    const [errors, setErrors] =
        useState({});

    const [warningToast, setWarningToast] =
        useState("");

    const [successToast, setSuccessToast] =
        useState("");


    /*
    =========================================================
    LOAD SAVED PROFILE DATA
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


        /*
        LOAD MOBILE
        */

        setMobileNumber(
            savedProfile.mobileNumber || ""
        );


        /*
        LOAD EMAIL
        */

        setEmail(
            savedProfile.email ||
            loggedInUser.email ||
            ""
        );


        /*
        LOAD MOBILE VERIFICATION STATUS
        */

        setMobileStatus(
            savedProfile.mobileStatus ||
            "Not Verified"
        );


        /*
        LOAD EMAIL VERIFICATION STATUS
        */

        setEmailStatus(
            savedProfile.emailStatus ||
            "Not Verified"
        );


        /*
        LOAD ID PROOF NAME
        */

        if (savedProfile.idProof) {

            setIdProof({
                name: savedProfile.idProof
            });

        }

    }, []);


    /*
    =========================================================
    GENERATE DEMO OTP
    =========================================================
    */

    const generateOtp = () => {

        return Math.floor(
            100000 +
            Math.random() * 900000
        ).toString();

    };


    /*
    =========================================================
    MOBILE OTP
    =========================================================
    */

    const sendMobileOtp = () => {

        if (
            !mobileNumber ||
            !/^[0-9]{10}$/.test(
                mobileNumber
            )
        ) {

            setErrors({

                ...errors,

                mobile:
                    "Please enter a valid 10-digit mobile number"

            });

            return;

        }


        const generatedOtp =
            generateOtp();


        setMobileOtp(
            generatedOtp
        );


        setShowMobileOtp(
            true
        );


        setErrors({

            ...errors,

            mobile: ""

        });


        /*
        =====================================================
        DEMO OTP IN CONSOLE
        =====================================================
        */

        console.log(
            "================================="
        );

        setWarningToast(
    "📱 Demo OTP sent! Please check the browser Console (F12)."
);

setTimeout(() => {
    setWarningToast("");
}, 3000);

        console.log(
            "📱 DEMO MOBILE OTP"
        );

        console.log(
            "Mobile Number:",
            mobileNumber
        );

        console.log(
            "OTP:",
            generatedOtp
        );

        console.log(
            "================================="
        );

    };


    /*
    =========================================================
    VERIFY MOBILE OTP
    =========================================================
    */

    const verifyMobileOtp = () => {

        if (!enteredMobileOtp) {

            setErrors({

                ...errors,

                mobileOtp:
                    "Please enter the OTP"

            });

            return;

        }


        if (
            enteredMobileOtp !==
            mobileOtp
        ) {

            setErrors({

                ...errors,

                mobileOtp:
                    "Invalid OTP. Please try again."

            });

            return;

        }


        setMobileStatus(
            "Verified"
        );


        setErrors({

            ...errors,

            mobileOtp: ""

        });


        console.log(
            "✅ Mobile number verified successfully"
        );

    };


    /*
    =========================================================
    EMAIL OTP
    =========================================================
    */

    const sendEmailOtp = () => {

        if (
            !email ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email
            )
        ) {

            setErrors({

                ...errors,

                email:
                    "Please enter a valid email address"

            });

            return;

        }


        const generatedOtp =
            generateOtp();


        setEmailOtp(
            generatedOtp
        );


        setShowEmailOtp(
            true
        );


        setErrors({

            ...errors,

            email: ""

        });


        /*
        =====================================================
        DEMO OTP IN CONSOLE
        =====================================================
        */

        console.log(
            "================================="
        );

        console.log(
            "📧 DEMO EMAIL OTP"
        );

        console.log(
            "Email:",
            email
        );

        console.log(
            "OTP:",
            generatedOtp
        );

        console.log(
            "================================="
        );
setWarningToast(
    "📧 Demo OTP sent! Please check the browser Console (F12)."
);

setTimeout(() => {
    setWarningToast("");
}, 3000);
    };


    /*
    =========================================================
    VERIFY EMAIL OTP
    =========================================================
    */

    const verifyEmailOtp = () => {

        if (!enteredEmailOtp) {

            setErrors({

                ...errors,

                emailOtp:
                    "Please enter the OTP"

            });

            return;

        }


        if (
            enteredEmailOtp !==
            emailOtp
        ) {

            setErrors({

                ...errors,

                emailOtp:
                    "Invalid OTP. Please try again."

            });

            return;

        }


        setEmailStatus(
            "Verified"
        );


        setErrors({

            ...errors,

            emailOtp: ""

        });


        console.log(
            "✅ Email verified successfully"
        );

    };


    /*
    =========================================================
    ID PROOF
    =========================================================
    */

    const handleIdProof = (e) => {

        const file =
            e.target.files[0];


        if (!file) {

            return;

        }


        setIdProof(
            file
        );


        setErrors({

            ...errors,

            idProof: ""

        });

    };


    /*
    =========================================================
    FINISH PROFILE
    =========================================================
    */

    const handleFinish = () => {

        const newErrors = {};


        /*
        MOBILE
        */

        if (
            mobileStatus !==
            "Verified"
        ) {

            newErrors.mobile =
                "Please verify your mobile number";

        }


        /*
        EMAIL
        */

        if (
            emailStatus !==
            "Verified"
        ) {

            newErrors.email =
                "Please verify your email";

        }


        /*
        ID PROOF
        */

        if (!idProof) {

            newErrors.idProof =
                "Please upload your ID proof";

        }


        setErrors(
            newErrors
        );


        /*
        =====================================================
        SHOW ERROR
        =====================================================
        */

        if (
            Object.keys(newErrors).length > 0
        ) {

            setWarningToast(

                "Please complete all verification requirements before finishing your profile."

            );


            setTimeout(() => {

                setWarningToast("");

            }, 3000);


            return;

        }


        /*
        =====================================================
        GET USER
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
        GET PROFILES
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
        SAVE VERIFICATION DATA
        =====================================================
        */

        allProfiles[currentUser] = {

            ...allProfiles[currentUser],

            mobileNumber,

            email,

            mobileStatus,

            emailStatus,

            verificationStatus:
                "Pending Verification",

            verifiedDate:
                "Not Verified",

            idProof:
                idProof.name

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
        SUCCESS MESSAGE
        =====================================================
        */

        setSuccessToast(

            "🎉 Profile Completed Successfully!"

        );


        /*
        =====================================================
        GO TO DASHBOARD
        =====================================================
        */

        setTimeout(() => {

            navigate(
                "/dashboard"
            );

        }, 1500);

    };


    /*
    =========================================================
    RENDER
    =========================================================
    */

    return (

        <div className="profile-page">


            {/* =================================================
                WARNING TOAST
            ================================================= */}

            {warningToast && (

                <div className="toast-warning">

                    {warningToast}

                </div>

            )}


            {/* =================================================
                SUCCESS TOAST
            ================================================= */}

            {successToast && (

                <div className="toast-success">

                    {successToast}

                </div>

            )}


            <div className="profile-card">


                {/* =================================================
                    TITLE
                ================================================= */}

                <h1 className="profile-title">

                    Complete Your Profile

                </h1>


                <p className="profile-subtitle">

                    Please complete your profile to continue.

                </p>


               <div className="section-heading">
<div className="section-heading-icon">
    <FaShieldAlt />
</div>

    <div>
        <h2>
            Verification
        </h2>

        <p>
            Verify your contact details and identity to complete your profile.
        </p>
    </div>

</div>


                {/* =================================================
                    MOBILE VERIFICATION
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                     <label>
    <FaMobileAlt className="field-icon" />
    Mobile Number
</label>


                        <input

                            type="text"

                            value={mobileNumber}

                            readOnly

                        />


                        <p>

                            Status:

                            {" "}

                            <strong>

                                {mobileStatus}

                            </strong>

                        </p>


                    </div>


                    <div className="form-group">

                        <label>

                            &nbsp;

                        </label>


                        {mobileStatus !==
                            "Verified" && (

                            <button

                                className="next-btn"

                                type="button"

                                onClick={
                                    sendMobileOtp
                                }

                            >

                                Send Mobile OTP

                            </button>

                        )}


                        {mobileStatus ===
                            "Verified" && (

                            <button

                                className="save-btn"

                                type="button"

                                disabled

                            >

                               <FaCheckCircle />
Mobile Verified

                            </button>

                        )}


                        {errors.mobile && (

                            <p className="error-text">

                                {errors.mobile}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    MOBILE OTP
                ================================================= */}

                {showMobileOtp &&
                    mobileStatus !==
                    "Verified" && (

                    <div className="form-row">

                        <div className="form-group">

                          <label>
    <FaShieldAlt className="field-icon" />
    Enter Mobile OTP
</label>


                            <input

                                type="text"

                                maxLength={6}

                                value={
                                    enteredMobileOtp
                                }

                                onChange={(e) => {

                                    setEnteredMobileOtp(

                                        e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        )

                                    );

                                    setErrors({

                                        ...errors,

                                        mobileOtp: ""

                                    });

                                }}

                                placeholder="Enter 6-digit OTP"

                                className={
                                    errors.mobileOtp
                                        ? "input-error"
                                        : ""
                                }

                            />


                            {errors.mobileOtp && (

                                <p className="error-text">

                                    {errors.mobileOtp}

                                </p>

                            )}

                        </div>


                        <div className="form-group">

                            <label>

                                &nbsp;

                            </label>


                            <button

                                className="next-btn"

                                type="button"

                                onClick={
                                    verifyMobileOtp
                                }

                            >

                                Verify OTP

                            </button>

                        </div>

                    </div>

                )}


                {/* =================================================
                    EMAIL VERIFICATION
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                      <label>
    <FaEnvelope className="field-icon" />
    Email
</label>


                        <input

                            type="text"

                            value={email}

                            readOnly

                        />


                        <p>

                            Status:

                            {" "}

                            <strong>

                                {emailStatus}

                            </strong>

                        </p>

                    </div>


                    <div className="form-group">

                        <label>

                            &nbsp;

                        </label>


                        {emailStatus !==
                            "Verified" && (

                            <button

                                className="next-btn"

                                type="button"

                                onClick={
                                    sendEmailOtp
                                }

                            >

                                Send Email OTP

                            </button>

                        )}


                        {emailStatus ===
                            "Verified" && (

                            <button

                                className="save-btn"

                                type="button"

                                disabled

                            >

                               <FaCheckCircle />
Email Verified

                            </button>

                        )}


                        {errors.email && (

                            <p className="error-text">

                                {errors.email}

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    EMAIL OTP
                ================================================= */}

                {showEmailOtp &&
                    emailStatus !==
                    "Verified" && (

                    <div className="form-row">

                        <div className="form-group">
<label>
    <FaShieldAlt className="field-icon" />
    Enter Email OTP
</label>
                            <input

                                type="text"

                                maxLength={6}

                                value={
                                    enteredEmailOtp
                                }

                                onChange={(e) => {

                                    setEnteredEmailOtp(

                                        e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        )

                                    );

                                    setErrors({

                                        ...errors,

                                        emailOtp: ""

                                    });

                                }}

                                placeholder="Enter 6-digit OTP"

                                className={
                                    errors.emailOtp
                                        ? "input-error"
                                        : ""
                                }

                            />


                            {errors.emailOtp && (

                                <p className="error-text">

                                    {errors.emailOtp}

                                </p>

                            )}

                        </div>


                        <div className="form-group">

                            <label>

                                &nbsp;

                            </label>


                            <button

                                className="next-btn"

                                type="button"

                                onClick={
                                    verifyEmailOtp
                                }

                            >

                                Verify OTP

                            </button>

                        </div>

                    </div>

                )}


                {/* =================================================
                    ID PROOF
                ================================================= */}

                <div className="form-row">


                    <div className="form-group">

                    <label>

    <FaIdCard className="field-icon" />

    ID Proof

    <span className="required-star">
        *
    </span>

</label>


                        <input

                            type="file"

                            accept=".jpg,.jpeg,.png,.pdf"

                            onChange={
                                handleIdProof
                            }

                            className={
                                errors.idProof
                                    ? "input-error"
                                    : ""
                            }

                        />


                        {idProof && (

                            <p>

                                Selected:

                                {" "}

                                {idProof.name}

                            </p>

                        )}


                        {errors.idProof && (

                            <p className="error-text">

                                {errors.idProof}

                            </p>

                        )}

                    </div>


                    <div className="form-group">

                     <label>
    <FaAward className="field-icon" />
    Verification Badge
</label>

                        <input

                            type="text"

                            value="Pending Verification"

                            readOnly

                        />

                    </div>

                </div>


                {/* =================================================
                    VERIFIED DATE
                ================================================= */}

                <div className="form-row">

                    <div className="form-group">

                    <label>
    <FaCalendarAlt className="field-icon" />
    Verified Date
</label>


                        <input

                            type="text"

                            value="Not Verified"

                            readOnly

                        />

                    </div>

                </div>


                {/* =================================================
                    STEP
                ================================================= */}

                <div className="step-text">

                    Step 7 of 7

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
    <FaArrowLeft />
    Previous
</button>

                   <button
    className="save-btn"
    type="button"
    onClick={handleFinish}
>
    Finish
    <FaCheck />
</button>


                </div>


            </div>

        </div>

    );

}


export default Verification;