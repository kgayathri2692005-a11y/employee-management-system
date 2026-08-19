// =====================================================
// PROFILE VIEW UTILITIES
// =====================================================


// Get all profile view records
export const getProfileViews = () => {
    return JSON.parse(
        localStorage.getItem("profileViews")
    ) || [];
};


// Save all profile view records
export const saveProfileViews = (views) => {
    localStorage.setItem(
        "profileViews",
        JSON.stringify(views)
    );
};


// Record a profile view
export const recordProfileView = (
    viewer,
    viewedProfile
) => {

    if (
        !viewer?.email ||
        !viewedProfile?.email
    ) {
        return;
    }


    // Don't record viewing your own profile
    if (
        viewer.email.toLowerCase() ===
        viewedProfile.email.toLowerCase()
    ) {
        return;
    }


    const views = getProfileViews();


    const viewerEmail =
        viewer.email.toLowerCase();

    const viewedEmail =
        viewedProfile.email.toLowerCase();


    // Check whether this view already exists
    const existingIndex =
        views.findIndex(
            (view) =>
                view.viewerEmail === viewerEmail &&
                view.viewedEmail === viewedEmail
        );


    const now =
        new Date().toISOString();


    // If already viewed before,
    // update the latest viewed time
    if (existingIndex !== -1) {

        views[existingIndex].viewedAt =
            now;

    } else {

        // Create a new view record
        views.push({

            id:
                Date.now().toString(),

            viewerEmail:
                viewerEmail,

            viewerName:
                viewer.name ||
                viewer.userName ||
                "",

            viewedEmail:
                viewedEmail,

            viewedName:
                viewedProfile.name ||
                viewedProfile.userName ||
                "",

            viewedAt:
                now

        });

    }


    saveProfileViews(views);


    // Create notification for the person
    // whose profile was viewed
    createProfileViewNotification(
        viewer,
        viewedProfile
    );
};


// =====================================================
// NOTIFICATIONS
// =====================================================

export const getProfileViewNotifications = () => {

    return JSON.parse(
        localStorage.getItem(
            "profileViewNotifications"
        )
    ) || [];

};


export const saveProfileViewNotifications = (
    notifications
) => {

    localStorage.setItem(
        "profileViewNotifications",
        JSON.stringify(notifications)
    );

};


// Create notification
export const createProfileViewNotification = (
    viewer,
    viewedProfile
) => {

    if (
        !viewer?.email ||
        !viewedProfile?.email
    ) {
        return;
    }


    const notifications =
        getProfileViewNotifications();


    const receiverEmail =
        viewedProfile.email.toLowerCase();


    const senderEmail =
        viewer.email.toLowerCase();


    // Don't create notification for yourself
    if (
        receiverEmail === senderEmail
    ) {
        return;
    }


    // Check if this person already has
    // an unread profile-view notification
    const existingNotification =
        notifications.find(
            (notification) =>
                notification.receiverEmail ===
                    receiverEmail &&
                notification.senderEmail ===
                    senderEmail &&
                notification.type ===
                    "profile_view" &&
                notification.isRead === false
        );


    // Don't create duplicate unread notifications
    if (existingNotification) {

        existingNotification.createdAt =
            new Date().toISOString();

        saveProfileViewNotifications(
            notifications
        );

        window.dispatchEvent(
    new Event("notificationsUpdated")
);

        return;
    }


    notifications.unshift({

        id:
            Date.now().toString(),

        type:
            "profile_view",

        receiverEmail:
            receiverEmail,

        senderEmail:
            senderEmail,

        senderName:
            viewer.name ||
            viewer.userName ||
            "Someone",

        message:
            `${
                viewer.name ||
                viewer.userName ||
                "Someone"
            } viewed your profile`,

        createdAt:
            new Date().toISOString(),

        isRead:
            false

    });


    saveProfileViewNotifications(
        notifications
    );

};


// =====================================================
// GET PROFILES I VIEWED
// =====================================================

export const getMyViewedProfiles = (
    loggedInEmail
) => {

    if (!loggedInEmail) {
        return [];
    }


    const email =
        loggedInEmail.toLowerCase();


    return getProfileViews()
        .filter(
            (view) =>
                view.viewerEmail === email
        )
        .sort(
            (a, b) =>
                new Date(b.viewedAt) -
                new Date(a.viewedAt)
        );

};


// =====================================================
// GET PEOPLE WHO VIEWED ME
// =====================================================

export const getWhoViewedMe = (
    loggedInEmail
) => {

    if (!loggedInEmail) {
        return [];
    }


    const email =
        loggedInEmail.toLowerCase();


    return getProfileViews()
        .filter(
            (view) =>
                view.viewedEmail === email
        )
        .sort(
            (a, b) =>
                new Date(b.viewedAt) -
                new Date(a.viewedAt)
        );

};


// =====================================================
// GET MY NOTIFICATIONS
// =====================================================

export const getMyProfileViewNotifications = (
    loggedInEmail
) => {

    if (!loggedInEmail) {
        return [];
    }


    const email =
        loggedInEmail.toLowerCase();


    return getProfileViewNotifications()
        .filter(
            (notification) =>
                notification.receiverEmail ===
                email
        );

};


// =====================================================
// MARK NOTIFICATION AS READ
// =====================================================

export const markProfileViewNotificationAsRead = (
    notificationId
) => {

    const notifications =
        getProfileViewNotifications();


    const updated =
        notifications.map(
            (notification) => {

                if (
                    notification.id ===
                    notificationId
                ) {

                    return {
                        ...notification,
                        isRead: true
                    };

                }


                return notification;

            }
        );


    saveProfileViewNotifications(
        updated
    );

};