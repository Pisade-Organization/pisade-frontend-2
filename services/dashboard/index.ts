import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  FavoriteTutor,
  StudentDashboardSummary,
  StudentLesson,
  StudentTransaction,
  WeeklyPlanDay,
} from "./types";

export const DashboardService = {
  async getSummary(): Promise<StudentDashboardSummary> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<StudentDashboardSummary> | StudentDashboardSummary
    >(servicePath.dashboard.getSummary);

    return unwrapApiResponse(response.data);
  },

  async getNextLesson(): Promise<StudentLesson | null> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<StudentLesson | null> | StudentLesson | null
    >(servicePath.dashboard.getNextLesson);

    return unwrapApiResponse(response.data);
  },

  async getTodayLessons(): Promise<StudentLesson[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<StudentLesson[]> | StudentLesson[]
    >(servicePath.dashboard.getTodayLessons);

    return unwrapApiResponse(response.data);
  },

  async getWeeklyPlan(start: string): Promise<WeeklyPlanDay[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<WeeklyPlanDay[]> | WeeklyPlanDay[]
    >(servicePath.dashboard.getWeeklyPlan, {
      params: { start },
    });

    return unwrapApiResponse(response.data);
  },

  async getFavoriteTutors(): Promise<FavoriteTutor[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<FavoriteTutor[]> | FavoriteTutor[]
    >(servicePath.dashboard.getFavoriteTutors);

    return unwrapApiResponse(response.data);
  },

  async getStudentTransactions(): Promise<StudentTransaction[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<StudentTransaction[]> | StudentTransaction[]
    >(servicePath.dashboard.getStudentTransactions);

    return unwrapApiResponse(response.data);
  },
};
