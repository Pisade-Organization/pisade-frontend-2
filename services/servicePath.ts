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
      getCurrentStep: "/onboarding/current-step", // GET

      getOnboardingStepOne: "/onboarding/step-1", // GET
      saveOnboardingStepOne: "/onboarding/step-1", // POST

      getOnboardingStepTwo: "/onboarding/step-2", // GET
      saveOnboardingStepTwo: "/onboarding/step-2", // POST

      getOnboardingStepThree: "/onboarding/step-3", // GET
      saveOnboardingStepThree: "/onboarding/step-3", // POST

      getOnboardingStepFour: "/onboarding/step-4", // GET
      saveOnboardingStepFour: "/onboarding/step-4", // POST

      getOnboardingStepFive: "/onboarding/step-5", // GET
      saveOnboardingStepFive: "/onboarding/step-5", // POST

      getOnboardingStepSix: "/onboarding/step-6", // GET
      saveOnboardingStepSix: "/onboarding/step-6", // POST

      getOnboardingStepSeven: "/onboarding/step-7", // GET
      saveOnboardingStepSeven: "/onboarding/step-7", // POST

      getOnboardingStepEight: "/onboarding/step-8", // GET
      saveOnboardingStepEight: "/onboarding/step-8", // POST

      getOnboardingStepNine: "/onboarding/step-9", // GET
      saveOnboardingStepNine: "/onboarding/step-9", // POST
    },
    upload: {
      getPresignedUrl: '/upload/presigned', // GET
      deleteObject: '/upload/deleteObject' // DELETE
    }
  };
  