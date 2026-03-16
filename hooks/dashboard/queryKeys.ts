export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardQueryKeys.all, "summary"] as const,
  nextLesson: () => [...dashboardQueryKeys.all, "next-lesson"] as const,
  todayLessons: () => [...dashboardQueryKeys.all, "today-lessons"] as const,
  weeklyPlan: (start: string) => [...dashboardQueryKeys.all, "weekly-plan", start] as const,
  favoriteTutors: () => [...dashboardQueryKeys.all, "favorite-tutors"] as const,
  favoriteTutorCards: () => [...dashboardQueryKeys.all, "favorite-tutor-cards"] as const,
  currentTutorCards: () => [...dashboardQueryKeys.all, "current-tutor-cards"] as const,
  transactions: () => [...dashboardQueryKeys.all, "transactions"] as const,
};
