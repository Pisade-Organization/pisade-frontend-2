export const servicePath = {
    auth: {
      sendMagicLink: "/auth/magic-link", // POST
      verifyMagicLink: "/auth/verify-magic-link", // GET
      refresh: "/auth/refresh", // GET
    },
    user: {
      getProfile: "/v1/me", // GET
      updateProfile: "/v1/me", // PATCH
    },
    profile: {
      getMyProfile: "/v1/me", // GET
      updateMyProfile: "/v1/me", // PATCH
      updateMyPhoneNumber: "/v1/me/phone-number", // PATCH
      getMyNotifications: "/v1/me/notifications", // GET
      getMyNotificationPreferences: "/v1/me/notification-preferences", // GET
      updateMyNotificationPreferences: "/v1/me/notification-preferences", // PATCH
      deleteMyAccount: "/v1/me", // DELETE
    },
    tutor: {
      getTutor: "/v1/tutors/:id", // GET
      getAllTutors: "/v1/tutors", // GET
      getTutorReviews: "/v1/tutors/:id/reviews", // GET
      getMyTutorProfile: "/v1/me/tutor-profile", // GET
      updateMyTutorProfile: "/v1/me/tutor-profile", // PATCH
      getMyTutorTransactions: "/v1/me/tutor-profile/transactions", // GET
    },
    dashboard: {
      getSummary: "/dashboard/summary", // GET
      getNextLesson: "/dashboard/next-lesson", // GET
      getTodayLessons: "/dashboard/today-lessons", // GET
      getWeeklyPlan: "/dashboard/weekly-plan", // GET
      getFavoriteTutors: "/dashboard/favorite-tutors", // GET
      getStudentTransactions: "/dashboard/transactions", // GET
    },
    bookings: {
      create: "/bookings", // POST
      getAll: "/bookings", // GET
      getById: "/bookings/:id", // GET
      checkout: "/bookings/:id/checkout", // POST
      cancel: "/bookings/:id/cancel", // PATCH
      reschedule: "/bookings/:id/reschedule", // PATCH
    },
    wallet: {
      getMyWallet: "/wallet/me", // GET
      getMyWalletTransactions: "/wallet/me/transactions", // GET
      getMyWalletSummary: "/wallet/me/summary", // GET
    },
    tutorWallet: {
      getWithdrawals: "/tutor-wallet/withdrawals", // GET
      getSummary: "/tutor-wallet/summary", // GET
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
  
