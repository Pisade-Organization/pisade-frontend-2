import { TUTOR_RANKING } from "@/types/tutorRanking.enum";

type TutorRankingInput = TUTOR_RANKING | string | null | undefined;

const TUTOR_RANKING_VALUES = new Set<string>(Object.values(TUTOR_RANKING));

export function normalizeTutorRanking(ranking: TutorRankingInput): TUTOR_RANKING | null {
  if (!ranking) return null;

  const normalized = String(ranking).toUpperCase();
  if (!TUTOR_RANKING_VALUES.has(normalized)) return null;

  return normalized as TUTOR_RANKING;
}

export function getTutorRankingBadgeSrc(ranking: TutorRankingInput): string | null {
  const normalized = normalizeTutorRanking(ranking);
  return normalized ? `/icons/tutor-ranking/${normalized}.svg` : null;
}

export function getTutorRankingLabel(ranking: TutorRankingInput): string {
  const normalized = normalizeTutorRanking(ranking);
  if (!normalized) return "-";
  return normalized.charAt(0) + normalized.slice(1).toLowerCase();
}
