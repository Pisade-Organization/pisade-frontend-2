"use client"

import { useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import BaseButton from "@/components/base/BaseButton"
import { EmptyBoxIcon } from "@/components/icons"
import Footer from "@/components/footer/Footer"
import ViewModeToggle from "@/views/search/components/filters/ViewModeToggle"
import TutorListCard from "@/views/search/components/TutorCard/TutorListCard"
import TutorGridCard from "@/views/search/components/TutorCard/TutorGridCard"
import { TUTOR_RANKING } from "@/types/tutorRanking.enum"
import type { DashboardTutorCardItem, FavoriteTutor } from "@/services/dashboard/types"
import type { TutorCardProps } from "@/views/search/types"
import { useCurrentTutorCards, useFavoriteTutorCards, useFavoriteTutors } from "@/hooks/dashboard/queries"
import { BookingsService } from "@/services/bookings"
import type { BookingListItem } from "@/services/bookings/types"

type TutorCollectionVariant = "favorite" | "current" | "active" | "past"

const dayOfWeekMap: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
}

function toTutorCard(item: DashboardTutorCardItem): TutorCardProps {
  const availability = (item.availability ?? []).reduce<
    Record<string, Array<{ start: string; end: string }>>
  >((acc, slot) => {
    const dayKey = dayOfWeekMap[slot.dayOfWeek] ?? "Mon"
    if (!acc[dayKey]) {
      acc[dayKey] = []
    }

    acc[dayKey].push({
      start: slot.startTime,
      end: slot.endTime,
    })

    return acc
  }, {})

  return {
    id: item.id,
    fullName: item.fullName,
    isActive: true,
    avatarUrl: item.avatarUrl ?? "/images/avatars/default-avatar.svg",
    flagUrl: "/images/flags/default-th.svg",
    bio: item.bio ?? "",
    baseRate: item.baseRate,
    specialties: item.specialties ?? [],
    subject: (item.subjects ?? [])[0] ?? "",
    languages: item.languages ?? [],
    avgRating: item.avgRating,
    tutorRanking: TUTOR_RANKING.STARTER,
    studentsCount: item.studentsCount,
    lessonsCount: item.lessonsCount,
    availability,
    videoUrl: item.videoUrl ?? "",
    videoThumbnailUrl: item.videoThumbnailUrl ?? "",
  }
}

function toFavoriteTutorCard(item: FavoriteTutor): TutorCardProps {
  return {
    id: item.id,
    fullName: item.user.profile?.fullName ?? "Tutor",
    isActive: true,
    avatarUrl: item.user.profile?.avatarUrl ?? "/images/avatars/default-avatar.svg",
    flagUrl: "/images/flags/default-th.svg",
    bio: "",
    baseRate: 0,
    specialties: item.subjects.map((subject) => subject.subject.name),
    subject: item.subjects.map((subject) => subject.subject.name).join(", "),
    languages: item.languages.map((language) => `${language.language.name} (${language.level})`),
    avgRating: 0,
    tutorRanking: TUTOR_RANKING.STARTER,
    studentsCount: 0,
    lessonsCount: 0,
    availability: {},
    videoUrl: "",
    videoThumbnailUrl: "",
  }
}

interface TutorCollectionPageProps {
  variant: TutorCollectionVariant
}

function toStudentCard(item: BookingListItem): TutorCardProps {
  const student = item.student
  const fullName = student?.name ?? "Student"

  return {
    id: student?.id ?? item.id,
    fullName,
    isActive: true,
    avatarUrl: student?.avatarUrl ?? "/images/avatars/default-avatar.svg",
    flagUrl: "/images/flags/default-th.svg",
    bio: "",
    baseRate: 0,
    specialties: [],
    subject: "Student",
    languages: [],
    avgRating: 0,
    tutorRanking: TUTOR_RANKING.STARTER,
    studentsCount: 0,
    lessonsCount: 0,
    availability: {},
    videoUrl: "",
    videoThumbnailUrl: "",
  }
}

function uniqueStudentsFromBookings(bookings: BookingListItem[]): TutorCardProps[] {
  const map = new Map<string, TutorCardProps>()

  bookings.forEach((booking) => {
    const studentId = booking.student?.id
    if (!studentId || map.has(studentId)) {
      return
    }

    map.set(studentId, toStudentCard(booking))
  })

  return Array.from(map.values())
}

