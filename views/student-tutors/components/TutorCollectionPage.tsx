"use client"

import { useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import BaseButton from "@/components/base/BaseButton"
import { EmptyBoxIcon } from "@/components/icons"
import Footer from "@/components/footer/Footer"
import ViewModeToggle from "@/views/search/components/filters/ViewModeToggle"
import TutorListCard from "@/views/search/components/TutorCard/TutorListCard"
import TutorGridCard from "@/views/search/components/TutorCard/TutorGridCard"
import { TUTOR_RANKING } from "@/types/tutorRanking.enum"
import type { DashboardTutorCardItem } from "@/services/dashboard/types"
import type { TutorCardProps } from "@/views/search/types"
import { useCurrentTutorCards, useFavoriteTutorCards } from "@/hooks/dashboard/queries"

type TutorCollectionVariant = "favorite" | "current"

const MOCK_TUTORS: Record<TutorCollectionVariant, DashboardTutorCardItem> = {
  favorite: {
    id: "mock-favorite-tutor",
    fullName: "Ariana Kongsawat",
    avatarUrl: "https://ui-avatars.com/api/?name=Ariana+Kongsawat",
    bio: "Conversation-focused English tutor with practical learning approach.",
    baseRate: 450,
    specialties: ["Conversation", "IELTS Speaking"],
    subjects: ["English"],
    languages: ["Thai (NATIVE)", "English (NATIVE)"],
    avgRating: 4.9,
    studentsCount: 128,
    lessonsCount: 1040,
    availability: [{ dayOfWeek: 1, startTime: "09:00", endTime: "12:00" }],
    videoUrl: "https://example.com/mock-favorite-video.mp4",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1601933471666-8cc6c4dffb7f?w=800&q=80",
  },
  current: {
    id: "mock-current-tutor",
    fullName: "Napat Chaiyaporn",
    avatarUrl: "https://ui-avatars.com/api/?name=Napat+Chaiyaporn",
    bio: "Math tutor helping students improve confidence and exam results.",
    baseRate: 550,
    specialties: ["Calculus", "SAT Math"],
    subjects: ["Mathematics"],
    languages: ["Thai (NATIVE)", "English (INTERMEDIATE)"],
    avgRating: 4.8,
    studentsCount: 92,
    lessonsCount: 780,
    availability: [{ dayOfWeek: 3, startTime: "14:00", endTime: "18:00" }],
    videoUrl: "https://example.com/mock-current-video.mp4",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
  },
}

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
    avatarUrl: item.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor",
    flagUrl: "https://flagcdn.com/w40/th.png",
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

interface TutorCollectionPageProps {
  variant: TutorCollectionVariant
}

export default function TutorCollectionPage({ variant }: TutorCollectionPageProps) {
  const [mode, setMode] = useState<"list" | "grid">("list")
  const { data: session } = useSession()
  const isStudent = session?.user?.role === "STUDENT"

  const favoriteQuery = useFavoriteTutorCards(12, isStudent && variant === "favorite")
  const currentQuery = useCurrentTutorCards(12, isStudent && variant === "current")
  const query = variant === "favorite" ? favoriteQuery : currentQuery

  const tutors = useMemo(() => {
    return (query.data?.pages ?? []).flatMap((page) => page.data).map(toTutorCard)
  }, [query.data?.pages])

  const useMockTutor = query.isSuccess && tutors.length === 0
  const tutorsToRender = useMockTutor
    ? [toTutorCard(MOCK_TUTORS[variant])]
    : tutors

  const firstPage = query.data?.pages?.[0]
  const total = firstPage?.total ?? 0
  const displayTotal = useMockTutor ? 1 : total
  const isLoading = query.isLoading
  const isError = query.isError

  const title =
    variant === "favorite"
      ? `${displayTotal} saved tutors`
      : `You currently have ${displayTotal} tutor${displayTotal === 1 ? "" : "s"}`

  const emptyTitle =
    variant === "favorite" ? "No Favorite Tutor Yet?" : "Time to Find Your Expert"
  const emptyDescription =
    variant === "favorite"
      ? "Your perfect match is waiting! Start exploring our tutors and find the expert you love today."
      : "We see you haven't secured a tutor. Explore our available tutors and connect with the right one for you today!"

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
            Unable to load tutors right now. Please try again.
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center py-12 text-neutral-400">
            Loading tutors...
          </div>
        ) : null}

        {!isLoading && tutorsToRender.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12">
            <EmptyBoxIcon className="h-[88px] w-[88px]" />

            <div className="flex flex-col items-center gap-1">
              <p className="text-title-3 text-center text-neutral-700 lg:text-title-2">{emptyTitle}</p>
              <p className="text-body-3 text-center text-neutral-400 lg:text-body-2">{emptyDescription}</p>
            </div>

            <BaseButton typeStyle={{ base: "outline", lg: "default" }}>Find my tutor</BaseButton>
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

            {query.hasNextPage && !useMockTutor ? (
              <div className="mt-6 flex justify-center">
                <BaseButton
                  onClick={() => query.fetchNextPage()}
                  disabled={query.isFetchingNextPage}
                >
                  {query.isFetchingNextPage ? "Loading..." : "Load more"}
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
