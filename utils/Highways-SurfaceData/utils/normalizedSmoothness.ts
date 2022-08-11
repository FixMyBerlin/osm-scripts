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
  escellent: "excellent",
  excelent: "excellent",
  vea: "very_bad", // well, what can we do?
  verbad: "very_bad",
  paved: "intermediate", // just an error
  f: "bad", // the clean way for this would be to delete the value and re-run this part…
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
