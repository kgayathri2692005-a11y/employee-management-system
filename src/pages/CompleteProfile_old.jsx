import { useEffect, useState } from "react";
import "../styles/CompleteProfile.css";

function CompleteProfile() {

    /* =========================================================
       CURRENT USER
    ========================================================= */

    const getCurrentUser = () => {
        const loggedInUser =
            JSON.parse(localStorage.getItem("loggedInUser")) || {};

        return loggedInUser.email || "";
    };


    /* =========================================================
       INITIAL PROFILE DATA
    ========================================================= */

    const initialProfileData = {

        // =========================
        // STEP 1 - BASIC INFORMATION
        // =========================

        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        age: "",
        mobileNumber: "",
        email: "",
        maritalStatus: "",
        height: "",
        weight: "",
        profileImage: "",


        // =========================
        // STEP 2 - RELIGION & IDENTITY
        // =========================

        religion: "",
        caste: "",
        subCaste: "",
        motherTongue: "",
        nationality: "",

        currentAddress: "",
        currentCity: "",
        currentState: "",
        currentCountry: "",

        sameAddress: false,

        permanentAddress: "",
        permanentCity: "",
        permanentState: "",
        permanentCountry: "",


        // =========================
        // STEP 3 - EDUCATION & CAREER
        // =========================

        qualification: "",
        college: "",
        occupation: "",
        company: "",
        income: "",
        workLocation: "",


        // =========================
        // STEP 4 - FAMILY & LIFESTYLE
        // =========================

        fatherName: "",
        motherName: "",
        siblings: "",
        familyType: "",
        foodPreference: "",
        smokingHabit: "",
        drinkingHabit: "",
        hobbies: "",


        // =========================
        // STEP 5 - PARTNER PREFERENCE
        // =========================

        partnerAgeFrom: "",
        partnerAgeTo: "",
        partnerReligion: "",
        partnerEducation: "",
        partnerOccupation: "",
        partnerCountry: "",


        // =========================
        // STEP 6 - PHOTOS
        // =========================

        profilePhoto: "",
        additionalPhotos: [],


        // =========================
        // STEP 7 - VERIFICATION
        // =========================

        mobileStatus: "Not Verified",
        emailStatus: "Not Verified",

        mobileOtpSent: false,
        emailOtpSent: false,

        idProof: "",
        verificationStatus: "Pending Verification",
        verifiedDate: "Not Verified",

        profileCompleted: false
    };


    /* =========================================================
       STATES
    ========================================================= */

    const [step, setStep] = useState(1);

    const [profileData, setProfileData] =
        useState(initialProfileData);

    const [errors, setErrors] = useState({});

    const [warningToast, setWarningToast] =
        useState("");

    const [successToast, setSuccessToast] =
        useState("");

    const [mobileOtp, setMobileOtp] =
        useState("");

    const [emailOtp, setEmailOtp] =
        useState("");

    const [generatedMobileOtp, setGeneratedMobileOtp] =
        useState("");

    const [generatedEmailOtp, setGeneratedEmailOtp] =
        useState("");


    /* =========================================================
       LOAD CURRENT USER PROFILE
    ========================================================= */

    useEffect(() => {

        const currentUser = getCurrentUser();

        if (!currentUser) {
            return;
        }

        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};

        const savedProfile =
            allProfiles[currentUser];

        // If profile is already completed,
        // do not allow Complete Profile again.
        if (
            savedProfile &&
            savedProfile.profileCompleted === true
        ) {
            window.location.href = "/dashboard";
            return;
        }


        // Load saved progress for THIS USER
        if (savedProfile) {

            setProfileData(prev => ({
                ...prev,
                ...savedProfile
            }));

        } else {

            // Automatically fill email from logged-in user
            setProfileData(prev => ({
                ...prev,
                email: currentUser
            }));

        }

    }, []);


    /* =========================================================
       COMMON INPUT HANDLER
    ========================================================= */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));

        // Remove error when user starts correcting field
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };


    /* =========================================================
       CALCULATE AGE FROM DOB
    ========================================================= */

    const calculateAge = (dob) => {

        if (!dob) {
            return "";
        }

        const birthDate =
            new Date(dob);

        const today =
            new Date();

        let age =
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
            age--;
        }

        return age;
    };


    /* =========================================================
       DOB CHANGE
    ========================================================= */

    const handleDobChange = (e) => {

        const dob =
            e.target.value;

        const age =
            calculateAge(dob);

        setProfileData(prev => ({
            ...prev,
            dob,
            age
        }));

        setErrors(prev => ({
            ...prev,
            dob: "",
            age: ""
        }));
    };


    /* =========================================================
       TOAST
    ========================================================= */

    const showWarning = (message) => {

        setWarningToast(message);

        setTimeout(() => {
            setWarningToast("");
        }, 3000);
    };


    /* =========================================================
       SAVE PROGRESS FOR CURRENT USER
    ========================================================= */

    const saveProgress = (data = profileData) => {

        const currentUser =
            getCurrentUser();

        if (!currentUser) {
            return;
        }

        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};


        allProfiles[currentUser] = {
            ...allProfiles[currentUser],
            ...data,
            profileCompleted: false
        };


        localStorage.setItem(
            "allProfiles",
            JSON.stringify(allProfiles)
        );
    };


    /* =========================================================
       STEP 1 VALIDATION
    ========================================================= */

    const validateStep1 = () => {

        const newErrors = {};


        // First Name
        if (
            !profileData.firstName.trim() ||
            profileData.firstName.trim().length < 3
        ) {

            newErrors.firstName =
                "First Name must contain at least 3 characters";
        }


        // Last Name
        if (
            !profileData.lastName.trim() ||
            profileData.lastName.trim().length < 2
        ) {

            newErrors.lastName =
                "Last Name must contain at least 2 characters";
        }


        // Gender
        if (!profileData.gender) {

            newErrors.gender =
                "Please select Gender";
        }


        // DOB
        // Age Restriction - User must be 18 or older
if (!profileData.dob) {

    newErrors.dob =
        "Date Of Birth is required";

} else {

    const birthDate =
        new Date(profileData.dob);

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

    if (calculatedAge < 18) {

        newErrors.dob =
            "You must be at least 18 years old to use this matrimony application";

    }
}


        // Mobile
        if (
            !profileData.mobileNumber ||
            !/^[0-9]{10}$/.test(
                profileData.mobileNumber
            )
        ) {

            newErrors.mobileNumber =
                "Enter a valid 10-digit mobile number";
        }


        // Email
        if (
            !profileData.email ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                profileData.email
            )
        ) {

            newErrors.email =
                "Enter a valid email address";
        }


        // Marital Status
        if (!profileData.maritalStatus) {

            newErrors.maritalStatus =
                "Please select Marital Status";
        }


        // Height
        if (
            !profileData.height ||
            isNaN(profileData.height)
        ) {

            newErrors.height =
                "Enter a valid height";
        }


        // Weight
        if (
            !profileData.weight ||
            isNaN(profileData.weight)
        ) {

            newErrors.weight =
                "Enter a valid weight";
        }


        // Profile Photo
        if (!profileData.profilePhoto) {

            newErrors.profilePhoto =
                "Please upload a profile picture";
        }


        return newErrors;
    };


    /* =========================================================
       STEP 2 VALIDATION
    ========================================================= */

    const validateStep2 = () => {

        const newErrors = {};


        if (!profileData.religion) {

            newErrors.religion =
                "Please select Religion";
        }


        if (!profileData.caste.trim()) {

            newErrors.caste =
                "Please enter Caste";
        }


        if (!profileData.motherTongue) {

            newErrors.motherTongue =
                "Please select Mother Tongue";
        }


        if (!profileData.nationality) {

            newErrors.nationality =
                "Please select Nationality";
        }


        if (!profileData.currentAddress.trim()) {

            newErrors.currentAddress =
                "Current Address is required";
        }


        if (!profileData.currentCity.trim()) {

            newErrors.currentCity =
                "Current City is required";
        }


        if (!profileData.currentState) {

            newErrors.currentState =
                "Please select Current State";
        }


        if (!profileData.currentCountry) {

            newErrors.currentCountry =
                "Please select Current Country";
        }


        // Permanent Address validation
        // only when Same Address is NOT checked

        if (!profileData.sameAddress) {

            if (
                !profileData.permanentAddress.trim()
            ) {

                newErrors.permanentAddress =
                    "Permanent Address is required";
            }


            if (
                !profileData.permanentCity.trim()
            ) {

                newErrors.permanentCity =
                    "Permanent City is required";
            }


            if (
                !profileData.permanentState
            ) {

                newErrors.permanentState =
                    "Please select Permanent State";
            }


            if (
                !profileData.permanentCountry
            ) {

                newErrors.permanentCountry =
                    "Please select Permanent Country";
            }
        }


        return newErrors;
    };


    /* =========================================================
       STEP 3 VALIDATION
    ========================================================= */

    const validateStep3 = () => {

        const newErrors = {};


        if (
            !profileData.qualification.trim()
        ) {

            newErrors.qualification =
                "Please enter Qualification";
        }


        if (!profileData.college.trim()) {

            newErrors.college =
                "Please enter College / University";
        }


        if (
            !profileData.occupation.trim()
        ) {

            newErrors.occupation =
                "Please enter Occupation";
        }


        if (
            !profileData.income ||
            !/^[0-9]+$/.test(
                profileData.income
            )
        ) {

            newErrors.income =
                "Please enter a valid Annual Income";
        }


        return newErrors;
    };


    /* =========================================================
       STEP 4 VALIDATION
    ========================================================= */

    const validateStep4 = () => {

        const newErrors = {};


        if (
            !profileData.fatherName.trim()
        ) {

            newErrors.fatherName =
                "Please enter Father Name";
        }


        if (
            !profileData.motherName.trim()
        ) {

            newErrors.motherName =
                "Please enter Mother Name";
        }


        if (
            !profileData.siblings ||
            !/^[0-9]+$/.test(
                profileData.siblings
            )
        ) {

            newErrors.siblings =
                "Please enter Number of Siblings";
        }


        if (!profileData.familyType) {

            newErrors.familyType =
                "Please select Family Type";
        }


        if (!profileData.foodPreference) {

            newErrors.foodPreference =
                "Please select Food Preference";
        }


        if (!profileData.smokingHabit) {

            newErrors.smokingHabit =
                "Please select Smoking Habit";
        }


        if (!profileData.drinkingHabit) {

            newErrors.drinkingHabit =
                "Please select Drinking Habit";
        }


        return newErrors;
    };


    /* =========================================================
       STEP 5 VALIDATION
    ========================================================= */

    const validateStep5 = () => {

        const newErrors = {};


        if (
            !profileData.partnerAgeFrom
        ) {

            newErrors.partnerAgeFrom =
                "Enter minimum preferred age";
        }


        if (
            !profileData.partnerAgeTo
        ) {

            newErrors.partnerAgeTo =
                "Enter maximum preferred age";
        }


        if (
            profileData.partnerAgeFrom &&
            profileData.partnerAgeTo &&
            Number(
                profileData.partnerAgeFrom
            ) >
            Number(
                profileData.partnerAgeTo
            )
        ) {

            newErrors.partnerAgeTo =
                "Maximum age must be greater than minimum age";
        }


        if (
            !profileData.partnerEducation.trim()
        ) {

            newErrors.partnerEducation =
                "Please enter Preferred Education";
        }


        if (
            !profileData.partnerOccupation.trim()
        ) {

            newErrors.partnerOccupation =
                "Please enter Preferred Occupation";
        }


        if (
            !profileData.partnerCountry.trim()
        ) {

            newErrors.partnerCountry =
                "Please enter Preferred Location";
        }


        if (
            !profileData.partnerReligion.trim()
        ) {

            newErrors.partnerReligion =
                "Please enter Preferred Religion / Community";
        }


        return newErrors;
    };


    /* =========================================================
       STEP 6 VALIDATION
    ========================================================= */

    const validateStep6 = () => {

        const newErrors = {};


        if (!profileData.profilePhoto) {

            newErrors.profilePhoto =
                "Please select a Profile Photo";
        }


        return newErrors;
    };


    /* =========================================================
       STEP 7 VALIDATION
    ========================================================= */

    const validateStep7 = () => {

        const newErrors = {};


        if (
            profileData.mobileStatus !==
            "Verified"
        ) {

            newErrors.mobile =
                "Please verify your mobile number";
        }


        if (
            profileData.emailStatus !==
            "Verified"
        ) {

            newErrors.email =
                "Please verify your email";
        }


        if (!profileData.idProof) {

            newErrors.idProof =
                "Please upload your ID Proof";
        }


        return newErrors;
    };


    /* =========================================================
       VALIDATE CURRENT STEP
    ========================================================= */

    const validateCurrentStep = () => {

        let newErrors = {};


        if (step === 1) {

            newErrors =
                validateStep1();

        } else if (step === 2) {

            newErrors =
                validateStep2();

        } else if (step === 3) {

            newErrors =
                validateStep3();

        } else if (step === 4) {

            newErrors =
                validateStep4();

        } else if (step === 5) {

            newErrors =
                validateStep5();

        } else if (step === 6) {

            newErrors =
                validateStep6();

        } else if (step === 7) {

            newErrors =
                validateStep7();
        }


        setErrors(newErrors);


        if (
            Object.keys(newErrors).length > 0
        ) {

            showWarning(
                "Please complete all required fields before continuing."
            );

            return false;
        }


        return true;
    };


    /* =========================================================
       NEXT
    ========================================================= */

    const handleNext = () => {

        if (
            !validateCurrentStep()
        ) {
            return;
        }


        // Save current progress
        saveProgress();


        if (step < 7) {

            setStep(prev => prev + 1);

        }

    };


    /* =========================================================
       PREVIOUS
    ========================================================= */

    const handlePrevious = () => {

        // Save current progress
        saveProgress();


        if (step > 1) {

            setStep(prev => prev - 1);

        }

    };


    /* =========================================================
       SAME ADDRESS
    ========================================================= */

    const handleSameAddress = (
        checked
    ) => {

        if (checked) {

            setProfileData(prev => ({

                ...prev,

                sameAddress: true,

                permanentAddress:
                    prev.currentAddress,

                permanentCity:
                    prev.currentCity,

                permanentState:
                    prev.currentState,

                permanentCountry:
                    prev.currentCountry

            }));

        } else {

            setProfileData(prev => ({

                ...prev,

                sameAddress: false,

                permanentAddress: "",
                permanentCity: "",
                permanentState: "",
                permanentCountry: ""

            }));

        }

    };


    /* =========================================================
       PROFILE PHOTO
    ========================================================= */

    const handleProfilePhoto = (
        e
    ) => {

        const file =
            e.target.files[0];

        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            showWarning(
                "Please select a valid image file."
            );

            return;
        }


        const reader =
            new FileReader();


        reader.onload = () => {

            setProfileData(prev => ({

                ...prev,

                profilePhoto:
                    reader.result,

                profileImage:
                    reader.result

            }));


            setErrors(prev => ({

                ...prev,

                profilePhoto: ""

            }));

        };


        reader.readAsDataURL(file);

    };


    /* =========================================================
       COMPRESS IMAGE
    ========================================================= */

    const compressImage = (
        file,
        maxWidth = 800,
        quality = 0.7
    ) => {

        return new Promise(
            (resolve, reject) => {

                const reader =
                    new FileReader();


                reader.onload = (
                    event
                ) => {

                    const img =
                        new Image();


                    img.onload = () => {

                        let width =
                            img.width;

                        let height =
                            img.height;


                        if (
                            width >
                            maxWidth
                        ) {

                            height =
                                (
                                    height *
                                    maxWidth
                                ) /
                                width;

                            width =
                                maxWidth;
                        }


                        const canvas =
                            document.createElement(
                                "canvas"
                            );


                        canvas.width =
                            width;

                        canvas.height =
                            height;


                        const ctx =
                            canvas.getContext(
                                "2d"
                            );


                        ctx.drawImage(

                            img,

                            0,

                            0,

                            width,

                            height

                        );


                        const compressed =
                            canvas.toDataURL(
                                "image/jpeg",
                                quality
                            );


                        resolve(
                            compressed
                        );

                    };


                    img.onerror =
                        reject;


                    img.src =
                        event.target.result;

                };


                reader.onerror =
                    reject;


                reader.readAsDataURL(
                    file
                );

            }
        );

    };


    /* =========================================================
       ADDITIONAL PHOTOS
       MAXIMUM 4
    ========================================================= */

    const handleAdditionalPhotos = async (
        e
    ) => {

        const files =
            Array.from(
                e.target.files
            );


        if (!files.length) {
            return;
        }


        const existingPhotos =
            profileData.additionalPhotos ||
            [];


        const remainingSlots =
            4 -
            existingPhotos.length;


        if (remainingSlots <= 0) {

            showWarning(
                "Maximum 4 additional photos are allowed."
            );

            e.target.value = "";

            return;
        }


        if (
            files.length >
            remainingSlots
        ) {

            showWarning(
                `You can add only ${remainingSlots} more photo(s). Maximum 4 additional photos are allowed.`
            );

            e.target.value = "";

            return;
        }


        try {

            const compressedPhotos =
                await Promise.all(

                    files.map(file => {

                        if (
                            !file.type.startsWith(
                                "image/"
                            )
                        ) {

                            return null;
                        }

                        return compressImage(
                            file
                        );

                    })

                );


            const validPhotos =
                compressedPhotos.filter(
                    photo => photo !== null
                );


            setProfileData(prev => ({

                ...prev,

                additionalPhotos: [

                    ...prev.additionalPhotos,

                    ...validPhotos

                ]

            }));


        } catch (error) {

            console.error(
                "Photo compression error:",
                error
            );

            showWarning(
                "Unable to process selected photos."
            );

        }


        e.target.value = "";

    };


    /* =========================================================
       REMOVE ADDITIONAL PHOTO
    ========================================================= */

    const removeAdditionalPhoto = (
        index
    ) => {

        setProfileData(prev => ({

            ...prev,

            additionalPhotos:
                prev.additionalPhotos.filter(
                    (_, i) =>
                        i !== index
                )

        }));

    };


    /* =========================================================
       SET ADDITIONAL PHOTO AS PROFILE PHOTO
    ========================================================= */

    const setAsProfilePhoto = (
        photo
    ) => {

        setProfileData(prev => ({

            ...prev,

            profilePhoto:
                photo,

            profileImage:
                photo

        }));

        setErrors(prev => ({

            ...prev,

            profilePhoto: ""

        }));

    };


    /* =========================================================
       MOBILE OTP
       FRONTEND DEMO ONLY
    ========================================================= */

    const sendMobileOtp = () => {

        if (
            !/^[0-9]{10}$/.test(
                profileData.mobileNumber
            )
        ) {

            setErrors(prev => ({

                ...prev,

                mobileNumber:
                    "Enter a valid 10-digit mobile number"

            }));

            showWarning(
                "Enter a valid mobile number first."
            );

            return;
        }


        const otp =
            Math.floor(
                100000 +
                Math.random() *
                900000
            ).toString();


        setGeneratedMobileOtp(
            otp
        );


        setProfileData(prev => ({

            ...prev,

            mobileOtpSent:
                true

        }));


        // Demo only
        console.log(
            "Demo Mobile OTP:",
            otp
        );


        showWarning(
            "Demo OTP generated. Check Console."
        );

    };


    /* =========================================================
       VERIFY MOBILE OTP
    ========================================================= */

    const verifyMobileOtp = () => {

        if (
            mobileOtp !==
            generatedMobileOtp ||
            !mobileOtp
        ) {

            showWarning(
                "Invalid Mobile OTP."
            );

            return;
        }


        setProfileData(prev => ({

            ...prev,

            mobileStatus:
                "Verified"

        }));


        setErrors(prev => ({

            ...prev,

            mobile: ""

        }));


        setMobileOtp("");

    };


    /* =========================================================
       EMAIL OTP
       FRONTEND DEMO ONLY
    ========================================================= */

    const sendEmailOtp = () => {

        if (
            !profileData.email
        ) {

            setErrors(prev => ({

                ...prev,

                email:
                    "Email is required"

            }));

            showWarning(
                "Enter your email first."
            );

            return;
        }


        const otp =
            Math.floor(
                100000 +
                Math.random() *
                900000
            ).toString();


        setGeneratedEmailOtp(
            otp
        );


        setProfileData(prev => ({

            ...prev,

            emailOtpSent:
                true

        }));


        // Demo only
        console.log(
            "Demo Email OTP:",
            otp
        );


        showWarning(
            "Demo OTP generated. Check Console."
        );

    };


    /* =========================================================
       VERIFY EMAIL OTP
    ========================================================= */

    const verifyEmailOtp = () => {

        if (
            emailOtp !==
            generatedEmailOtp ||
            !emailOtp
        ) {

            showWarning(
                "Invalid Email OTP."
            );

            return;
        }


        setProfileData(prev => ({

            ...prev,

            emailStatus:
                "Verified"

        }));


        setErrors(prev => ({

            ...prev,

            email: ""

        }));


        setEmailOtp("");

    };


    /* =========================================================
       ID PROOF
    ========================================================= */

    const handleIdProof = (
        e
    ) => {

        const file =
            e.target.files[0];

        if (!file) {
            return;
        }


        const allowedTypes = [

            "image/jpeg",

            "image/png",

            "application/pdf"

        ];


        if (
            !allowedTypes.includes(
                file.type
            )
        ) {

            showWarning(
                "Please upload JPG, PNG or PDF only."
            );

            return;
        }


        setProfileData(prev => ({

            ...prev,

            idProof:
                file.name

        }));


        setErrors(prev => ({

            ...prev,

            idProof: ""

        }));

    };


    /* =========================================================
       COMPLETE PROFILE
    ========================================================= */

    const handleCompleteProfile = () => {

        if (
            !validateCurrentStep()
        ) {
            return;
        }


        const currentUser =
            getCurrentUser();


        if (!currentUser) {

            showWarning(
                "Unable to identify logged-in user."
            );

            return;
        }


        const allProfiles =
            JSON.parse(
                localStorage.getItem(
                    "allProfiles"
                )
            ) || {};


        const finalProfileData = {

            ...profileData,

            profileCompleted:
                true

        };


        allProfiles[currentUser] =
            finalProfileData;


        localStorage.setItem(

            "allProfiles",

            JSON.stringify(
                allProfiles
            )

        );


        // For verification
        console.log(
            "COMPLETE PROFILE DATA:",
            finalProfileData
        );


        setSuccessToast(
            "Profile Completed Successfully"
        );


        setTimeout(() => {

            window.location.href =
                "/dashboard";

        }, 1500);

    };


    /* =========================================================
       ERROR COMPONENT
    ========================================================= */

    const ErrorMessage = ({
        field
    }) => {

        if (!errors[field]) {
            return null;
        }

        return (

            <p className="error-text">

                {errors[field]}

            </p>

        );

    };


    /* =========================================================
       STEP 1
    ========================================================= */

    const renderStep1 = () => (

        <>

            <h2>Basic Information</h2>


            <div className="form-row">

                <div className="form-group">

<label>
  First Name <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="firstName"
                        value={
                            profileData.firstName
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^a-zA-Z\s]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "firstName",

                                    value

                                }

                            });

                        }}
                        className={
                            errors.firstName
                                ? "input-error"
                                : ""
                        }
                    />

                    <ErrorMessage
                        field="firstName"
                    />

                </div>


                <div className="form-group">