function uniqueTutorsFromBookings(bookings: BookingListItem[]): TutorCardProps[] {
  const map = new Map<string, TutorCardProps>()

  bookings.forEach((booking) => {
    const tutor = booking.tutor
    if (!tutor?.id || map.has(tutor.id)) {
      return
    }

    map.set(tutor.id, {
      id: tutor.id,
      fullName: tutor.name ?? "Tutor",
      isActive: true,
      avatarUrl: tutor.avatarUrl ?? "/images/avatars/default-avatar.svg",
      flagUrl: "/images/flags/default-th.svg",
      bio: "",
      baseRate: 0,
      specialties: [],
      subject: "Tutor",
      languages: [],
      avgRating: 0,
      tutorRanking: TUTOR_RANKING.STARTER,
      studentsCount: 0,
      lessonsCount: 0,
      availability: {},
      videoUrl: "",
      videoThumbnailUrl: "",
    })
  })

  return Array.from(map.values())
}

async function fetchAllTutorBookingsByView(
  view: "upcoming" | "past",
  maxPages = 20,
): Promise<BookingListItem[]> {
  const allBookings: BookingListItem[] = []
  let cursor: string | undefined

  for (let page = 0; page < maxPages; page += 1) {
    const response = await BookingsService.getAll({
      view,
      limit: 100,
      ...(cursor ? { cursor } : {}),
    })

    allBookings.push(...response.data)

    if (!response.nextCursor) {
      break
    }

    cursor = response.nextCursor
  }

  return allBookings
}

