import apiInstanceClient from "@/services/apiInstanceClient";
import { resolveMediaUrl } from "@/lib/media";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  FavoriteTutor,
  DashboardTutorCardItem,
  PaginatedTutorCards,
  StudentDashboardSummary,
  StudentLesson,
  StudentTransaction,
  WeeklyPlanDay,
} from "./types";

interface GetTutorCardsParams {
  page?: number;
  limit?: number;
}

function mapProfileMedia<T extends { avatarUrl: string | null } | null>(profile: T): T {
  if (!profile) return profile;

  return {
    ...profile,
    avatarUrl: resolveMediaUrl(profile.avatarUrl) || null,
  };
}

function mapStudentLessonMedia(lesson: StudentLesson): StudentLesson {
  return {
    ...lesson,
    tutor: {
      ...lesson.tutor,
      user: {
        ...lesson.tutor.user,
        profile: mapProfileMedia(lesson.tutor.user.profile),
      },
    },
  };
}

function mapFavoriteTutorMedia(tutor: FavoriteTutor): FavoriteTutor {
  return {
    ...tutor,
    user: {
      ...tutor.user,
      profile: mapProfileMedia(tutor.user.profile),
    },
  };
}

function mapTutorCardMedia(tutor: DashboardTutorCardItem): DashboardTutorCardItem {
  return {
    ...tutor,
    avatarUrl: resolveMediaUrl(tutor.avatarUrl) || null,
    videoThumbnailUrl: resolveMediaUrl(tutor.videoThumbnailUrl) || null,
  };
}

function mapPaginatedTutorCardsMedia(result: PaginatedTutorCards): PaginatedTutorCards {
  return {
    ...result,
    data: result.data.map(mapTutorCardMedia),
  };
}

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

    const lesson = unwrapApiResponse(response.data);

    return lesson ? mapStudentLessonMedia(lesson) : null;
  },

  async getTodayLessons(): Promise<StudentLesson[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<StudentLesson[]> | StudentLesson[]
    >(servicePath.dashboard.getTodayLessons);

    return unwrapApiResponse(response.data).map(mapStudentLessonMedia);
  },

  async getWeeklyPlan(start: string): Promise<WeeklyPlanDay[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<WeeklyPlanDay[]> | WeeklyPlanDay[]
    >(servicePath.dashboard.getWeeklyPlan, {
      params: { start },
    });

    return unwrapApiResponse(response.data).map((day) => ({
      ...day,
      lessons: day.lessons.map(mapStudentLessonMedia),
    }));
  },

  async getFavoriteTutors(): Promise<FavoriteTutor[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<FavoriteTutor[]> | FavoriteTutor[]
    >(servicePath.dashboard.getFavoriteTutors);

    return unwrapApiResponse(response.data).map(mapFavoriteTutorMedia);
  },

  async getFavoriteTutorsPaginated(
    params: GetTutorCardsParams = {},
  ): Promise<PaginatedTutorCards> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<PaginatedTutorCards> | PaginatedTutorCards
    >(servicePath.dashboard.getFavoriteTutorsPaginated, {
      params,
    });

    return mapPaginatedTutorCardsMedia(unwrapApiResponse(response.data));
  },

  async getCurrentTutors(
    params: GetTutorCardsParams = {},
  ): Promise<PaginatedTutorCards> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<PaginatedTutorCards> | PaginatedTutorCards
    >(servicePath.dashboard.getCurrentTutors, {
      params,
    });

    return mapPaginatedTutorCardsMedia(unwrapApiResponse(response.data));
  },

  async getStudentTransactions(): Promise<StudentTransaction[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<StudentTransaction[]> | StudentTransaction[]
    >(servicePath.dashboard.getStudentTransactions);

    return unwrapApiResponse(response.data);
  },
};
