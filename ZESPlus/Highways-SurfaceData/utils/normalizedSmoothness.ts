const smoothnessNormalization = {
  excellent: "excellent",
  very_good: "excellent",
  good: "good",
  intermediate: "intermediate",
  bad: "bad",
  very_bad: "very_bad",
  impassable: "very_bad",
  horrible: "very_bad",
  very_horrible: "very_bad",
}

export const smoothnessNormalizationTypos = {
  verbad: "very_bad",
  vea: "very_bad", // well, what can we do?
  excelent: "excellent",
}

export const normalizedSmoothness = (smoothnessValue: string) => {
  const normalizedSmoothness = {
    ...smoothnessNormalization,
    ...smoothnessNormalizationTypos,
  }[smoothnessValue]

  if (!normalizedSmoothness) {
    console.error(
      `🧨 Error: Cannot find normalized smoothness for smoothness=${smoothnessValue}`
    )
    console.log("normalizedSmoothness", smoothnessValue, normalizedSmoothness)
  }

  return normalizedSmoothness
}
