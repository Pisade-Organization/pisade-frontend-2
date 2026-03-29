import apiInstanceClient from "@/services/apiInstanceClient";
import apiInstancePublic from "@/services/apiInstancePublic";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import { formatLanguageLabel } from "@/lib/language";
import {
  Tutor,
  TutorDetailData,
  MyTutorProfile,
  TutorTransaction,
  SubmitTutorOnboardingResponse,
  UpdateMyTutorProfileDto,
} from "./types";

const DEFAULT_FLAG_URL = "https://flagcdn.com/w40/th.png";
const DEFAULT_AVATAR_URL = "https://ui-avatars.com/api/?name=Tutor";

type RawTutor = Record<string, unknown>;

function toSafeString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toDayKey(day: unknown): string {
  if (typeof day === "number") {
    const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return map[day] ?? "Mon";
  }

  if (typeof day === "string") {
    const key = day.toLowerCase();
    const map: Record<string, string> = {
      sunday: "Sun",
      sun: "Sun",
      monday: "Mon",
      mon: "Mon",
      tuesday: "Tue",
      tue: "Tue",
      wednesday: "Wed",
      wed: "Wed",
      thursday: "Thu",
      thu: "Thu",
      friday: "Fri",
      fri: "Fri",
      saturday: "Sat",
      sat: "Sat",
    };
    return map[key] ?? "Mon";
  }

  return "Mon";
}

function normalizeAvailability(
  availability: unknown,
): { [key: string]: Array<{ start: string; end: string }> } {
  if (!availability) return {};

  if (Array.isArray(availability)) {
    return availability.reduce<{ [key: string]: Array<{ start: string; end: string }> }>(
      (acc, item) => {
        if (!item || typeof item !== "object") return acc;

        const dayKey = toDayKey((item as any).dayOfWeek ?? (item as any).day);
        const start = (item as any).startTime;
        const end = (item as any).endTime;
        if (!start || !end) return acc;

        if (!acc[dayKey]) acc[dayKey] = [];
        acc[dayKey].push({ start: String(start), end: String(end) });
        return acc;
      },
      {},
    );
  }

  if (typeof availability === "object") {
    return availability as { [key: string]: Array<{ start: string; end: string }> };
  }

  return {};
}

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace('www.', '').toLowerCase();

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id || null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/embed/')[1] || null;
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/shorts/')[1] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function getYouTubeThumbnailUrl(videoUrl?: string): string {
  if (!videoUrl) return "";
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function normalizeTutor(raw: RawTutor): Tutor {
  const subjects = Array.isArray(raw.subjects)
    ? raw.subjects.map((subject) => String(subject))
    : [];

  const languages = Array.isArray(raw.languages)
    ? raw.languages.map((language) => formatLanguageLabel(String(language)))
    : [];

  const specialties = Array.isArray(raw.specialties)
    ? raw.specialties.map((specialty) => String(specialty))
    : [];

  const videoUrl = String(raw.videoUrl ?? "");
  const providedThumbnail = String(
    raw.videoThumbnailUrl ?? raw.thumbnailUrl ?? "",
  );
  const videoThumbnailUrl =
    providedThumbnail || getYouTubeThumbnailUrl(videoUrl);

  const rawSelfIntroduction =
    raw.selfIntroduction && typeof raw.selfIntroduction === "object"
      ? (raw.selfIntroduction as Record<string, unknown>)
      : null;

  const selfIntroduction = rawSelfIntroduction
    ? {
        introduceYourself: toSafeString(rawSelfIntroduction.introduceYourself),
        teachingExperience: toSafeString(rawSelfIntroduction.teachingExperience),
        motivatePotentialStudents: toSafeString(rawSelfIntroduction.motivatePotentialStudents),
        catchyHeadline: toSafeString(rawSelfIntroduction.catchyHeadline),
      }
    : {
        introduceYourself: toSafeString(raw.introduceYourself) || String(raw.bio ?? ""),
        teachingExperience: toSafeString(raw.teachingExperience),
        motivatePotentialStudents: toSafeString(raw.motivatePotentialStudents),
        catchyHeadline: toSafeString(raw.catchyHeadline),
      };

  return {
    id: String(raw.id ?? ""),
    userId: String(raw.userId ?? ""),
    fullName: String(raw.fullName ?? "Tutor"),
    avatarUrl: String(raw.avatarUrl ?? DEFAULT_AVATAR_URL),
    flagUrl: String(raw.flagUrl ?? DEFAULT_FLAG_URL),
    bio: String(raw.bio ?? ""),
    baseRate: Number(raw.baseRate ?? 0),
    specialties,
    subject: String(raw.subject ?? subjects[0] ?? ""),
    languages,
    avgRating: Number(raw.avgRating ?? 0),
    studentsCount: Number(raw.studentsCount ?? 0),
    lessonsCount: Number(raw.lessonsCount ?? 0),
    availability: normalizeAvailability(raw.availability ?? raw.availabilities),
    videoUrl,
    videoThumbnailUrl,
    selfIntroduction,
    isActive: Boolean(raw.isActive ?? true),
    tutorRanking: (raw.tutorRanking as Tutor["tutorRanking"]) ?? "STARTER",
    reviews: Array.isArray(raw.reviews)
      ? raw.reviews.map((review) => ({
          id: String((review as any).id ?? ""),
          avatarUrl: String((review as any).avatarUrl ?? DEFAULT_AVATAR_URL),
          fullName: String((review as any).fullName ?? "Student"),
          rating: Number((review as any).rating ?? 0),
          date: String((review as any).date ?? (review as any).createdAt ?? ""),
          review: String((review as any).review ?? (review as any).comment ?? ""),
        }))
      : [],
  };
}

