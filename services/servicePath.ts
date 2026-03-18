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
      getMyProviders: "/v1/me/providers", // GET
      linkGoogleProvider: "/v1/me/providers/link-google", // POST
      unlinkProvider: "/v1/me/providers/:providerId", // DELETE
      deleteMyAccount: "/v1/me", // DELETE
    },
    tutor: {
      getTutor: "/v1/tutors/:id", // GET
      getAllTutors: "/v1/tutors", // GET
      getTutorReviews: "/v1/tutors/:id/reviews", // GET
      getMyTutorProfile: "/v1/me/tutor-profile", // GET
      updateMyTutorProfile: "/v1/me/tutor-profile", // PATCH
      getMyTutorTransactions: "/v1/me/tutor-profile/transactions", // GET
      submitOnboarding: "/v1/me/tutor-profile/submissions", // POST
    },
    dashboard: {
      getSummary: "/dashboard/summary", // GET
      getNextLesson: "/dashboard/next-lesson", // GET
      getTodayLessons: "/dashboard/today-lessons", // GET
      getWeeklyPlan: "/dashboard/weekly-plan", // GET
      getFavoriteTutors: "/dashboard/favorite-tutors", // GET
      getFavoriteTutorsPaginated: "/dashboard/favorite-tutors/paginated", // GET
      getCurrentTutors: "/dashboard/current-tutors", // GET
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
      topup: "/wallet/topup", // POST
      verifyTopup: "/wallet/topup/verify", // POST
    },
    tutorWallet: {
      requestWithdraw: "/tutor-wallet/withdraw", // POST
      getWithdrawals: "/tutor-wallet/withdrawals", // GET
      getSummary: "/tutor-wallet/summary", // GET
    },
    onboarding: {
      getCurrentStep: "/onboarding/current-step", // GET

      getOnboardingStepOne: "/onboarding/step/1", // GET
      saveOnboardingStepOne: "/onboarding/step/1", // PATCH

      getOnboardingStepTwo: "/onboarding/step/2", // GET
      saveOnboardingStepTwo: "/onboarding/step/2", // PATCH

      getOnboardingStepThree: "/onboarding/step/3", // GET
      saveOnboardingStepThree: "/onboarding/step/3", // PATCH

      getOnboardingStepFour: "/onboarding/step/4", // GET
      saveOnboardingStepFour: "/onboarding/step/4", // PATCH

      getOnboardingStepFive: "/onboarding/step/5", // GET
      saveOnboardingStepFive: "/onboarding/step/5", // PATCH

      getOnboardingStepSix: "/onboarding/step/6", // GET
      saveOnboardingStepSix: "/onboarding/step/6", // PATCH

      getOnboardingStepSeven: "/onboarding/step/7", // GET
      saveOnboardingStepSeven: "/onboarding/step/7", // PATCH

      getOnboardingStepEight: "/onboarding/step/8", // GET
      saveOnboardingStepEight: "/onboarding/step/8", // PATCH

      getOnboardingStepNine: "/onboarding/step/9", // GET
      saveOnboardingStepNine: "/onboarding/step/9", // PATCH
    },
    upload: {
      getPresignedUrl: '/upload/presigned', // GET
      deleteObject: '/upload/deleteObject' // DELETE
    }
  };
  