<label>
  Last Name <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="lastName"
                        value={
                            profileData.lastName
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^a-zA-Z\s]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "lastName",

                                    value

                                }

                            });

                        }}
                        className={
                            errors.lastName
                                ? "input-error"
                                : ""
                        }
                    />

                    <ErrorMessage
                        field="lastName"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Gender <span className="required-star">*</span>
</label>

                    <select
                        name="gender"
                        value={
                            profileData.gender
                        }
                        onChange={
                            handleChange
                        }
                        className={
                            errors.gender
                                ? "input-error"
                                : ""
                        }
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                    <ErrorMessage
                        field="gender"
                    />

                </div>


                <div className="form-group">

<label>
  Date Of Birth <span className="required-star">*</span>
</label>

                    <input
                        type="date"
                        value={
                            profileData.dob
                        }
                        onChange={
                            handleDobChange
                        }
                        className={
                            errors.dob
                                ? "input-error"
                                : ""
                        }
                    />

                    <ErrorMessage
                        field="dob"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

                   <label>
  Age <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        value={
                            profileData.age
                        }
                        readOnly
                    />

                    <ErrorMessage
                        field="age"
                    />

                </div>


                <div className="form-group">

<label>
 Mobile Number<span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        maxLength={10}
                        value={
                            profileData.mobileNumber
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "mobileNumber",

                                    value

                                }

                            });

                        }}
                        className={
                            errors.mobileNumber
                                ? "input-error"
                                : ""
                        }
                    />

                    <ErrorMessage
                        field="mobileNumber"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Email <span className="required-star">*</span>