export default function TutorCollectionPage({ variant }: TutorCollectionPageProps) {
  const [mode, setMode] = useState<"list" | "grid">("list")
  const t = useTranslations("tutorCollection")
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const isStudent = session?.user?.role === "STUDENT"
  const isTutor = session?.user?.role === "TUTOR"
  const isTutorStudentsVariant = variant === "active" || variant === "past"
  const locale = pathname?.split("/")[1]
  const localePrefix = locale === "en" || locale === "th" ? `/${locale}` : "/en"

  const favoriteQuery = useFavoriteTutorCards(12, isStudent && variant === "favorite")
  const currentQuery = useCurrentTutorCards(12, isStudent && variant === "current")
  const favoriteFallbackQuery = useFavoriteTutors(isStudent && variant === "favorite")
  const query = variant === "favorite" ? favoriteQuery : currentQuery

  const currentFallbackQuery = useQuery({
    queryKey: ["student-tutors", "current-bookings"],
    queryFn: async () => {
      const [upcomingBookings, pastBookings] = await Promise.all([
        fetchAllTutorBookingsByView("upcoming"),
        fetchAllTutorBookingsByView("past"),
      ])

      return [...upcomingBookings, ...pastBookings]
    },
    enabled: isStudent && variant === "current",
    retry: 1,
  })

  const activeBookingsQuery = useQuery({
    queryKey: ["tutor-students", "active-bookings"],
    queryFn: () => fetchAllTutorBookingsByView("upcoming"),
    enabled: isTutor && isTutorStudentsVariant,
    retry: 1,
  })

  const pastBookingsQuery = useQuery({
    queryKey: ["tutor-students", "past-bookings"],
    queryFn: () => fetchAllTutorBookingsByView("past"),
    enabled: isTutor && variant === "past",
    retry: 1,
  })

  const activeStudents = useMemo(() => {
    const bookings = activeBookingsQuery.data ?? []
    return uniqueStudentsFromBookings(bookings)
  }, [activeBookingsQuery.data])

  const pastStudents = useMemo(() => {
    const bookings = pastBookingsQuery.data ?? []
    const activeIds = new Set(activeStudents.map((student) => student.id))

    return uniqueStudentsFromBookings(
      bookings.filter((booking) => {
        const studentId = booking.student?.id
        if (!studentId) return false
        return !activeIds.has(studentId)
      }),
    )
  }, [activeStudents, pastBookingsQuery.data])

  const tutors = useMemo(() => {
    return (query.data?.pages ?? []).flatMap((page) => page.data).map(toTutorCard)
  }, [query.data?.pages])

  const favoriteFallbackTutors = useMemo(() => {
    return (favoriteFallbackQuery.data ?? []).map(toFavoriteTutorCard)
  }, [favoriteFallbackQuery.data])

  const currentFallbackTutors = useMemo(() => {
    return uniqueTutorsFromBookings(currentFallbackQuery.data ?? [])
  }, [currentFallbackQuery.data])

  const usingFavoriteFallback = variant === "favorite" && favoriteQuery.isError && favoriteFallbackTutors.length > 0
  const usingCurrentFallback = variant === "current" && currentQuery.isError && currentFallbackTutors.length > 0
  const usingFallback = usingFavoriteFallback || usingCurrentFallback

  const tutorStudents = variant === "active" ? activeStudents : pastStudents
  const tutorsToRender = isTutorStudentsVariant
    ? tutorStudents
    : usingFavoriteFallback
      ? favoriteFallbackTutors
      : usingCurrentFallback
        ? currentFallbackTutors
        : tutors

  const firstPage = query.data?.pages?.[0]
  const total = isTutorStudentsVariant
    ? tutorStudents.length
    : usingFallback
      ? tutorsToRender.length
      : firstPage?.total ?? 0
  const displayTotal = total
  const isLoading =
    isTutorStudentsVariant && isTutor
      ? activeBookingsQuery.isLoading || pastBookingsQuery.isLoading
      : variant === "favorite"
        ? favoriteQuery.isLoading && favoriteFallbackQuery.isLoading
        : currentQuery.isLoading && currentFallbackQuery.isLoading
  const isError =
    isTutorStudentsVariant && isTutor
      ? activeBookingsQuery.isError || pastBookingsQuery.isError
      : variant === "favorite"
        ? favoriteQuery.isError && favoriteFallbackQuery.isError
        : currentQuery.isError && currentFallbackQuery.isError

  const title =
    variant === "favorite"
      ? t("savedTutors", { count: displayTotal })
      : variant === "current"
        ? t("currentTutors", { count: displayTotal })
        : variant === "active"
          ? t("activeStudents", { count: displayTotal })
          : t("pastStudents", { count: displayTotal })

  const emptyTitle =
    variant === "favorite"
      ? t("empty.favorite.title")
      : variant === "current"
        ? t("empty.current.title")
        : variant === "active"
          ? t("empty.active.title")
          : t("empty.past.title")
  const emptyDescription =
    variant === "favorite"
      ? t("empty.favorite.description")
      : variant === "current"
        ? t("empty.current.description")
        : variant === "active"
          ? t("empty.active.description")
          : t("empty.past.description")

  return (
    <>
      <section className="flex min-h-[calc(100dvh-220px)] flex-col px-4 py-6 lg:px-20 lg:py-8 lg:gap-10">
        <div className="flex items-center justify-between">
          <div className="text-title-1 text-neutral-800 lg:text-headline-2">{title}</div>
          <div className="hidden lg:block">
            <ViewModeToggle mode={mode} setMode={setMode} />
          </div>
        </div>

        {isError ? (
          <div className="rounded-lg border border-red-100 bg-red-25 p-4 text-red-normal">
            {t("loadError")}
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center py-12 text-neutral-400">
            {t("loading")}
          </div>
        ) : null}

        {!isLoading && tutorsToRender.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12">
            <EmptyBoxIcon className="h-[88px] w-[88px]" />

            <div className="flex flex-col items-center gap-1">
              <p className="text-title-3 text-center text-neutral-700 lg:text-title-2">{emptyTitle}</p>
              <p className="text-body-3 text-center text-neutral-400 lg:text-body-2">{emptyDescription}</p>
            </div>

            {!isTutorStudentsVariant ? (
              <BaseButton
                typeStyle={{ base: "outline", lg: "default" }}
                onClick={() => router.push(localePrefix)}
              >
                {t("findMyTutor")}
              </BaseButton>
            ) : null}
          </div>
        ) : null}

        {!isLoading && tutorsToRender.length > 0 ? (
          <>
            <div
              className={
                mode === "grid"
                  ? "grid grid-cols-1 gap-6 lg:grid-cols-2"
                  : "grid grid-cols-1 gap-6"
              }
            >
              {tutorsToRender.map((tutor) =>
                mode === "grid" ? (
                  <TutorGridCard key={tutor.id} view={mode} {...tutor} />
                ) : (
                  <TutorListCard key={tutor.id} view={mode} {...tutor} />
                ),
              )}
            </div>

            {!isTutorStudentsVariant && !usingFallback && query.hasNextPage ? (
              <div className="mt-6 flex justify-center">
                <BaseButton
                  onClick={() => query.fetchNextPage()}
                  disabled={query.isFetchingNextPage}
                >
                  {query.isFetchingNextPage ? t("loadingMore") : t("loadMore")}
                </BaseButton>
              </div>
            ) : null}
          </>
        ) : null}
      </section>
      <Footer />
    </>
  )
}
