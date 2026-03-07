export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardQueryKeys.all, "summary"] as const,
  nextLesson: () => [...dashboardQueryKeys.all, "next-lesson"] as const,
  todayLessons: () => [...dashboardQueryKeys.all, "today-lessons"] as const,
  weeklyPlan: (start: string) => [...dashboardQueryKeys.all, "weekly-plan", start] as const,
  favoriteTutors: () => [...dashboardQueryKeys.all, "favorite-tutors"] as const,
  transactions: () => [...dashboardQueryKeys.all, "transactions"] as const,
};