</label>

                    <input
                        type="email"
                        name="email"
                        value={
                            profileData.email
                        }
                        onChange={
                            handleChange
                        }
                        className={
                            errors.email
                                ? "input-error"
                                : ""
                        }
                    />

                    <ErrorMessage
                        field="email"
                    />

                </div>


                <div className="form-group">

                    <label>
  Marital Status <span className="required-star">*</span>
</label>

                    <select
                        name="maritalStatus"
                        value={
                            profileData.maritalStatus
                        }
                        onChange={
                            handleChange
                        }
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

                        <option>
                            Separated
                        </option>

                    </select>

                    <ErrorMessage
                        field="maritalStatus"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

                    <label>
  Height (cm) <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        value={
                            profileData.height
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "height",

                                    value

                                }

                            });

                        }}
                        className={
                            errors.height
                                ? "input-error"
                                : ""
                        }
                    />

                    <ErrorMessage
                        field="height"
                    />

                </div>


                <div className="form-group">

<label>
  Weight (kg) <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        value={
                            profileData.weight
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "weight",

                                    value

                                }

                            });

                        }}
                        className={
                            errors.weight
                                ? "input-error"
                                : ""
                        }
                    />

                    <ErrorMessage
                        field="weight"
                    />

                </div>

            </div>


            <div className="form-group">

                <label>
  Profile Photo <span className="required-star">*</span>