/**
 * Fetch tutor data from API
 */
export async function fetchTutorData(tutorId: string): Promise<Tutor | null> {
  try {
    const path = servicePath.tutor.getTutor.replace(":id", tutorId);
    const response = await apiInstancePublic.get<ApiSuccessResponse<RawTutor> | RawTutor>(path);
    const rawTutor = unwrapApiResponse(response.data);
    return normalizeTutor(rawTutor);
  } catch (error) {
    console.error("Error fetching tutor data:", error);
    return null;
  }
}

/**
 * Fetch detailed tutor data including reviews
 */
export async function fetchTutorDetailData(tutorId: string): Promise<TutorDetailData | null> {
  try {
    const path = servicePath.tutor.getTutor.replace(":id", tutorId);
    const response = await apiInstancePublic.get<ApiSuccessResponse<RawTutor> | RawTutor>(path);
    const rawTutor = unwrapApiResponse(response.data);
    const normalizedTutor = normalizeTutor(rawTutor);
    const reviews = normalizedTutor.reviews ?? [];

    return {
      ...normalizedTutor,
      reviews,
      summary: {
        avgRating: normalizedTutor.avgRating,
        totalReviews: reviews.length,
      },
    };
  } catch (error) {
    console.error("Error fetching tutor detail data:", error);
    return null;
  }
}

/**
 * Fetch tutors with pagination (for search page)
 */
export async function fetchTutorsPaginated(page: number = 1, limit: number = 6): Promise<{
  tutors: Tutor[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  isError: boolean;
}> {
  try {
    const response = await apiInstancePublic.get<
      | ApiSuccessResponse<{ tutors: RawTutor[]; total: number; page: number; totalPages: number }>
      | { tutors: RawTutor[]; total: number; page: number; totalPages: number }
    >(servicePath.tutor.getAllTutors, {
      params: { page, limit },
    });

    const data = unwrapApiResponse(response.data);
    return {
      tutors: Array.isArray(data.tutors) ? data.tutors.map(normalizeTutor) : [],
      total: Number(data.total ?? 0),
      page: Number(data.page ?? page),
      limit,
      hasMore: Number(data.page ?? page) < Number(data.totalPages ?? 0),
      isError: false,
    };
  } catch (error) {
    console.error("Error fetching tutors:", error);

    return {
      tutors: [],
      total: 0,
      page: 1,
      limit: 6,
      hasMore: false,
      isError: true,
    };
  }
}

/**
 * Fetch all tutors (for search page) - kept for backward compatibility
 */
export async function fetchAllTutors(): Promise<Tutor[]> {
  try {
    const response = await fetchTutorsPaginated(1, 1000);
    return response.tutors;
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
}

export const TutorService = {
  async getMyTutorProfile(): Promise<MyTutorProfile> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<MyTutorProfile> | MyTutorProfile
    >(servicePath.tutor.getMyTutorProfile);

    return unwrapApiResponse(response.data);
  },

  async updateMyTutorProfile(payload: UpdateMyTutorProfileDto): Promise<MyTutorProfile> {
    const response = await apiInstanceClient.patch<
      ApiSuccessResponse<MyTutorProfile> | MyTutorProfile
    >(servicePath.tutor.updateMyTutorProfile, payload);

    return unwrapApiResponse(response.data);
  },

  async getMyTutorTransactions(): Promise<TutorTransaction[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<TutorTransaction[]> | TutorTransaction[]
    >(servicePath.tutor.getMyTutorTransactions);

    return unwrapApiResponse(response.data);
  },

  async submitOnboarding(): Promise<SubmitTutorOnboardingResponse> {
    const response = await apiInstanceClient.post<
      ApiSuccessResponse<SubmitTutorOnboardingResponse> | SubmitTutorOnboardingResponse
    >(servicePath.tutor.submitOnboarding);

    return unwrapApiResponse(response.data);
  },
};
