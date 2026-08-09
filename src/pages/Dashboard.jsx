import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState({});
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [successIndex, setSuccessIndex] = useState(0);
  const [visibleStories, setVisibleStories] = useState(3);

  /*
  =========================================================
  LOAD REAL LOCALSTORAGE DATA
  =========================================================
  */

  const loadDashboardData = () => {
    try {
      const storedProfiles =
        JSON.parse(localStorage.getItem("allProfiles")) || {};

      const storedMatches =
        JSON.parse(localStorage.getItem("matchedUsers")) || [];

      setProfiles(
        storedProfiles &&
          typeof storedProfiles === "object"
          ? storedProfiles
          : {}
      );

      setMatchedUsers(
        Array.isArray(storedMatches)
          ? storedMatches
          : []
      );
    } catch (error) {
      console.error(
        "Dashboard data loading error:",
        error
      );

      setProfiles({});
      setMatchedUsers([]);
    }
  };

  useEffect(() => {
    loadDashboardData();

    window.addEventListener(
      "profileUpdated",
      loadDashboardData
    );

    window.addEventListener(
      "matchesUpdated",
      loadDashboardData
    );

    window.addEventListener(
      "storage",
      loadDashboardData
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        loadDashboardData
      );

      window.removeEventListener(
        "matchesUpdated",
        loadDashboardData
      );

      window.removeEventListener(
        "storage",
        loadDashboardData
      );
    };
  }, []);

  /*
  =========================================================
  PROFILE ARRAY
  =========================================================
  */

  const profileEntries = useMemo(() => {
    return Object.entries(profiles);
  }, [profiles]);

  /*
  =========================================================
  USER STATUS
  =========================================================
  */

  const getUserStatus = (profile) => {
    if (profile?.isActive === true) {
      return "Active";
    }

    if (profile?.isActive === false) {
      return "Inactive";
    }

    if (
      typeof profile?.status === "string" &&
      profile.status.trim()
    ) {
      return profile.status.trim().toLowerCase() === "inactive"
        ? "Inactive"
        : "Active";
    }

    return "Active";
  };

  /*
  =========================================================
  STATISTICS
  =========================================================
  */

  const totalProfiles =
    profileEntries.length;

  const activeProfiles =
    profileEntries.filter(
      ([, profile]) =>
        getUserStatus(profile) === "Active"
    ).length;

  const inactiveProfiles =
    profileEntries.filter(
      ([, profile]) =>
        getUserStatus(profile) === "Inactive"
    ).length;

  const totalMatches =
    matchedUsers.length;

  /*
  =========================================================
  CURRENT USER
  =========================================================
  */

  const loggedInUser =
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || {};

  /*
  =========================================================
  SUCCESS STORY DATA

  Uses REAL profiles.

  If matchedUsers contains email references,
  those profiles are resolved from allProfiles.
  =========================================================
  */

  const successStories = useMemo(() => {
    const result = [];

    const getEmail = (value) => {
      if (!value) return null;

      if (typeof value === "string") {
        return value;
      }

      if (typeof value === "object") {
        return (
          value.email ||
          value.userEmail ||
          value.from ||
          value.to ||
          null
        );
      }

      return null;
    };

    /*
    -----------------------------------------------
    FIRST: TRY REAL MATCHED USERS
    -----------------------------------------------
    */

    matchedUsers.forEach((match) => {
      if (!match) return;

      let firstEmail = null;
      let secondEmail = null;

      if (Array.isArray(match)) {
        firstEmail = getEmail(match[0]);
        secondEmail = getEmail(match[1]);
      } else if (typeof match === "object") {
        firstEmail =
          match.user1 ||
          match.user1Email ||
          match.firstUser ||
          match.from ||
          match.sender ||
          match.email1 ||
          null;

        secondEmail =
          match.user2 ||
          match.user2Email ||
          match.secondUser ||
          match.to ||
          match.receiver ||
          match.email2 ||
          null;

        firstEmail = getEmail(firstEmail);
        secondEmail = getEmail(secondEmail);
      }

      if (!firstEmail || !secondEmail) {
        return;
      }

      const firstProfile =
        profiles[firstEmail] ||
        profiles[firstEmail?.trim()];

      const secondProfile =
        profiles[secondEmail] ||
        profiles[secondEmail?.trim()];

      if (
        firstProfile &&
        secondProfile
      ) {
        result.push({
          first: firstProfile,
          second: secondProfile,
          key: `${firstEmail}-${secondEmail}`
        });
      }
    });

    /*
    -----------------------------------------------
    FALLBACK

    If matchedUsers doesn't contain email pairs,
    use real registered profiles.
    -----------------------------------------------
    */

    if (result.length === 0) {
      const realProfiles =
        profileEntries
          .map(([email, profile]) => ({
            email,
            profile
          }))
          .filter(
            ({ email }) =>
              email !== loggedInUser?.email
          );

      for (
        let i = 0;
        i < realProfiles.length - 1 &&
        result.length < 6;
        i += 2
      ) {
        const first =
          realProfiles[i];

        const second =
          realProfiles[i + 1];

        if (first && second) {
          result.push({
            first: first.profile,
            second: second.profile,
            key: `${first.email}-${second.email}`
          });
        }
      }
    }

    return result.slice(0, 6);
  }, [
    matchedUsers,
    profiles,
    profileEntries,
    loggedInUser?.email
  ]);

  /*
  =========================================================
  DETERMINE HOW MANY STORIES ARE VISIBLE
  =========================================================
  */

  useEffect(() => {
    const updateVisibleStories = () => {
      if (window.innerWidth <= 560) {
        setVisibleStories(1);
      } else if (window.innerWidth <= 800) {
        setVisibleStories(2);
      } else {
        setVisibleStories(3);
      }
    };

    updateVisibleStories();

    window.addEventListener(
      "resize",
      updateVisibleStories
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleStories
      );
    };
  }, []);

  /*
  =========================================================
  KEEP INDEX VALID WHEN SCREEN SIZE CHANGES
  =========================================================
  */

  useEffect(() => {
    const maxIndex = Math.max(
      0,
      successStories.length - visibleStories
    );

    if (successIndex > maxIndex) {
      setSuccessIndex(maxIndex);
    }
  }, [
    successStories.length,
    visibleStories,
    successIndex
  ]);

  /*
  =========================================================
  SUCCESS STORIES AUTO SLIDER
  =========================================================
  */

  useEffect(() => {
    if (
      successStories.length <= visibleStories
    ) {
      return;
    }

    const interval = setInterval(() => {
      setSuccessIndex((current) => {
        const maxIndex =
          successStories.length - visibleStories;

        if (current >= maxIndex) {
          return 0;
        }

        return current + 1;
      });
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [
    successStories.length,
    visibleStories
  ]);

  /*
  =========================================================
  PREVIOUS SUCCESS STORY
  =========================================================
  */

  const previousSuccessStory = () => {
    if (successStories.length === 0) {
      return;
    }

    const maxIndex =
      Math.max(
        0,
        successStories.length - visibleStories
      );

    setSuccessIndex((current) => {
      if (current <= 0) {
        return maxIndex;
      }

      return current - 1;
    });
  };

  /*
  =========================================================
  NEXT SUCCESS STORY
  =========================================================
  */

  const nextSuccessStory = () => {
    if (successStories.length === 0) {
      return;
    }

    const maxIndex =
      Math.max(
        0,
        successStories.length - visibleStories
      );

    setSuccessIndex((current) => {
      if (current >= maxIndex) {
        return 0;
      }

      return current + 1;
    });
  };

  /*
  =========================================================
  PROFILE HELPERS
  =========================================================
  */

  const getFullName = (profile) => {
    if (!profile) {
      return "Niyati Member";
    }

    const name = [
      profile.firstName,
      profile.lastName
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      name ||
      profile.userName ||
      profile.fullName ||
      profile.name ||
      "Niyati Member"
    );
  };

  const getPhoto = (profile) => {
    return (
      profile?.profilePhoto ||
      profile?.profileImage ||
      profile?.photo ||
      profile?.image ||
      "/logo.jpeg"
    );
  };

  const getLocation = (profile) => {
    return (
      profile?.location ||
      profile?.city ||
      profile?.currentLocation ||
      "Niyati Matrimony"
    );
  };

  /*
  =========================================================
  NAVIGATION
  =========================================================
  */

  const browseProfiles = () => {
    navigate("/users");
  };

  const registerFree = () => {
    navigate("/register");
  };

  const openMatchedUsers = () => {
    navigate("/dashboard-users", {
      state: {
        type: "totalPairs"
      }
    });
  };

  /*
  =========================================================
  SUCCESS SLIDER CALCULATION
  =========================================================

  Each card has a fixed percentage width depending
  on how many cards are visible.

  Desktop = 3 cards
  Tablet  = 2 cards
  Mobile  = 1 card
  =========================================================
  */

  const getSliderTransform = () => {
    if (visibleStories === 3) {
      return `translateX(calc(-${successIndex} * (33.333333% + 6.666667px)))`;
    }

    if (visibleStories === 2) {
      return `translateX(calc(-${successIndex} * (50% + 10px)))`;
    }

    return `translateX(calc(-${successIndex} * 100%))`;
  };

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <div className="niyati-dashboard">

      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="niyati-hero">

        <div className="hero-inner">

          <div className="hero-content">

            <div className="hero-kicker">
              <span></span>
              NIYATI MATRIMONY
            </div>

            <h1>
              Find Your
              <span>
                Destined Partner
              </span>
            </h1>

            <p className="hero-description">
              Where Hearts Meet,
              <br />
              Families Unite.
            </p>

            <div className="hero-actions">

              <button
                type="button"
                className="primary-btn"
                onClick={registerFree}
              >
                Register Free
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={browseProfiles}
              >
                Browse Profiles
              </button>

            </div>

          </div>

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="hero-logo-area">

            <div className="hero-logo-glow"></div>

            <img
              src="/borderlogo.png"
              alt="Niyati Destined Together"
              className="hero-logo"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          TRUST FEATURES
      ================================================= */}

      <section className="trust-section">

        <div className="trust-grid">

          <div className="trust-item">

            <div className="trust-icon">
              ✓
            </div>

            <div>
              <h3>
                Verified Profiles
              </h3>

              <p>
                100% verified for
                your safety
              </p>
            </div>

          </div>

          <div className="trust-item">

            <div className="trust-icon">
              ♙
            </div>

            <div>
              <h3>
                Secure &amp; Safe
              </h3>

              <p>
                We value your
                privacy
              </p>
            </div>

          </div>

          <div className="trust-item">

            <div className="trust-icon">
              ♡
            </div>

            <div>
              <h3>
                Smart Matches
              </h3>

              <p>
                Aqalwert match
                making
              </p>
            </div>

          </div>

          <div className="trust-item">

            <div className="trust-icon">
              ♡
            </div>

            <div>
              <h3>
                Happy Stories
              </h3>

              <p>
                Thousands of
                success stories
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          SUCCESS STORIES
      ================================================= */}

      <section className="success-section">

        <div className="section-heading">

          <span className="heading-decoration">
            ✦
          </span>

          <h2>
            Success Stories
          </h2>

          <span className="heading-decoration">
            ✦
          </span>

        </div>

        <p className="section-subtitle">
          Real people. Real connections.
          Real beginnings.
        </p>

        {successStories.length > 0 ? (

          <div
            className="success-carousel"
            onMouseEnter={() => {}}
          >

            {/* PREVIOUS */}

            <button
              type="button"
              className="success-arrow success-arrow-left"
              onClick={previousSuccessStory}
              aria-label="Previous success story"
            >
              ‹
            </button>

            {/* =================================================
                VIEWPORT
            ================================================= */}

            <div className="success-slider">

              <div
                className="success-slider-track"
                style={{
                  transform: getSliderTransform()
                }}
              >

                {successStories.map((story) => (

                  <div
                    className="success-slide"
                    key={story.key}
                  >

                    <article className="success-card">

                      <div className="couple-images">

                        <div className="story-person">
                          <img
                            src={getPhoto(story.first)}
                            alt={getFullName(story.first)}
                          />
                        </div>

                        <div className="story-person">
                          <img
                            src={getPhoto(story.second)}
                            alt={getFullName(story.second)}
                          />
                        </div>

                      </div>

                      <div className="success-card-content">

                        <h3>
                          {getFullName(story.first)}

                          <span>
                            &amp;
                          </span>

                          {getFullName(story.second)}
                        </h3>

                        <p>

                          <span className="heart-small">
                            ♥
                          </span>

                          Found their connection
                          through Niyati

                        </p>

                      </div>

                    </article>

                  </div>

                ))}

              </div>

            </div>

            {/* NEXT */}

            <button
              type="button"
              className="success-arrow success-arrow-right"
              onClick={nextSuccessStory}
              aria-label="Next success story"
            >
              ›
            </button>

          </div>

        ) : (

          <div className="empty-success">

            <div className="empty-success-icon">
              ♡
            </div>

            <h3>
              Beautiful stories start here
            </h3>

            <p>
              As members find their
              destined partners, their
              stories will appear here.
            </p>

            <button
              type="button"
              onClick={browseProfiles}
            >
              Explore Profiles
            </button>

          </div>

        )}

      </section>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="niyati-stats">

        <div className="stats-inner">

          <div
            className="stat-item clickable"
            onClick={() =>
              navigate("/dashboard-users", {
                state: {
                  type: "totalUsers"
                }
              })
            }
          >

            <div className="stat-icon">
              ♡
            </div>

            <div>

              <strong>
                {totalProfiles}
              </strong>

              <span>
                Profiles
              </span>

            </div>

          </div>

          <div
            className="stat-item clickable"
            onClick={() =>
              navigate("/dashboard-users", {
                state: {
                  type: "activeUsers"
                }
              })
            }
          >

            <div className="stat-icon">
              ✓
            </div>

            <div>

              <strong>
                {activeProfiles}
              </strong>

              <span>
                Active Profiles
              </span>

            </div>

          </div>

          <div
            className="stat-item clickable"
            onClick={openMatchedUsers}
          >

            <div className="stat-icon">
              ♥
            </div>

            <div>

              <strong>
                {totalMatches}
              </strong>

              <span>
                Successful Matches
              </span>

            </div>

          </div>

          <div className="stat-item">

            <div className="stat-icon">
              ★
            </div>

            <div>

              <strong>
                4.8/5
              </strong>

              <span>
                User Rating
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;