</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={
                        handleProfilePhoto
                    }
                    className={
                        errors.profilePhoto
                            ? "input-error"
                            : ""
                    }
                />

                <ErrorMessage
                    field="profilePhoto"
                />


                {profileData.profilePhoto && (

                    <div>

                        <img
                            src={
                                profileData.profilePhoto
                            }
                            alt="Profile"
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                marginTop: "10px",
                                borderRadius: "10px"
                            }}
                        />

                    </div>

                )}

            </div>

        </>

    );


    /* =========================================================
       STEP 2
    ========================================================= */

    const renderStep2 = () => (

        <>

            <h2>
                Religion & Identity
            </h2>


            <div className="form-row">

                <div className="form-group">

<label>
  Religion <span className="required-star">*</span>
</label>

                    <select
                        name="religion"
                        value={
                            profileData.religion
                        }
                        onChange={
                            handleChange
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
                            Jain
                        </option>

                        <option>
                            Buddhist
                        </option>

                        <option>
                            Other
                        </option>

                    </select>

                    <ErrorMessage
                        field="religion"
                    />

                </div>


                <div className="form-group">

<label>
  Caste <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="caste"
                        value={
                            profileData.caste
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="caste"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Sub Caste 
</label>

                    <input
                        type="text"
                        name="subCaste"
                        value={
                            profileData.subCaste
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>


                <div className="form-group">

<label>
  Mother Tongue <span className="required-star">*</span>
</label>

                    <select
                        name="motherTongue"
                        value={
                            profileData.motherTongue
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            Select Mother Tongue
                        </option>

                        <option>
                            Kannada
                        </option>

                        <option>
                            English
                        </option>

                        <option>
                            Hindi
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
                            Marathi
                        </option>

                        <option>
                            Other
                        </option>

                    </select>

                    <ErrorMessage
                        field="motherTongue"
                    />

                </div>

            </div>


            <div className="form-group">

<label>
  Nationality <span className="required-star">*</span>
</label>

                <select
                    name="nationality"
                    value={
                        profileData.nationality
                    }
                    onChange={
                        handleChange
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

                <ErrorMessage
                    field="nationality"
                />

            </div>


            <h3>
                Current Address
            </h3>


            <div className="form-group">

<label>
 Address <span className="required-star">*</span>
</label>

                <textarea
                    name="currentAddress"
                    value={
                        profileData.currentAddress
                    }
                    onChange={
                        handleChange
                    }
                />

                <ErrorMessage
                    field="currentAddress"
                />

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  City <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="currentCity"
                        value={
                            profileData.currentCity
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="currentCity"
                    />

                </div>


                <div className="form-group">

<label>
  State <span className="required-star">*</span>
</label>

                    <select
                        name="currentState"
                        value={
                            profileData.currentState
                        }
                        onChange={
                            handleChange
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

                    </select>

                    <ErrorMessage
                        field="currentState"
                    />

                </div>


                <div className="form-group">

<label>
  Country <span className="required-star">*</span>
</label>

                    <select
                        name="currentCountry"
                        value={
                            profileData.currentCountry
                        }
                        onChange={
                            handleChange
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

                    <ErrorMessage
                        field="currentCountry"
                    />

                </div>

            </div>


            <div className="form-group">

                <label>

                    <input
                        type="checkbox"
                        checked={
                            profileData.sameAddress
                        }
                        onChange={(e) =>
                            handleSameAddress(
                                e.target.checked
                            )
                        }
                    />

                    {" "}
                    Permanent Address is same as Current Address

                </label>

            </div>


            <h3>
                Permanent Address
            </h3>


            <div className="form-group">

<label>
  Address <span className="required-star">*</span>
</label>

                <textarea
                    name="permanentAddress"
                    value={
                        profileData.permanentAddress
                    }
                    onChange={
                        handleChange
                    }
                    disabled={
                        profileData.sameAddress
                    }
                />

                <ErrorMessage
                    field="permanentAddress"
                />

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  City <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="permanentCity"
                        value={
                            profileData.permanentCity
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            profileData.sameAddress
                        }
                    />

                    <ErrorMessage
                        field="permanentCity"
                    />

                </div>


                <div className="form-group">

<label>
  State <span className="required-star">*</span>
</label>

                    <select
                        name="permanentState"
                        value={
                            profileData.permanentState
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            profileData.sameAddress
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

                    </select>

                    <ErrorMessage
                        field="permanentState"
                    />

                </div>


                <div className="form-group">

<label>
  Country <span className="required-star">*</span>
</label>

                    <select
                        name="permanentCountry"
                        value={
                            profileData.permanentCountry
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            profileData.sameAddress
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

                    <ErrorMessage
                        field="permanentCountry"
                    />

                </div>

            </div>

        </>

    );


    /* =========================================================
       STEP 3
    ========================================================= */

    const renderStep3 = () => (

        <>

            <h2>
                Education & Career
            </h2>


            <div className="form-row">

                <div className="form-group">

<label>
  Highest Qualification <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="qualification"
                        value={
                            profileData.qualification
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="qualification"
                    />

                </div>


                <div className="form-group">

<label>
  College/University <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="college"
                        value={
                            profileData.college
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="college"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Occupation <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="occupation"
                        value={
                            profileData.occupation
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="occupation"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Company Name
                    </label>

                    <input
                        type="text"
                        name="company"
                        value={
                            profileData.company
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Annual Income <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="income"
                        value={
                            profileData.income
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "income",

                                    value

                                }

                            });

                        }}
                    />

                    <ErrorMessage
                        field="income"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Work Location
                    </label>

                    <input
                        type="text"
                        name="workLocation"
                        value={
                            profileData.workLocation
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>

            </div>

        </>

    );


    /* =========================================================
       STEP 4
    ========================================================= */

    const renderStep4 = () => (

        <>

            <h2>
                Family & Lifestyle
            </h2>


            <div className="form-row">

                <div className="form-group">

<label>
  Father Name <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="fatherName"
                        value={
                            profileData.fatherName
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^a-zA-Z\s]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "fatherName",

                                    value

                                }

                            });

                        }}
                    />

                    <ErrorMessage
                        field="fatherName"
                    />

                </div>


                <div className="form-group">

<label>
  Mother Name <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="motherName"
                        value={
                            profileData.motherName
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^a-zA-Z\s]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "motherName",

                                    value

                                }

                            });

                        }}
                    />

                    <ErrorMessage
                        field="motherName"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Number of Siblings <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        maxLength={2}
                        name="siblings"
                        value={
                            profileData.siblings
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "siblings",

                                    value

                                }

                            });

                        }}
                    />

                    <ErrorMessage
                        field="siblings"
                    />

                </div>


                <div className="form-group">

