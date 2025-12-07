export const servicePath = {
    auth: {
      sendMagicLink: "/auth/magic-link", // POST
      verifyMagicLink: "/auth/verify-magic-link", // GET
      refresh: "/auth/refresh", // GET
    },
    user: {
      getProfile: "/user/me", // GET
      updateProfile: "/user/me", // PUT
    },
    tutor: {
      getTutor: "/tutors/:id", // GET
      getAllTutors: "/tutors", // GEt
      getTutorReviews: "/tutors/:id/reviews", // GET
    },
    onboarding: {
      getOnboardingStepOne: "/onboarding/step-1", // GET
      saveOnboardingStepOne: "/onboarding/step-1", // POST

      getOnboardingStepTwo: "/onboarding/step-2", // GET
      saveOnboardingStepTwo: "/onboarding/step-2", // POST

      getOnboardingStepFive: "/onboarding/step-5", // GET
      saveOnboardingStepFive: "/onboarding/step-5" // POST
    },
    upload: {
      getPresignedUrl: '/upload/presigned', // GET
      deleteObject: '/upload/deleteObject' // DELETE
    }
  };
  