const LANGUAGE_LEVEL_LABELS: Record<string, string> = {
  NATIVE: "Native",
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatLanguageLevel(level: string): string {
  const normalizedLevel = level.trim();

  if (!normalizedLevel) {
    return "";
  }

  const mappedLabel = LANGUAGE_LEVEL_LABELS[normalizedLevel.toUpperCase()];
  if (mappedLabel) {
    return mappedLabel;
  }

  return toTitleCase(normalizedLevel);
}

export function formatLanguageLabel(label: string): string {
  const normalizedLabel = label.trim();

  if (!normalizedLabel) {
    return "";
  }

  const match = normalizedLabel.match(/^(.+?)\s*\(([^()]+)\)$/);
  if (!match) {
    return normalizedLabel;
  }

  const languageName = match[1].trim();
  const level = match[2].trim();

  return `${languageName} (${formatLanguageLevel(level)})`;
}

export function formatLanguageLabels(labels: string[]): string[] {
  return labels.map(formatLanguageLabel);
}