<label>
  Family Type <span className="required-star">*</span>
</label>

                    <select
                        name="familyType"
                        value={
                            profileData.familyType
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            Select
                        </option>

                        <option>
                            Nuclear
                        </option>

                        <option>
                            Joint
                        </option>

                    </select>

                    <ErrorMessage
                        field="familyType"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
 Food Preference <span className="required-star">*</span>
</label>

                    <select
                        name="foodPreference"
                        value={
                            profileData.foodPreference
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            Select
                        </option>

                        <option>
                            Vegetarian
                        </option>

                        <option>
                            Non Vegetarian
                        </option>

                        <option>
                            Vegan
                        </option>

                    </select>

                    <ErrorMessage
                        field="foodPreference"
                    />

                </div>


                <div className="form-group">

<label>
  Smoking Habit <span className="required-star">*</span>
</label>

                    <select
                        name="smokingHabit"
                        value={
                            profileData.smokingHabit
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            Select
                        </option>

                        <option>
                            Never
                        </option>

                        <option>
                            Occasionally
                        </option>

                        <option>
                            Regularly
                        </option>

                    </select>

                    <ErrorMessage
                        field="smokingHabit"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Drinking Habit <span className="required-star">*</span>
</label>

                    <select
                        name="drinkingHabit"
                        value={
                            profileData.drinkingHabit
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            Select
                        </option>

                        <option>
                            Never
                        </option>

                        <option>
                            Occasionally
                        </option>

                        <option>
                            Regularly
                        </option>

                    </select>

                    <ErrorMessage
                        field="drinkingHabit"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Hobbies & Interests
                    </label>

                    <textarea
                        name="hobbies"
                        rows="4"
                        value={
                            profileData.hobbies
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>

            </div>

        </>

    );


    /* =========================================================
       STEP 5
    ========================================================= */

    const renderStep5 = () => (

        <>

            <h2>
                Partner Preference
            </h2>


            <div className="form-row">

                <div className="form-group">

<label>
  Prefered Age From <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        maxLength={2}
                        value={
                            profileData.partnerAgeFrom
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "partnerAgeFrom",

                                    value

                                }

                            });

                        }}
                    />

                    <ErrorMessage
                        field="partnerAgeFrom"
                    />

                </div>


                <div className="form-group">

<label>
  Prefered Age To <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        maxLength={2}
                        value={
                            profileData.partnerAgeTo
                        }
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                            handleChange({

                                target: {

                                    name:
                                        "partnerAgeTo",

                                    value

                                }

                            });

                        }}
                    />

                    <ErrorMessage
                        field="partnerAgeTo"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
 Preferred Education <span className="required-star">*</span>
