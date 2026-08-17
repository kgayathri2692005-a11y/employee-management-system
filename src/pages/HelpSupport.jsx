import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/HelpSupport.css";

function HelpSupport() {

    const [openCategory, setOpenCategory] = useState(null);
    const [openQuestion, setOpenQuestion] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showContactForm, setShowContactForm] = useState(false);
const [submitted, setSubmitted] = useState(false);

    const toggleCategory = (category) => {
    setOpenCategory(
        openCategory === category ? null : category
    );

    setOpenQuestion(null);
};

const toggleQuestion = (question) => {
    setOpenQuestion(
        openQuestion === question ? null : question
    );
};
const faqCategories = [
    {
        id: "getting-started",
        icon: "♡",
        title: "Getting Started",
        description: "Learn how to create and manage your Niyati profile",
        questions: [
            {
                question: "How do I complete my profile?",
                answer:
                    "Go to your profile and complete the required personal, family, education, lifestyle and partner preference details. Completing your profile helps other members understand you better."
            },
            {
                question: "How do I edit my profile?",
                answer:
                    "Open My Profile from your profile menu. You can update your personal information, education, family details, lifestyle information and partner preferences whenever required."
            },
            {
                question: "How do I change my profile photo?",
                answer:
                    "Open your profile and use the photo section to update your profile photo. Choose a clear and appropriate photograph that represents you well."
            }
        ]
    },

    {
        id: "matches",
        icon: "♡",
        title: "Matches & Interests",
        description: "Learn about matches and interests",
        questions: [
            {
                question: "How are matches suggested?",
                answer:
                    "Matches are suggested based on the information in your profile and your partner preferences. Keeping your profile information updated can help you find more suitable matches."
            },
            {
                question: "How do I send an interest?",
                answer:
                    "Open the profile of the person you are interested in and select the Interest option. The person will receive your interest request."
            },
            {
                question: "How do I accept an interest?",
                answer:
                    "When you receive an interest request, open the request and choose the appropriate option to accept it."
            },
            {
                question: "How do I ignore a profile?",
                answer:
                    "Open the profile you do not want to see and select the Ignore option. The profile will then be moved to your Ignored Profiles section."
            }
        ]
    },

    {
        id: "privacy",
        icon: "♡",
        title: "Privacy & Safety",
        description: "Keep your profile safe and private",
        questions: [
            {
                question: "Who can view my profile?",
                answer:
                    "Your profile visibility depends on the privacy options available in your account. Only share information that you are comfortable making visible to other members."
            },
            {
                question: "How do I hide my profile?",
                answer:
                    "You can manage your profile visibility through your account settings. When profile hiding is available, use the privacy settings to control who can view your profile."
            },
            {
                question: "How do I ignore a profile?",
                answer:
                    "Use the Ignore option on a profile that you do not wish to interact with. You can find ignored profiles in the Ignored Profiles section."
            },
            {
                question: "How can I report a profile?",
                answer:
                    "If you notice suspicious, inappropriate or misleading activity, use the available reporting option or contact Niyati Matrimony support with the relevant profile details."
            }
        ]
    },

    {
        id: "account",
        icon: "♙",
        title: "Account & Security",
        description: "Manage your account and security",
        questions: [
            {
                question: "How do I change my password?",
                answer:
                    "Use the password management option available in your account. Choose a strong password that is difficult for others to guess and do not share it with anyone."
            },
            {
                question: "How do I change my email address?",
                answer:
                    "Contact support if your account does not provide an option to directly change your registered email address."
            },
            {
                question: "How do I deactivate my account?",
                answer:
                    "If you want to temporarily stop using Niyati Matrimony, use the account deactivation option available in your settings or contact support for assistance."
            },
            {
                question: "How do I delete my account?",
                answer:
                    "If you permanently want to remove your account, use the account deletion option when available or contact Niyati Matrimony support for assistance."
            }
        ]
    },

    {
        id: "photos",
        icon: "▧",
        title: "Photos & Profile",
        description: "Learn about profile photos and verification",
        questions: [
            {
                question: "How do I upload a profile photo?",
                answer:
                    "Open your profile and go to the photo section. Select a clear photograph from your device and save your changes."
            },
            {
                question: "How do I change my profile photo?",
                answer:
                    "Go to your profile photo section and select a new photograph. Save the changes after choosing the new photo."
            },
            {
                question: "What type of photo should I upload?",
                answer:
                    "Use a clear, recent and appropriate photograph where your face is clearly visible. Avoid heavily edited, blurry or misleading photographs."
            }
        ]
    },

    {
        id: "problem",
        icon: "!",
        title: "Report a Problem",
        description: "Tell us if something is not working",
        questions: [
            {
                question: "Something is not working on my account",
                answer:
                    "Try refreshing the page and signing in again. If the problem continues, contact our support team and explain what happened so we can help you."
            },
            {
                question: "I found an incorrect profile",
                answer:
                    "If you believe a profile contains incorrect or inappropriate information, please contact support and provide the relevant profile details."
            },
            {
                question: "I am having trouble using a feature",
                answer:
                    "Please describe the feature you are having trouble with and what happens when you try to use it. Our support team can help investigate the issue."
            }
        ]
    }
];

