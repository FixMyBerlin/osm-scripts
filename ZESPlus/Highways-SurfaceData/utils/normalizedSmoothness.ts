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
  verbad: "very_bad",
}

export const normalizedSmoothness = (smoothnessValue: string) => {
  const normalizedSmoothness = smoothnessNormalization[smoothnessValue]

  if (!normalizedSmoothness) {
    console.error(
      `Error: Cannot find normalized smoothness for smoothness=${smoothnessValue}`
    )
    console.log("normalizedSmoothness", smoothnessValue, normalizedSmoothness)
  }

  return normalizedSmoothness
}
