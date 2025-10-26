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
    onboarding: {
      getOnboardingStepOne: "/onboarding/step-1",
      saveOnboardingStepOne: "/onboarding/step-1",

      getOnboardingStepTwo: "/onboarding/step-2",
      saveOnboardingStepTwo: "/onboarding/step-2"
    }
  };
  