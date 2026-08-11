import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";
import simpleLogo from "../Asset/niyati-logo-simple.jpeg";
import borderLogo from "../Asset/niyati-logo-border.png";

import "../styles/AboutUs.css";

function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="about-page">

            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <Navbar />

            {/* =====================================================
                MAIN ABOUT CONTENT
            ===================================================== */}

            <main className="about-main">

                {/* =================================================
                    HERO
                ================================================= */}

                <section className="about-hero">

                    <div className="about-hero-content">

                        {/* LOGO 1 - ONLY LOGO, NO BOX */}
                        <div className="about-logo">
                            <img
                                src={simpleLogo}
                                alt="Niyati Matrimony"
                                className="about-main-logo"
                            />
                        </div>

                        <p className="about-small-title">
                            WELCOME TO NIYATI
                        </p>

                        <h1>
                            About <span>Niyati</span>
                        </h1>

                        <div className="about-title-line"></div>

                        <p className="about-hero-text">
                            Where meaningful connections begin and
                            beautiful journeys find their way together.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    OUR STORY
                ================================================= */}

                <section className="about-section">

                    <div className="about-section-heading">

                        <p className="section-label">
                            OUR STORY
                        </p>

                        <h2>
                            Bringing Hearts <span>Together</span>
                        </h2>

                        <div className="heading-line"></div>

                    </div>


                    <div className="about-story-grid">

                        <div className="about-story-content">

                            <p>
                                Niyati is a matrimony platform created
                                to help people discover meaningful
                                relationships and take the first step
                                towards a beautiful future together.
                            </p>

                            <p>
                                We believe that finding a life partner
                                should be a thoughtful and comfortable
                                experience. Niyati brings profiles,
                                preferences and meaningful connections
                                together in one simple platform.
                            </p>

                            <p>
                                Our aim is to create a welcoming space
                                where individuals and families can
                                explore compatible profiles with trust,
                                respect and confidence.
                            </p>

                        </div>


                        <div className="about-highlight">

                            <div className="highlight-icon">
                                ♥
                            </div>

                            <h3>
                                Meaningful
                                <br />
                                Connections
                            </h3>

                            <p>
                                Discover people who share your values,
                                interests and hopes for the future.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    WHY NIYATI
                ================================================= */}

                <section className="about-section why-section">

                    <div className="about-section-heading center-heading">

                        <p className="section-label">
                            WHY NIYATI
                        </p>

                        <h2>
                            A Better Way To Find
                            <span> Your Match</span>
                        </h2>

                        <div className="heading-line"></div>

                    </div>


                    <div className="about-features">

                        <div className="about-feature-card">

                            <div className="feature-number">
                                01
                            </div>

                            <div className="feature-icon">
                                ♡
                            </div>

                            <h3>
                                Meaningful Profiles
                            </h3>

                            <p>
                                Explore profiles and discover
                                connections that match your
                                preferences and expectations.
                            </p>

                        </div>


                        <div className="about-feature-card">

                            <div className="feature-number">
                                02
                            </div>

                            <div className="feature-icon">
                                ✦
                            </div>

                            <h3>
                                Personalized Discovery
                            </h3>

                            <p>
                                Find compatible people based on
                                the information and preferences
                                that matter to you.
                            </p>

                        </div>


                        <div className="about-feature-card">

                            <div className="feature-number">
                                03
                            </div>

                            <div className="feature-icon">
                                ♥
                            </div>

                            <h3>
                                Simple Connections
                            </h3>

                            <p>
                                Wishlist profiles, explore matches
                                and take your next step when you
                                feel comfortable.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    CLOSING
                ================================================= */}

                <section className="about-closing">

                    <div className="closing-decoration">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <h2>
                        Your Journey To
                        <br />
                        <span>Something Beautiful</span>
                    </h2>

                    <p>
                        Every meaningful relationship starts with
                        one simple connection.
                    </p>

                    <button
                        className="explore-button"
                        onClick={() => navigate("/Users")}
                    >
                        Explore Matches
                    </button>

                </section>

            </main>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <footer className="about-footer">

                <div className="footer-main">

                    {/* =================================================
                        FOOTER BRAND
                        LOGO 2 - ONLY LOGO, NO BOX
                    ================================================= */}

                    <div className="footer-brand">

                        <div className="footer-logo">
                            <img
                                src={borderLogo}
                                alt="Niyati Matrimony"
                            />
                        </div>

                        <p>
                            Meaningful connections.
                            <br />
                            Beautiful beginnings.
                        </p>


                        {/* SOCIAL MEDIA */}

                        <div className="footer-social">

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="social-link facebook-link"
                                onClick={(e) =>
                                    e.preventDefault()
                                }
                            >
                                f
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="social-link instagram-link"
                                onClick={(e) =>
                                    e.preventDefault()
                                }
                            >
                                ◎
                            </a>

                        </div>

                    </div>


                    {/* =================================================
                        QUICK LINKS
                    ================================================= */}

                    <div className="footer-column">

                        <h3>
                            Quick Links
                        </h3>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/dashboard");
                            }}
                        >
                            Home
                        </a>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/Users");
                            }}
                        >
                            Matches
                        </a>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/search");
                            }}
                        >
                            Search
                        </a>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/wishlist");
                            }}
                        >
                            Wishlist
                        </a>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/dashboard-users");
                            }}
                        >
                            Success Stories
                        </a>

                    </div>


                    {/* =================================================
                        SUPPORT
                    ================================================= */}

                    <div className="footer-column">

                        <h3>
                            Support
                        </h3>

                        <a
                            href="#"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            Help Center
                        </a>

                        <a
                            href="#"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            Terms & Conditions
                        </a>

                        <a
                            href="#"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            Contact Support
                        </a>

                    </div>


                    {/* =================================================
                        CONTACT
                    ================================================= */}

                    <div className="footer-column contact-column">

                        <h3>
                            Contact Us
                        </h3>

                        <a href="tel:6362495482">
                            <span className="contact-symbol">
                                ☎
                            </span>

                            6362495482
                        </a>

                        <a href="mailto:niyatisupport2026@gmail.com">
                            <span className="contact-symbol">
                                ✉
                            </span>

                            <span className="email-text">
                                niyatisupport2026
                                <br />
                                @gmail.com
                            </span>
                        </a>

                    </div>

                </div>


                {/* =================================================
                    FOOTER BOTTOM
                ================================================= */}

                <div className="footer-bottom">

                    <p>
                        © 2026 Niyati Matrimony.
                        All rights reserved.
                    </p>

                    <p>
                        Made with
                        <span className="footer-heart">
                            ♥
                        </span>
                        for meaningful connections.
                    </p>

                </div>

            </footer>
<PageNavigation />
        </div>
    );
}

export default AboutUs;