</label>
                    <input
                        type="text"
                        name="partnerEducation"
                        value={
                            profileData.partnerEducation
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="partnerEducation"
                    />

                </div>


                <div className="form-group">

<label>
  Preferred Occupation <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="partnerOccupation"
                        value={
                            profileData.partnerOccupation
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="partnerOccupation"
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

<label>
  Preferred Location <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="partnerCountry"
                        value={
                            profileData.partnerCountry
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="partnerCountry"
                    />

                </div>


                <div className="form-group">

<label>
  Preferred Religion/Community <span className="required-star">*</span>
</label>

                    <input
                        type="text"
                        name="partnerReligion"
                        value={
                            profileData.partnerReligion
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <ErrorMessage
                        field="partnerReligion"
                    />

                </div>

            </div>

        </>

    );


    /* =========================================================
       STEP 6
    ========================================================= */

    const renderStep6 = () => (

        <>

            <h2>
                Photos
            </h2>


            <div className="form-group">

<label>
 Profile Photo <span className="required-star">*</span>
</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={
                        handleProfilePhoto
                    }
                />

                <ErrorMessage
                    field="profilePhoto"
                />


                {profileData.profilePhoto && (

                    <div>

                        <p>
                            Current Profile Photo
                        </p>

                        <img
                            src={
                                profileData.profilePhoto
                            }
                            alt="Profile"
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "10px"
                            }}
                        />

                    </div>

                )}

            </div>


            <div className="form-group">

                <label>
                    Additional Photos
                </label>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                        handleAdditionalPhotos
                    }
                    disabled={
                        profileData
                            .additionalPhotos
                            .length >= 4
                    }
                />


                <p>
                    {
                        profileData
                            .additionalPhotos
                            .length
                    }{" "}
                    photo(s) selected
                </p>


                <p>
                    Maximum 4 additional photos.
                    Images are automatically compressed.
                </p>


                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap"
                    }}
                >

                    {
                        profileData
                            .additionalPhotos
                            .map(
                                (
                                    photo,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        style={{
                                            textAlign:
                                                "center"
                                        }}
                                    >

                                        <img
                                            src={photo}
                                            alt={`Additional ${index + 1}`}
                                            style={{
                                                width:
                                                    "120px",
                                                height:
                                                    "120px",
                                                objectFit:
                                                    "cover",
                                                borderRadius:
                                                    "10px"
                                            }}
                                        />


                                        <br />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAsProfilePhoto(
                                                    photo
                                                )
                                            }
                                        >
                                            Set as Profile Photo
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAdditionalPhoto(
                                                    index
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                )
                            )
                    }

                </div>

            </div>

        </>

    );


    /* =========================================================
       STEP 7
    ========================================================= */

    const renderStep7 = () => (

        <>

            <h2>
                Verification
            </h2>


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Mobile Number
                    </label>

                    <input
                        type="text"
                        value={
                            profileData.mobileNumber
                        }
                        readOnly
                    />

                </div>


                <div className="form-group">

                    <label>
                        Mobile Status
                    </label>

                    <input
                        type="text"
                        value={
                            profileData.mobileStatus
                        }
                        readOnly
                    />

                </div>

            </div>


            <button
                type="button"
                className="next-btn"
                onClick={
                    sendMobileOtp
                }
                disabled={
                    profileData.mobileStatus ===
                    "Verified"
                }
            >
                Send Mobile OTP
            </button>


            {profileData.mobileOtpSent &&
                profileData.mobileStatus !==
                "Verified" && (

                    <div className="form-group">

                        <label>
                            Enter Mobile OTP
                        </label>

                        <input
                            type="text"
                            maxLength={6}
                            value={
                                mobileOtp
                            }
                            onChange={(e) => {

                                setMobileOtp(
                                    e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    )
                                );

                            }}
                        />

                        <button
                            type="button"
                            className="next-btn"
                            onClick={
                                verifyMobileOtp
                            }
                        >
                            Verify Mobile OTP
                        </button>

                    </div>

                )}


            <ErrorMessage
                field="mobile"
            />


            <hr />


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={
                            profileData.email
                        }
                        readOnly
                    />

                </div>


                <div className="form-group">

                    <label>
                        Email Status
                    </label>

                    <input
                        type="text"
                        value={
                            profileData.emailStatus
                        }
                        readOnly
                    />

                </div>

            </div>


            <button
                type="button"
                className="next-btn"
                onClick={
                    sendEmailOtp
                }
                disabled={
                    profileData.emailStatus ===
                    "Verified"
                }
            >
                Send Email OTP
            </button>


            {profileData.emailOtpSent &&
                profileData.emailStatus !==
                "Verified" && (

                    <div className="form-group">

                        <label>
                            Enter Email OTP
                        </label>

                        <input
                            type="text"
                            maxLength={6}
                            value={
                                emailOtp
                            }
                            onChange={(e) => {

                                setEmailOtp(
                                    e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    )
                                );

                            }}
                        />

                        <button
                            type="button"
                            className="next-btn"
                            onClick={
                                verifyEmailOtp
                            }
                        >
                            Verify Email OTP
                        </button>

                    </div>

                )}


            <ErrorMessage
                field="email"
            />


            <hr />


            <div className="form-row">

                <div className="form-group">

