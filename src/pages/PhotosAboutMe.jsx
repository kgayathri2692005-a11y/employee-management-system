import React, { useEffect, useState } from "react";
import "../styles/CompleteProfile.css";

function PhotosAboutMe({ onNext, onPrevious }) {

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [additionalPhotos, setAdditionalPhotos] = useState([]);
    const [aboutMe, setAboutMe] = useState("");

    const [errors, setErrors] = useState({});
    const [warningToast, setWarningToast] = useState("");


    /*
    =========================================================
    HELPER FUNCTIONS
    =========================================================
    */

    const cleanValue = (value) => {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        return String(value).trim();
    };


    const capitalizeFirst = (value) => {

        const text = cleanValue(value);

        if (!text) {
            return "";
        }

        return (
            text.charAt(0).toUpperCase() +
            text.slice(1)
        );
    };


    /*
    =========================================================
    OCCUPATION FORMAT
    =========================================================
    */

    const getProfessionalDescription = (occupation) => {

        const value = cleanValue(occupation);

        if (!value) {
            return "";
        }

        const lower = value.toLowerCase();

        const occupationMap = {

            business:
                "a business professional",

            businessman:
                "a business professional",

            businesswoman:
                "a business professional",

            entrepreneur:
                "an entrepreneur",

            student:
                "a student",

            engineer:
                "an engineer",

            softwareengineer:
                "a software engineer",

            "software engineer":
                "a software engineer",

            doctor:
                "a doctor",

            lawyer:
                "a legal professional",

            teacher:
                "a teacher",

            professor:
                "a professor",

            accountant:
                "an accounting professional",

            banker:
                "a banking professional",

            architect:
                "an architect",

            designer:
                "a designer",

            "government employee":
                "a government employee",

            "private employee":
                "a private-sector professional",

            "self employed":
                "a self-employed professional",

            "self-employed":
                "a self-employed professional"
        };


        if (occupationMap[lower]) {
            return occupationMap[lower];
        }


        if (
            lower.startsWith("a ") ||
            lower.startsWith("an ")
        ) {
            return value;
        }


        const vowels = [
            "a",
            "e",
            "i",
            "o",
            "u"
        ];

        const article =
            vowels.includes(lower.charAt(0))
                ? "an"
                : "a";


        return `${article} ${value.toLowerCase()}`;
    };


    /*
    =========================================================
    INCOME FORMAT
    =========================================================
    */

    const formatIncome = (income) => {

        const value = cleanValue(income);

        if (!value) {
            return "";
        }


        if (
            value.includes("₹") ||
            value.toLowerCase().includes("lakh") ||
            value.toLowerCase().includes("lac") ||
            value.toLowerCase().includes("per annum") ||
            value.toLowerCase().includes("annum")
        ) {
            return value;
        }


        const numericValue = Number(
            value.replace(/,/g, "")
        );


        if (!Number.isNaN(numericValue)) {

            return `₹${numericValue.toLocaleString("en-IN")} per annum`;

        }


        return value;
    };


    /*
    =========================================================
    HOBBIES FORMAT
    =========================================================
    */

    const formatHobbies = (hobbies) => {

        if (Array.isArray(hobbies)) {

            return hobbies
                .map(cleanValue)
                .filter(Boolean)
                .join(", ");

        }

        return cleanValue(hobbies);
    };


    /*
    =========================================================
    FOOD / LIFESTYLE
    =========================================================
    */

    const getFoodSentence = (foodPreference) => {

        const value = cleanValue(foodPreference);

        if (!value) {
            return "";
        }

        const lower = value.toLowerCase();


        if (
            lower === "vegetarian" ||
            lower === "veg"
        ) {
            return "I follow a vegetarian lifestyle";
        }


        if (
            lower === "non-vegetarian" ||
            lower === "non vegetarian" ||
            lower === "nonveg"
        ) {
            return "I follow a non-vegetarian lifestyle";
        }


        if (lower === "eggetarian") {
            return "I follow an eggetarian lifestyle";
        }


        return `I follow a ${value.toLowerCase()} lifestyle`;
    };


    /*
    =========================================================
    SMOKING
    =========================================================
    */

    const getSmokingSentence = (smokingHabit) => {

        const value = cleanValue(smokingHabit);

        if (!value) {
            return "";
        }

        const lower = value.toLowerCase();


        if (
            lower === "never" ||
            lower === "no"
        ) {
            return "I do not smoke";
        }


        if (
            lower === "occasionally" ||
            lower === "sometimes"
        ) {
            return "I smoke occasionally";
        }


        return `I smoke ${lower}`;
    };


    /*
    =========================================================
    DRINKING
    =========================================================
    */

    const getDrinkingSentence = (drinkingHabit) => {

        const value = cleanValue(drinkingHabit);

        if (!value) {
            return "";
        }

        const lower = value.toLowerCase();


        if (
            lower === "never" ||
            lower === "no"
        ) {
            return "I do not drink";
        }


        if (
            lower === "occasionally" ||
            lower === "sometimes"
        ) {
            return "I drink occasionally";
        }


        return `I drink ${lower}`;
    };


    /*
    =========================================================
    LOAD PROFILE
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


        const currentUser = loggedInUser.email;

        const savedProfile =
            allProfiles[currentUser] || {};


        /*
        =====================================================
        PHOTOS
        =====================================================
        */

        setProfilePhoto(
            savedProfile.profilePhoto ||
            savedProfile.profileImage ||
            null
        );


        setAdditionalPhotos(
            Array.isArray(savedProfile.additionalPhotos)
                ? savedProfile.additionalPhotos
                : []
        );


        /*
        =====================================================
        EXISTING ABOUT ME
        =====================================================
        */

        if (
            savedProfile.aboutMe &&
            savedProfile.aboutMe.trim()
        ) {

            setAboutMe(
                savedProfile.aboutMe
            );

            return;
        }


        /*
        =====================================================
        BASIC PROFILE DATA
        =====================================================
        */

        const firstName =
            cleanValue(savedProfile.firstName);

        const lastName =
            cleanValue(savedProfile.lastName);

        const fullName =
            `${firstName} ${lastName}`.trim();


        const currentCity =
            cleanValue(savedProfile.currentCity);

        const currentState =
            cleanValue(savedProfile.currentState);

        const currentCountry =
            cleanValue(savedProfile.currentCountry);


        const qualification =
            cleanValue(savedProfile.qualification);

        const college =
            cleanValue(savedProfile.college);

        const occupation =
            cleanValue(savedProfile.occupation);

        const income =
            formatIncome(savedProfile.income);


        const religion =
            cleanValue(savedProfile.religion);

        const motherTongue =
            cleanValue(savedProfile.motherTongue);

        const nationality =
            cleanValue(savedProfile.nationality);


        const fatherName =
            cleanValue(savedProfile.fatherName);

        const motherName =
            cleanValue(savedProfile.motherName);

        const siblings =
            cleanValue(savedProfile.siblings);

        const familyType =
            cleanValue(savedProfile.familyType);


        const foodPreference =
            cleanValue(savedProfile.foodPreference);

        const smokingHabit =
            cleanValue(savedProfile.smokingHabit);

        const drinkingHabit =
            cleanValue(savedProfile.drinkingHabit);

        const hobbies =
            formatHobbies(savedProfile.hobbies);


        /*
        =====================================================
        PARTNER PREFERENCES
        =====================================================
        */

        const partnerAgeFrom =
            cleanValue(savedProfile.partnerAgeFrom);

        const partnerAgeTo =
            cleanValue(savedProfile.partnerAgeTo);

        const partnerReligion =
            cleanValue(savedProfile.partnerReligion);

        const partnerEducation =
            cleanValue(savedProfile.partnerEducation);

        const partnerOccupation =
            cleanValue(savedProfile.partnerOccupation);

        const partnerCountry =
            cleanValue(savedProfile.partnerCountry);


        /*
        =========================================================
        BUILD PARAGRAPHS
        =========================================================
        */

        const paragraphs = [];


        /*
        =========================================================
        PARAGRAPH 1
        INTRODUCTION
        =========================================================
        */

        const introductionParts = [];


        if (fullName) {

            introductionParts.push(
                `I am ${fullName}`
            );

        } else {

            introductionParts.push(
                "I am"
            );

        }


        if (occupation) {

            introductionParts.push(
                getProfessionalDescription(
                    occupation
                )
            );

        }


        if (currentCity) {

            introductionParts.push(
                `based in ${currentCity}`
            );

        }


        let introduction =
            introductionParts.join(", ");


        introduction =
            introduction.replace(
                ", based in",
                " based in"
            );


        if (
            introduction &&
            !introduction.endsWith(".")
        ) {

            introduction += ".";
        }


        /*
        EDUCATION
        */

        if (qualification) {

            let educationSentence =
                `I hold a ${qualification} degree`;


            if (
                qualification
                    .toLowerCase()
                    .includes("degree")
            ) {

                educationSentence =
                    `I hold ${qualification}`;
            }


            if (college) {

                educationSentence +=
                    ` from ${college}`;
            }


            educationSentence += ".";


            introduction +=
                ` ${educationSentence}`;
        }


        /*
        INCOME
        */

        if (income) {

            introduction +=
                ` I currently earn approximately ${income}.`;
        }


        if (introduction.trim()) {

            paragraphs.push(
                introduction.trim()
            );
        }


        /*
        =========================================================
        PARAGRAPH 2
        PERSONAL / CULTURAL BACKGROUND
        =========================================================
        */

        const backgroundSentences = [];


        if (religion) {

            backgroundSentences.push(
                `I come from a ${religion} background`
            );
        }


        if (motherTongue) {

            backgroundSentences.push(
                `my mother tongue is ${motherTongue}`
            );
        }


        if (nationality) {

            backgroundSentences.push(
                `I am ${nationality}`
            );
        }


        if (
            currentState &&
            currentCountry
        ) {

            backgroundSentences.push(
                `I am currently based in ${currentState}, ${currentCountry}`
            );

        } else if (currentState) {

            backgroundSentences.push(
                `I am currently based in ${currentState}`
            );

        } else if (currentCountry) {

            backgroundSentences.push(
                `I am currently based in ${currentCountry}`
            );
        }


        if (backgroundSentences.length > 0) {

            let backgroundText = "";


            backgroundSentences.forEach(
                (sentence, index) => {

                    if (index === 0) {

                        backgroundText =
                            sentence;

                    } else if (
                        sentence.startsWith(
                            "my mother tongue"
                        )
                    ) {

                        backgroundText +=
                            `, and ${sentence}`;

                    } else {

                        backgroundText +=
                            `. ${capitalizeFirst(sentence)}`;
                    }
                }
            );


            backgroundText += ".";


            paragraphs.push(
                backgroundText
            );
        }


        /*
        =========================================================
        PARAGRAPH 3
        FAMILY
        =========================================================
        */

        const familyTextStart =
            familyType
                ? `I come from a ${familyType.toLowerCase()} family`
                : "I come from a close-knit family";


        const familyMembers = [];


        if (fatherName) {

            familyMembers.push(
                `Father: ${fatherName}`
            );
        }


        if (motherName) {

            familyMembers.push(
                `Mother: ${motherName}`
            );
        }


        if (siblings) {

            familyMembers.push(
                `Siblings: ${siblings}`
            );
        }


        let familyText =
            familyTextStart;


        if (familyMembers.length > 0) {

            familyText +=
                `. My family includes ${familyMembers.join(", ")}`;
        }


        familyText += ".";


        paragraphs.push(
            familyText
        );


        /*
        =========================================================
        PARAGRAPH 4
        LIFESTYLE
        =========================================================
        */

        const lifestyleParts = [];


        const foodSentence =
            getFoodSentence(foodPreference);

        const smokingSentence =
            getSmokingSentence(smokingHabit);

        const drinkingSentence =
            getDrinkingSentence(drinkingHabit);


        if (foodSentence) {

            lifestyleParts.push(
                foodSentence
            );
        }


        if (smokingSentence) {

            lifestyleParts.push(
                smokingSentence
            );
        }


        if (drinkingSentence) {

            lifestyleParts.push(
                drinkingSentence
            );
        }


        if (lifestyleParts.length > 0) {

            let lifestyleText = "";


            if (lifestyleParts.length === 1) {

                lifestyleText =
                    `${lifestyleParts[0]}.`;

            } else {

                const first =
                    lifestyleParts[0];

                const remaining =
                    lifestyleParts.slice(1);


                lifestyleText =
                    `${first}. ${remaining.join(" and ")}.`;
            }


            paragraphs.push(
                capitalizeFirst(
                    lifestyleText
                )
            );
        }


        /*
        =========================================================
        PARAGRAPH 5
        HOBBIES
        =========================================================
        */

        if (hobbies) {

            let hobbyText =
                hobbies;


            if (hobbyText.includes(",")) {

                const hobbyArray =
                    hobbyText
                        .split(",")
                        .map(
                            item => item.trim()
                        )
                        .filter(Boolean);


                if (hobbyArray.length > 1) {

                    const last =
                        hobbyArray.pop();


                    hobbyText =
                        `${hobbyArray.join(", ")} and ${last}`;
                }
            }


            paragraphs.push(
                `In my free time, I enjoy ${hobbyText}.`
            );
        }


        /*
        =========================================================
        PARAGRAPH 6
        PARTNER PREFERENCES

        IMPORTANT:
        There is ONLY ONE partner paragraph.
        =========================================================
        */

        const partnerQualities = [];


        /*
        ---------------------------------------------------------
        EDUCATION
        ---------------------------------------------------------
        */

        if (
            partnerEducation &&
            ![
                "any",
                "any education"
            ].includes(
                partnerEducation.toLowerCase()
            )
        ) {

            partnerQualities.push(
                `has a good educational background in ${partnerEducation}`
            );
        }


        /*
        ---------------------------------------------------------
        OCCUPATION
        ---------------------------------------------------------
        */

        if (
            partnerOccupation &&
            ![
                "any",
                "any occupation"
            ].includes(
                partnerOccupation.toLowerCase()
            )
        ) {

            const occupationLower =
                partnerOccupation.toLowerCase();


            const occupationMap = {

                "government employee":
                    "works in government service",

                "private employee":
                    "works in the private sector",

                "self employed":
                    "is self-employed",

                "self-employed":
                    "is self-employed",

                businessman:
                    "has a business career",

                businesswoman:
                    "has a business career",

                business:
                    "has a business career",

                entrepreneur:
                    "is an entrepreneur",

                doctor:
                    "is a doctor",

                engineer:
                    "works as an engineer",

                "software engineer":
                    "works as a software engineer",

                teacher:
                    "works as a teacher",

                professor:
                    "works as a professor",

                lawyer:
                    "works as a legal professional",

                accountant:
                    "works in accounting",

                banker:
                    "works in banking",

                architect:
                    "works as an architect",

                designer:
                    "works as a designer"
            };


            partnerQualities.push(
                occupationMap[occupationLower] ||
                `works as a ${occupationLower}`
            );
        }


        /*
        ---------------------------------------------------------
        RELIGION
        ---------------------------------------------------------
        */

        if (
            partnerReligion &&
            ![
                "any",
                "any religion"
            ].includes(
                partnerReligion.toLowerCase()
            )
        ) {

            partnerQualities.push(
                `comes from a ${partnerReligion} background`
            );
        }


        /*
        ---------------------------------------------------------
        MAIN PARTNER SENTENCE
        ---------------------------------------------------------
        */

        let partnerText =
            "I hope to find a kind, caring, understanding, and compatible life partner";


        if (partnerQualities.length === 1) {

            partnerText +=
                ` who ${partnerQualities[0]}`;

        } else if (partnerQualities.length === 2) {

            partnerText +=
                ` who ${partnerQualities[0]} and ${partnerQualities[1]}`;

        } else if (partnerQualities.length > 2) {

            const last =
                partnerQualities[
                    partnerQualities.length - 1
                ];


            const firstItems =
                partnerQualities.slice(0, -1);


            partnerText +=
                ` who ${firstItems.join(", ")}, and ${last}`;
        }


        partnerText += ".";


        /*
        ---------------------------------------------------------
        PREFERRED AGE
        ---------------------------------------------------------
        */

        if (
            partnerAgeFrom &&
            partnerAgeTo
        ) {

            partnerText +=
                ` I would prefer someone between ${partnerAgeFrom} and ${partnerAgeTo} years of age.`;

        } else if (partnerAgeFrom) {

            partnerText +=
                ` I would prefer someone at least ${partnerAgeFrom} years old.`;

        } else if (partnerAgeTo) {

            partnerText +=
                ` I would prefer someone up to ${partnerAgeTo} years of age.`;
        }


        /*
        ---------------------------------------------------------
        PREFERRED LOCATION
        ---------------------------------------------------------
        */

        if (
            partnerCountry &&
            ![
                "any",
                "any country"
            ].includes(
                partnerCountry.toLowerCase()
            )
        ) {

            partnerText +=
                ` Ideally, I would prefer a partner based in ${partnerCountry}.`;
        }


        paragraphs.push(
            partnerText
        );


        /*
        =========================================================
        FINAL ABOUT ME TEXT
        =========================================================
        */

        const generatedText =
            paragraphs
                .filter(
                    paragraph =>
                        paragraph &&
                        paragraph.trim()
                )
                .join("\n\n");


        setAboutMe(
            generatedText
        );

    }, []);


    /*
    =========================================================
    RESIZE IMAGE
    =========================================================
    */

    const resizeImage = (file) => {

        return new Promise((resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload = (event) => {

                const img =
                    new Image();


                img.onload = () => {

                    const canvas =
                        document.createElement("canvas");


                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;


                    let width =
                        img.width;

                    let height =
                        img.height;


                    if (
                        width > MAX_WIDTH ||
                        height > MAX_HEIGHT
                    ) {

                        if (width > height) {

                            height =
                                Math.round(
                                    height *
                                    (
                                        MAX_WIDTH /
                                        width
                                    )
                                );

                            width =
                                MAX_WIDTH;

                        } else {

                            width =
                                Math.round(
                                    width *
                                    (
                                        MAX_HEIGHT /
                                        height
                                    )
                                );

                            height =
                                MAX_HEIGHT;
                        }
                    }


                    canvas.width =
                        width;

                    canvas.height =
                        height;


                    const context =
                        canvas.getContext("2d");


                    context.drawImage(
                        img,
                        0,
                        0,
                        width,
                        height
                    );


                    const resizedImage =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.8
                        );


                    resolve(
                        resizedImage
                    );
                };


                img.onerror = reject;


                img.src =
                    event.target.result;
            };


            reader.onerror = reject;


            reader.readAsDataURL(file);
        });
    };


    /*
    =========================================================
    ADD ADDITIONAL PHOTO
    =========================================================
    */

    const handleAdditionalPhoto = async (e) => {

        const file =
            e.target.files[0];


        if (!file) {
            return;
        }


        if (additionalPhotos.length >= 4) {

            setWarningToast(
                "You can upload a maximum of 4 additional photos."
            );


            setTimeout(() => {
                setWarningToast("");
            }, 3000);


            e.target.value = "";

            return;
        }


        if (!file.type.startsWith("image/")) {

            setWarningToast(
                "Please select a valid image."
            );


            setTimeout(() => {
                setWarningToast("");
            }, 3000);


            e.target.value = "";

            return;
        }


        try {

            const resizedImage =
                await resizeImage(file);


            setAdditionalPhotos(
                previousPhotos => [
                    ...previousPhotos,
                    resizedImage
                ]
            );

        } catch (error) {

            console.error(
                "Image upload error:",
                error
            );


            setWarningToast(
                "Unable to process this image."
            );


            setTimeout(() => {
                setWarningToast("");
            }, 3000);
        }


        e.target.value = "";
    };


    /*
    =========================================================
    REMOVE PHOTO
    =========================================================
    */

    const removePhoto = (index) => {

        setAdditionalPhotos(
            previousPhotos =>
                previousPhotos.filter(
                    (_, photoIndex) =>
                        photoIndex !== index
                )
        );
    };


    /*
    =========================================================
    SAVE DATA
    =========================================================
    */

    const handleNext = () => {

        const newErrors = {};


        if (!profilePhoto) {

            newErrors.profilePhoto =
                "Please upload a profile photo.";
        }


        setErrors(
            newErrors
        );


        if (
            Object.keys(newErrors).length > 0
        ) {

            setWarningToast(
                "Please upload your profile photo before continuing."
            );


            setTimeout(() => {
                setWarningToast("");
            }, 3000);


            return;
        }


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

            profilePhoto,

            additionalPhotos,

            aboutMe
        };


        localStorage.setItem(
            "allProfiles",
            JSON.stringify(allProfiles)
        );


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

                    <span className="toast-icon">
                        !
                    </span>

                    {warningToast}

                </div>
            )}


            <div className="profile-card">


                {/* HEADER */}

                <div className="profile-header">

                    <div className="profile-title-icon">
                        💗
                    </div>

                    <h1 className="profile-title">
                        Complete Your Profile
                    </h1>

                    <p className="profile-subtitle">
                        Add your photos and tell us a little more about yourself.
                    </p>

                </div>


                {/* SECTION HEADING */}

                <div className="section-heading">

                    <div className="section-heading-icon">
                        📸
                    </div>

                    <div>

                        <h2>
                            Photos & About Me
                        </h2>

                        <p>
                            A great profile helps others get to know you better.
                        </p>

                    </div>

                </div>


                {/* PROFILE PHOTO */}

                <div className="photo-section main-profile-photo-section">

                    <div className="section-label-row">

                        <div>

                            <h3>
                                Profile Photo

                                <span className="required-star">
                                    *
                                </span>

                            </h3>

                            <p className="photo-info">
                                Choose a clear and recent photo of yourself.
                            </p>

                        </div>

                    </div>


                    {profilePhoto ? (

                        <div className="main-photo-wrapper">

                            <div className="main-photo-preview">

                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                />

                            </div>

                            <div className="photo-upload-status">

                                <span className="success-dot">
                                    ✓
                                </span>

                                Profile photo added

                            </div>

                        </div>

                    ) : (

                        <div className="no-profile-photo">

                            <div className="no-photo-icon">
                                👤
                            </div>

                            <p>
                                Your profile photo has not been uploaded yet.
                            </p>


                            {errors.profilePhoto && (

                                <span className="field-error">
                                    {errors.profilePhoto}
                                </span>

                            )}

                        </div>
                    )}

                </div>


                {/* ADDITIONAL PHOTOS */}

                <div className="photo-section additional-photo-section">

                    <div className="section-label-row">

                        <div>

                            <h3>
                                Additional Photos
                            </h3>

                            <p className="photo-info">
                                Add up to 4 more photos to showcase different moments of your life.
                            </p>

                        </div>


                        <span className="photo-limit-badge">
                            {additionalPhotos.length} / 4
                        </span>

                    </div>


                    <div className="additional-photo-grid">

                        {additionalPhotos.map(
                            (photo, index) => (

                                <div
                                    className="additional-photo-item"
                                    key={index}
                                >

                                    <img
                                        src={photo}
                                        alt={`Additional ${index + 1}`}
                                    />


                                    <div className="photo-number">
                                        {index + 1}
                                    </div>


                                    <button
                                        type="button"
                                        className="remove-photo-btn"
                                        onClick={() =>
                                            removePhoto(index)
                                        }
                                        aria-label="Remove photo"
                                    >
                                        ×
                                    </button>

                                </div>
                            )
                        )}


                        {additionalPhotos.length < 4 && (

                            <label className="add-photo-box">

                                <div className="add-photo-icon">
                                    +
                                </div>

                                <strong>
                                    Add Photo
                                </strong>

                                <span>
                                    JPG or PNG
                                </span>


                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={
                                        handleAdditionalPhoto
                                    }
                                    hidden
                                />

                            </label>
                        )}

                    </div>


                    <div className="photo-count-row">

                        <span>

                            {additionalPhotos.length === 0
                                ? "No additional photos added"
                                : `${additionalPhotos.length} additional ${
                                    additionalPhotos.length === 1
                                        ? "photo"
                                        : "photos"
                                } added`
                            }

                        </span>


                        <span>
                            Maximum 4 photos
                        </span>

                    </div>

                </div>


                {/* ABOUT ME */}

                <div className="about-me-section">

                    <div className="about-me-header">

                        <div className="about-me-title">

                            <div className="about-me-icon">
                                💗
                            </div>

                            <div>

                                <h3>
                                    About Me
                                </h3>

                                <p>
                                    Your introduction
                                </p>

                            </div>

                        </div>


                        <span className="optional-label">
                            Optional
                        </span>

                    </div>


                    <div className="about-me-helper">

                        <span className="helper-icon">
                            ✨
                        </span>

                        <div>

                            <strong>
                                We've created this for you
                            </strong>

                            <p>
                                This introduction is automatically generated from your profile information.
                                You can personalize it before continuing.
                            </p>

                        </div>

                    </div>


                    <textarea
                        rows="12"
                        value={aboutMe}
                        onChange={(e) =>
                            setAboutMe(e.target.value)
                        }
                        placeholder="Tell us about yourself..."
                    />


                    <div className="about-me-footer">

                        <span>
                            💡 You can edit this introduction anytime.
                        </span>

                        <span>
                            {aboutMe.length} characters
                        </span>

                    </div>

                </div>


                {/* STEP PROGRESS */}

                <div className="step-progress">

                    <div className="step-progress-top">

                        <span>
                            Profile completion
                        </span>

                        <strong>
                            Step 6 of 7
                        </strong>

                    </div>


                    <div className="progress-track">

                        <div className="progress-fill" />

                    </div>

                </div>


                {/* BUTTONS */}

                <div className="button-group-between">

                    <button
                        className="previous-btn"
                        type="button"
                        onClick={onPrevious}
                    >

                        <span>
                            ←
                        </span>

                        Previous

                    </button>


                    <button
                        className="next-btn"
                        type="button"
                        onClick={handleNext}
                    >

                        Continue

                        <span>
                            →
                        </span>

                    </button>

                </div>

            </div>

        </div>
    );
}


export default PhotosAboutMe;