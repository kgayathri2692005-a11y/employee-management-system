import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompleteProfile.css";

function Verification() {

    const navigate = useNavigate();
    const [mobileStatus, setMobileStatus] = useState("Not Verified");
const [emailStatus, setEmailStatus] = useState("Not Verified");
const [idProof, setIdProof] = useState(null);

const [errors, setErrors] = useState({});
const [warningToast, setWarningToast] = useState("");
const [successToast, setSuccessToast] = useState("");

const handleFinish = () => {

    const newErrors = {};

    if (!idProof) {
        newErrors.idProof = "Please upload your ID Proof";
    }

    if (mobileStatus !== "Verified") {
    newErrors.mobile = "Please verify your mobile number";
}

if (emailStatus !== "Verified") {
    newErrors.email = "Please verify your email";
}

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {

        setWarningToast(
            "Please upload your ID proof before completing your profile."
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

        mobileStatus,
        emailStatus,
        verificationStatus: "Pending Verification",
        verifiedDate: "Not Verified",
        idProof: idProof.name
    };

    localStorage.setItem(
        "allProfiles",
        JSON.stringify(allProfiles)
    );

    setSuccessToast("🎉 Profile Completed Successfully!");

    setTimeout(() => {
        navigate("/dashboard");
    }, 1500);
};

const verifyMobile = () => {

    setMobileStatus("Verified");

};

const verifyEmail = () => {

    setEmailStatus("Verified");

};

    return (

        <div className="profile-page">
            {warningToast && (
    <div className="toast-warning">
        {warningToast}
    </div>
)}

{successToast && (
    <div className="toast-success">
        {successToast}
    </div>
)}

            <div className="profile-card">

                <h1 className="profile-title">
                    Complete Your Profile
                </h1>

                <p className="profile-subtitle">
                    Please complete your profile to continue.
                </p>

                <h2>Verification</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Mobile Verification</label>
                        <input
                            type="text"
                            value={mobileStatus}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>&nbsp;</label>

                        <button
                            className="next-btn"
                            type="button"
                             onClick={verifyMobile}
                        >
                            Verify Mobile
                        </button>

                        {errors.mobile && (
    <p className="error-text">
        {errors.mobile}
    </p>
)}

                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Email Verification</label>
                        <input
                            type="text"
                            value={emailStatus}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>&nbsp;</label>

                        <button
    className="next-btn"
    type="button"
    onClick={verifyEmail}
>
    Verify Email
</button>

{errors.email && (
    <p className="error-text">
        {errors.email}
    </p>
)}

                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>ID Proof</label>
                        <input
    type="file"
    accept=".jpg,.jpeg,.png,.pdf"
    onChange={(e) => {

        setIdProof(e.target.files[0]);

        setErrors({
            ...errors,
            idProof: ""
        });

    }}
    className={errors.idProof ? "input-error" : ""}
/>

{errors.idProof && (
    <p className="error-text">
        {errors.idProof}
    </p>
)}
                    </div>

                    <div className="form-group">
                        <label>Verification Badge</label>
                        <input
                            type="text"
                            value="Pending Verification"
                            readOnly
                        />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Verified Date</label>
                        <input
                            type="text"
                            value="Not Verified"
                            readOnly
                        />
                    </div>

                </div>

                <div className="step-text">
                    Step 6 of 6
                </div>

                <div className="button-group-between">

                    <button
                        className="previous-btn"
                        onClick={() =>
                            navigate("/complete-profile/partner")
                        }
                    >
                        ← Previous
                    </button>

                    <button
                        className="save-btn"
                        onClick={handleFinish}
                    >
                        Finish
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Verification;