const filteredCategories = faqCategories
    .map((category) => {

        if (!searchTerm.trim()) {
            return category;
        }

        const search = searchTerm.toLowerCase();

        const categoryMatches =
            category.title.toLowerCase().includes(search) ||
            category.description.toLowerCase().includes(search);

        const matchingQuestions = category.questions.filter(
            (item) =>
                item.question.toLowerCase().includes(search) ||
                item.answer.toLowerCase().includes(search)
        );

        if (categoryMatches || matchingQuestions.length > 0) {
            return {
                ...category,
                questions: categoryMatches
                    ? category.questions
                    : matchingQuestions
            };
        }

        return null;
    })
    .filter(Boolean);

    return (
        <>
            <Navbar />

            <main className="help-support-page">

                {/* PAGE HEADER */}

                <section className="help-header">

                    <p className="help-small-title">
                        NIYATI MATRIMONY
                    </p>

                    <h1>
                        Help & Support
                    </h1>

                    <p className="help-subtitle">
                        We're here to help you find your perfect match.
                    </p>

                    <div className="help-header-line">
                        <span></span>
                        <span>♡</span>
                        <span></span>
                    </div>

                </section>


                {/* SEARCH */}

                <section className="help-search-section">

                    <h2>
                        How can we help you?
                    </h2>

                    <div className="help-search-box">

                        <span className="help-search-icon">
                            ⌕
                        </span>

                       <input
    type="text"
    placeholder="Search for help..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>

                    </div>

                </section>


                {/* FAQ */}

                <section className="faq-section">

                    <div className="section-heading">

    <h2>
        Frequently Asked Questions
    </h2>

</div>

                    <div className="faq-grid">

                       {filteredCategories.map((category) => (

                            <div
                                className={`faq-card ${
                                    openCategory === category.id
                                        ? "faq-card-open"
                                        : ""
                                }`}
                                key={category.id}
                            >

                                <button
                                    type="button"
                                    className="faq-card-header"
                                    onClick={() =>
                                        toggleCategory(category.id)
                                    }
                                >

                                    <div className="faq-icon">
                                        {category.icon}
                                    </div>

                                    <div className="faq-title-content">

                                        <h3>
                                            {category.title}
                                        </h3>

                                        <p>
                                            {category.description}
                                        </p>

                                    </div>

                                    <span className="faq-arrow">
                                        {openCategory === category.id
                                            ? "⌃"
                                            : "›"}
                                    </span>

                                </button>


                                {openCategory === category.id && (

                                    <div className="faq-questions">

                                       {category.questions.map((item, index) => (

    <div
        className="faq-question-wrapper"
        key={index}
    >

        <button
            type="button"
            className="faq-question"
            onClick={() =>
                toggleQuestion(
                    `${category.id}-${index}`
                )
            }
        >

            <span>
                •
            </span>

            <p>
                {item.question}
            </p>

            <span className="question-arrow">
                {openQuestion === `${category.id}-${index}`
                    ? "⌃"
                    : "›"}
            </span>

        </button>


        {openQuestion === `${category.id}-${index}` && (

            <div className="faq-answer">

                {item.answer}

            </div>

        )}

    </div>

))}

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                    {searchTerm.trim() && filteredCategories.length === 0 && (
    <div className="no-results">
        <div className="no-results-icon">
            ?
        </div>

        <h3>
            No results found
        </h3>

        <p>
            We couldn't find anything matching "{searchTerm}".
        </p>
    </div>
)}

                </section>


                {/* CONTACT SUPPORT */}

                <section className="contact-support">

                    <div className="contact-content">

                        <div className="contact-icon">
                            ♡
                        </div>

                        <div>

                            <h2>
                                Still need help?
                            </h2>

                            <p>
                                Our support team is here to assist you.
                            </p>

                        </div>

                    </div>

                    <button
    type="button"
    className="contact-support-button"
    onClick={() => {
        setShowContactForm(true);
        setSubmitted(false);
    }}
>
    Contact Support
</button>

                </section>


                {/* FOOTER MESSAGE */}

                <div className="help-footer-message">

                    <span>♡</span>

                    <p>
                        Your privacy, safety and happiness matter to us.
                    </p>

                    <span>♡</span>

                </div>

            </main>
            {/* CONTACT SUPPORT POPUP */}

{showContactForm && (
    <div className="support-modal-overlay">

        <div className="support-modal">

            {!submitted ? (
                <>
                    <button
                        type="button"
                        className="support-close-button"
                        onClick={() =>
                            setShowContactForm(false)
                        }
                    >
                        ×
                    </button>

                    <div className="support-modal-header">

                        <div className="support-modal-icon">
                            ♡
                        </div>

                        <h2>
                            Contact Support
                        </h2>

                        <p>
                            We're here to help you.
                        </p>

                    </div>


                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSubmitted(true);
                        }}
                    >

                        <div className="support-form-group">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                            />

                        </div>


                        <div className="support-form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        <div className="support-form-group">

                            <label>
                                Issue
                            </label>

                            <select required>

                                <option value="">
                                    Select an issue
                                </option>

                                <option value="account">
                                    Account & Security
                                </option>

                                <option value="profile">
                                    Profile & Photos
                                </option>

                                <option value="matches">
                                    Matches & Interests
                                </option>

                                <option value="privacy">
                                    Privacy & Safety
                                </option>

                                <option value="technical">
                                    Technical Problem
                                </option>

                                <option value="other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="support-form-group">

                            <label>
                                Message
                            </label>

                            <textarea
                                placeholder="Tell us how we can help..."
                                rows="4"
                                required
                            ></textarea>

                        </div>


                        <button
                            type="submit"
                            className="support-submit-button"
                        >
                            Send Message
                        </button>

                    </form>
                </>
            ) : (
                <div className="support-success">

                    <div className="support-success-icon">
                        ✓
                    </div>

                    <h2>
                        Thank You!
                    </h2>

                    <p>
                        Your support request has been submitted
                        successfully.
                    </p>

                    <button
                        type="button"
                        className="support-submit-button"
                        onClick={() =>
                            setShowContactForm(false)
                        }
                    >
                        Close
                    </button>

                </div>
            )}

        </div>

    </div>
)}
        </>
    );
}

export default HelpSupport;