<label>
ID Proof <span className="required-star">*</span>
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

                    {profileData.idProof && (

                        <p>
                            Selected:{" "}
                            {
                                profileData.idProof
                            }
                        </p>

                    )}

                    <ErrorMessage
                        field="idProof"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Verification Badge
                    </label>

                    <input
                        type="text"
                        value={
                            profileData.verificationStatus
                        }
                        readOnly
                    />

                </div>

            </div>


            <div className="form-group">

                <label>
                    Verified Date
                </label>

                <input
                    type="text"
                    value={
                        profileData.verifiedDate
                    }
                    readOnly
                />

            </div>

        </>

    );


    /* =========================================================
       RENDER CURRENT STEP
    ========================================================= */

    const renderCurrentStep = () => {

        switch (step) {

            case 1:
                return renderStep1();

            case 2:
                return renderStep2();

            case 3:
                return renderStep3();

            case 4:
                return renderStep4();

            case 5:
                return renderStep5();

            case 6:
                return renderStep6();

            case 7:
                return renderStep7();

            default:
                return null;
        }

    };


    /* =========================================================
       MAIN RETURN
    ========================================================= */

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

                    Please complete your profile
                    to continue.

                </p>


                {renderCurrentStep()}


                <div className="step-text">

                    Step {step} of 7

                </div>


                <div
                    className="button-group-between"
                >


                    {step > 1 && (

                        <button
                            className="previous-btn"
                            onClick={
                                handlePrevious
                            }
                        >
                            ← Previous
                        </button>

                    )}


                    {step < 7 && (

                        <button
                            className="next-btn"
                            onClick={
                                handleNext
                            }
                        >
                            Next →
                        </button>

                    )}


                    {step === 7 && (

                        <button
                            className="save-btn"
                            onClick={
                                handleCompleteProfile
                            }
                        >
                            Complete Profile
                        </button>

                    )}

                </div>

            </div>

        </div>

    );

}

export default CompleteProfile;