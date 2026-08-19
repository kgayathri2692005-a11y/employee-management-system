import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/DashboardUserDetails.css";

function DashboardUserDetails() {
  const navigate = useNavigate();

  const [pairs, setPairs] = useState([]);

  /*
  =====================================================
  GET PROFILE IMAGE
  =====================================================
  */

  const getProfileImage = (profile) => {
    if (!profile) {
      return "https://randomuser.me/api/portraits/lego/1.jpg";
    }

    if (
      typeof profile.profilePhoto === "string" &&
      profile.profilePhoto.trim() !== ""
    ) {
      return profile.profilePhoto;
    }

    if (
      Array.isArray(profile.additionalPhotos) &&
      profile.additionalPhotos.length > 0
    ) {
      const photo = profile.additionalPhotos.find(
        (item) =>
          typeof item === "string" &&
          item.trim() !== ""
      );

      if (photo) {
        return photo;
      }
    }

    if (
      typeof profile.profileImage === "string" &&
      profile.profileImage.trim() !== ""
    ) {
      return profile.profileImage;
    }

    return "https://randomuser.me/api/portraits/lego/1.jpg";
  };

  /*
  =====================================================
  GET PROFILE NAME
  =====================================================
  */

  const getProfileName = (profile, email) => {
    const fullName = `${profile?.firstName || ""} ${
      profile?.lastName || ""
    }`
      .trim()
      .replace(/\s+/g, " ");

    return (
      fullName ||
      profile?.userName ||
      profile?.fullName ||
      email ||
      "Niyati Member"
    );
  };

  /*
  =====================================================
  GET VALUE
  =====================================================
  */

  const getValue = (profile, keys) => {
    for (const key of keys) {
      if (
        profile?.[key] !== undefined &&
        profile?.[key] !== null &&
        String(profile[key]).trim() !== ""
      ) {
        return String(profile[key]).trim();
      }
    }

    return "";
  };

  /*
  =====================================================
  CREATE COMPATIBILITY STORY
  =====================================================
  */

  const getCompatibilityStory = (profile1, profile2) => {
    const values1 = [
      getValue(profile1, ["religion"]),
      getValue(profile1, ["community"]),
      getValue(profile1, ["education"]),
      getValue(profile1, ["occupation"]),
      getValue(profile1, ["city", "currentCity"]),
    ].filter(Boolean);

    const values2 = [
      getValue(profile2, ["religion"]),
      getValue(profile2, ["community"]),
      getValue(profile2, ["education"]),
      getValue(profile2, ["occupation"]),
      getValue(profile2, ["city", "currentCity"]),
    ].filter(Boolean);

    const commonValues = [];

    values1.forEach((value) => {
      if (
        values2.some(
          (otherValue) =>
            otherValue.toLowerCase() === value.toLowerCase()
        )
      ) {
        commonValues.push(value);
      }
    });

    /*
    -----------------------------------------------
    SAME COMMUNITY / RELIGION
    -----------------------------------------------
    */

    const religion1 = getValue(profile1, ["religion"]);
    const religion2 = getValue(profile2, ["religion"]);

    const community1 = getValue(profile1, ["community"]);
    const community2 = getValue(profile2, ["community"]);

    if (
      religion1 &&
      religion2 &&
      religion1.toLowerCase() === religion2.toLowerCase()
    ) {
      if (
        community1 &&
        community2 &&
        community1.toLowerCase() === community2.toLowerCase()
      ) {
        return "They found a beautiful connection through shared values, traditions and a strong sense of understanding.";
      }

      return "They connected through shared values, traditions and a natural understanding of each other.";
    }

    /*
    -----------------------------------------------
    SAME CITY
    -----------------------------------------------
    */

    const city1 = getValue(profile1, [
      "city",
      "currentCity",
    ]);

    const city2 = getValue(profile2, [
      "city",
      "currentCity",
    ]);

    if (
      city1 &&
      city2 &&
      city1.toLowerCase() === city2.toLowerCase()
    ) {
      return "Being from the same city brought them closer, creating a comfortable beginning for a beautiful relationship.";
    }

    /*
    -----------------------------------------------
    SAME EDUCATION
    -----------------------------------------------
    */

    const education1 = getValue(profile1, [
      "education",
      "highestEducation",
    ]);

    const education2 = getValue(profile2, [
      "education",
      "highestEducation",
    ]);

    if (
      education1 &&
      education2 &&
      education1.toLowerCase() === education2.toLowerCase()
    ) {
      return "Their similar educational journey helped create meaningful conversations and a strong connection.";
    }

    /*
    -----------------------------------------------
    SAME OCCUPATION
    -----------------------------------------------
    */

    const occupation1 = getValue(profile1, [
      "occupation",
      "profession",
      "job",
    ]);

    const occupation2 = getValue(profile2, [
      "occupation",
      "profession",
      "job",
    ]);

    if (
      occupation1 &&
      occupation2 &&
      occupation1.toLowerCase() === occupation2.toLowerCase()
    ) {
      return "Their shared professional journey gave them common ground and helped their understanding grow naturally.";
    }

    /*
    -----------------------------------------------
    COMMON DATA
    -----------------------------------------------
    */

    if (commonValues.length > 0) {
      return "They discovered common ground, mutual understanding and the kind of connection that makes two people feel meant to meet.";
    }

    /*
    -----------------------------------------------
    DEFAULT
    -----------------------------------------------
    */

    return "They connected through understanding, shared values and a beautiful bond that brought their journeys together.";
  };

  /*
  =====================================================
  LOAD MATCHED PAIRS
  =====================================================
  */

  useEffect(() => {
    const loadMatchedPairs = () => {
      const allProfiles =
        JSON.parse(
          localStorage.getItem("allProfiles")
        ) || {};

      const matchedUsers =
        JSON.parse(
          localStorage.getItem("matchedUsers")
        ) || [];

      if (!Array.isArray(matchedUsers)) {
        setPairs([]);
        return;
      }

      const formattedPairs = matchedUsers
        .map((match) => {
          const user1 =
            allProfiles[match.user1] || {};

          const user2 =
            allProfiles[match.user2] || {};

          return {
            user1Email: match.user1,
            user2Email: match.user2,

            user1Name:
              getProfileName(
                user1,
                match.user1
              ),

            user2Name:
              getProfileName(
                user2,
                match.user2
              ),

            user1Image:
              getProfileImage(user1),

            user2Image:
              getProfileImage(user2),

            user1Profile: user1,
            user2Profile: user2,

            matchedDate:
              match.matchedDate ||
              match.date ||
              match.createdAt ||
              "",
          };
        })
        .filter(
          (pair) =>
            pair.user1Email &&
            pair.user2Email
        );

      setPairs(formattedPairs);
    };

    loadMatchedPairs();

    window.addEventListener(
      "matchesUpdated",
      loadMatchedPairs
    );

    window.addEventListener(
      "storage",
      loadMatchedPairs
    );

    return () => {
      window.removeEventListener(
        "matchesUpdated",
        loadMatchedPairs
      );

      window.removeEventListener(
        "storage",
        loadMatchedPairs
      );
    };
  }, []);

  /*
  =====================================================
  FORMAT MATCH DATE
  =====================================================
  */

  const formatMatchDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  /*
  =====================================================
  EMPTY STATE
  =====================================================
  */

  const renderEmptyState = () => {
    return (
      <div className="success-empty-state">
        <div className="success-empty-icon">
          ♡
        </div>

        <div className="success-empty-decoration">
          ✦
        </div>

        <h2>
          Beautiful stories begin here
        </h2>

        <p>
          Successful matches will appear here
          as beautiful Niyati success stories.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  };

  /*
  =====================================================
  SUCCESS STORY CARD
  =====================================================
  */

  const renderSuccessStory = (
    pair,
    index
  ) => {
    const story =
      getCompatibilityStory(
        pair.user1Profile,
        pair.user2Profile
      );

    const formattedDate =
      formatMatchDate(
        pair.matchedDate
      );

    return (
      <article
        className="success-story-card"
        key={`${pair.user1Email}-${pair.user2Email}-${index}`}
      >
        {/* Decorative corners */}

        <div className="story-corner story-corner-top-left">
          ❧
        </div>

        <div className="story-corner story-corner-top-right">
          ❧
        </div>

        <div className="story-corner story-corner-bottom-left">
          ❧
        </div>

        <div className="story-corner story-corner-bottom-right">
          ❧
        </div>

        {/* Header */}

        <div className="success-story-header">
          <span className="story-line"></span>

          <span className="story-star">
            ✦
          </span>

          <span className="story-label">
            SUCCESS STORY
          </span>

          <span className="story-star">
            ✦
          </span>

          <span className="story-line"></span>
        </div>

        {/* Couple */}

        <div className="success-couple">
          {/* Person 1 */}

          <div className="success-person">
            <div className="success-photo-wrapper">
              <div className="photo-outer-ring">
                <div className="photo-inner-ring">
                  <img
                    src={
                      pair.user1Image
                    }
                    alt={pair.user1Name}
                    onError={(e) => {
                      e.currentTarget.onerror =
                        null;

                      e.currentTarget.src =
                        "https://randomuser.me/api/portraits/lego/1.jpg";
                    }}
                  />
                </div>
              </div>

              <span className="photo-heart">
                ♥
              </span>
            </div>

            <h3>
              {pair.user1Name}
            </h3>

            <span className="person-caption">
              Niyati Member
            </span>
          </div>

          {/* Heart */}

          <div className="couple-connection">
            <div className="connection-line"></div>

            <div className="connection-heart">
              <span>♥</span>
            </div>

            <span className="connection-label">
              MATCHED
            </span>
          </div>

          {/* Person 2 */}

          <div className="success-person">
            <div className="success-photo-wrapper">
              <div className="photo-outer-ring">
                <div className="photo-inner-ring">
                  <img
                    src={
                      pair.user2Image
                    }
                    alt={pair.user2Name}
                    onError={(e) => {
                      e.currentTarget.onerror =
                        null;

                      e.currentTarget.src =
                        "https://randomuser.me/api/portraits/lego/1.jpg";
                    }}
                  />
                </div>
              </div>

              <span className="photo-heart">
                ♥
              </span>
            </div>

            <h3>
              {pair.user2Name}
            </h3>

            <span className="person-caption">
              Niyati Member
            </span>
          </div>
        </div>

        {/* Story */}

        <div className="story-content">
          <div className="story-title">
            <span>♡</span>

            <h2>
              A Beautiful Connection
            </h2>

            <span>♡</span>
          </div>

          <p className="story-description">
            “{story}”
          </p>
        </div>

        {/* Footer */}

        <div className="story-footer">
          <div className="footer-decoration">
            <span></span>
            <i>♥</i>
            <span></span>
          </div>

          <div className="matched-text">
            <strong>
              ♥ Matched on Niyati
            </strong>

            {formattedDate && (
              <span>
                {formattedDate}
              </span>
            )}
          </div>

          <div className="footer-decoration">
            <span></span>
            <i>♥</i>
            <span></span>
          </div>
        </div>

        {/* Privacy note */}

        <div className="story-privacy">
          <span>♡</span>
          Shared with love, respecting
          member privacy
          <span>♡</span>
        </div>
      </article>
    );
  };

  /*
  =====================================================
  MAIN RENDER
  =====================================================
  */

  return (
    <div className="success-stories-page">
      <Navbar />

      <main className="success-stories-container">
        {/* Page Heading */}

        <section className="success-page-heading">
          <div className="heading-decoration">
            <span></span>
            <i>✦</i>
            <span></span>
          </div>

          <p className="heading-eyebrow">
            NIYATI MATRIMONY
          </p>

          <h1>
            Success Stories
          </h1>

          <p className="heading-description">
            Every match is the beginning of a
            beautiful journey together.
          </p>

          <div className="heading-heart">
            ♥
          </div>
        </section>

        {/* Count */}

        {pairs.length > 0 && (
          <div className="success-count">
            <span className="count-heart">
              ♥
            </span>

            <strong>
              {pairs.length}
            </strong>

            <span>
              {pairs.length === 1
                ? "SUCCESSFUL MATCH"
                : "SUCCESSFUL MATCHES"}
            </span>

            <span className="count-heart">
              ♥
            </span>
          </div>
        )}

        {/* Stories */}

        {pairs.length === 0 ? (
          renderEmptyState()
        ) : (
          <section className="success-stories-grid">
            {pairs.map(
              renderSuccessStory
            )}
          </section>
        )}

        {/* Bottom decoration */}

        <div className="success-bottom-decoration">
          <span></span>
          <span>✦</span>
          <span></span>
        </div>
      </main>
    </div>
  );
}

export default DashboardUserDetails;