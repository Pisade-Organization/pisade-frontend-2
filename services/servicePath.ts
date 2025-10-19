export const servicePath = {
    auth: {
      sendMagicLink: "/auth/magic-link",
      verifyMagicLink: "/auth/verify-magic-link",
      refresh: "/auth/refresh",
    },
    user: {
      getProfile: "/user/me",
      updateProfile: "/user/me",
    },
    tutor: {
      getTutor: "/tutors/:id",
      getAllTutors: "/tutors",
      getTutorReviews: "/tutors/:id/reviews",
    },
    // add more modules later...
  };
  