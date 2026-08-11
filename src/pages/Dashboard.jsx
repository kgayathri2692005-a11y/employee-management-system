import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";
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
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    navigate("/users");
  } else {
    navigate("/login", {
      state: {
        message:
          "Please login or register to explore profiles and discover meaningful connections."
      }
    });
  }
};

const requireLogin = (destination, state = {}) => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    navigate(destination, {
      state
    });
  } else {
    navigate("/login", {
      state: {
        message:
          "Please login or register to access this feature."
      }
    });
  }
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
 Find the Connection You Were Meant For
</h1>

<p className="hero-description">
  Where meaningful relationships begin with trust, understanding and destiny.
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
    className="hero-explore-btn"
    onClick={() => {
        toast.info(
            "Please login or register to explore profiles and discover meaningful connections."
        );

        setTimeout(() => {
            navigate("/login", {
                state: {
                    message:
                        "Please login or register to explore profiles and discover meaningful connections."
                }
            });
        }, 3200);
    }}
>
    Explore Profiles
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
  requireLogin("/dashboard-users", {
    type: "totalUsers"
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
  requireLogin("/dashboard-users", {
    type: "activeUsers"
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
      {/* =================================================
          HOW NIYATI WORKS
      ================================================= */}

      <section className="how-niyati-works">

        <div className="how-section-heading">

          <span className="how-heading-decoration">
            ✦
          </span>

          <h2>
            How Niyati Works
          </h2>

          <span className="how-heading-decoration">
            ✦
          </span>

        </div>

        <p className="how-section-subtitle">
          A simple journey towards a meaningful connection.
        </p>


        <div className="how-steps">

          {/* STEP 01 */}

          <div className="how-step">

            <div className="how-step-number">
              01
            </div>

            <div className="how-step-icon">
              ♡
            </div>

            <h3>
              Create Your Profile
            </h3>

            <p>
              Tell us about yourself,
              your interests and what
              you are looking for.
            </p>

          </div>


          <div className="how-step-connector">
            <span>→</span>
          </div>


          {/* STEP 02 */}

          <div className="how-step">

            <div className="how-step-number">
              02
            </div>

            <div className="how-step-icon">
              ✦
            </div>

            <h3>
              Discover Connections
            </h3>

            <p>
              Explore meaningful
              profiles based on
              compatibility.
            </p>

          </div>


          <div className="how-step-connector">
            <span>→</span>
          </div>


          {/* STEP 03 */}

          <div className="how-step">

            <div className="how-step-number">
              03
            </div>

            <div className="how-step-icon">
              ♡
            </div>

            <h3>
              Start a Conversation
            </h3>

            <p>
              Connect with someone
              who feels right.
            </p>

          </div>


          <div className="how-step-connector">
            <span>→</span>
          </div>


          {/* STEP 04 */}

          <div className="how-step">

            <div className="how-step-number">
              04
            </div>

            <div className="how-step-icon">
              ♥
            </div>

            <h3>
              Build Your Story
            </h3>

            <p>
              Take your connection
              towards something
              meaningful.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          WHY CHOOSE NIYATI
      ================================================= */}

      <section className="why-niyati">

        <div className="why-niyati-inner">

          <div className="why-section-heading">

            <span className="why-heading-decoration">
              ✦
            </span>

            <h2>
              Why Choose Niyati?
            </h2>

            <span className="why-heading-decoration">
              ✦
            </span>

          </div>

          <p className="why-section-subtitle">
            Because meaningful connections deserve
            a thoughtful beginning.
          </p>


          <div className="why-features">

            {/* FEATURE 01 */}

            <div className="why-feature-card">

              <div className="why-feature-icon">
                ♡
              </div>

              <div className="why-feature-content">

                <h3>
                  Meaningful Connections
                </h3>

                <p>
                  Find people looking for
                  genuine and meaningful
                  relationships.
                </p>

              </div>

            </div>


            {/* FEATURE 02 */}

            <div className="why-feature-card">

              <div className="why-feature-icon">
                ♧
              </div>

              <div className="why-feature-content">

                <h3>
                  Trusted Profiles
                </h3>

                <p>
                  Profile information designed
                  around authenticity and trust.
                </p>

              </div>

            </div>


            {/* FEATURE 03 */}

            <div className="why-feature-card">

              <div className="why-feature-icon">
                ✦
              </div>

              <div className="why-feature-content">

                <h3>
                  Compatibility Focused
                </h3>

                <p>
                  Discover people based on
                  preferences, values and
                  compatibility.
                </p>

              </div>

            </div>


            {/* FEATURE 04 */}

            <div className="why-feature-card">

              <div className="why-feature-icon">
                ♡
              </div>

              <div className="why-feature-content">

                <h3>
                  Private Conversations
                </h3>

                <p>
                  Connect privately and take
                  your conversations forward
                  with confidence.
                </p>

              </div>

            </div>


            {/* FEATURE 05 */}

            <div className="why-feature-card">

              <div className="why-feature-icon">
                ♥
              </div>

              <div className="why-feature-content">

                <h3>
                  Your Privacy Matters
                </h3>

                <p>
                  Your personal information
                  stays protected while you
                  explore meaningful connections.
                </p>

              </div>

            </div>

          </div>

        </div>
        

      </section>

<PageNavigation />
      

    </div>
  );
  
}


export default Dashboard;