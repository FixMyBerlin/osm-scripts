const surfaceToSmoothness = {
  "cobblestone:flattened": "bad",
  "concrete:plates": "intermediate",
  "concrete:lanes": "intermediate",
  asphalt: "good",
  cobblestone: "very_bad",
  compacted: "intermediate",
  concrete: "intermediate",
  dirt: "bad",
  rock: "very_bad",
  earth: "bad",
  fine_gravel: "intermediate",
  grass_paver: "bad",
  grass: "bad",
  stepping_stones: "bad", // https://www.openstreetmap.org/way/669442481 Stones on grass
  gravel: "bad",
  ground: "bad",
  metal: "good",
  paved: "intermediate",
  paving_stones: "intermediate",
  "paving_stones:30": "intermediate",
  pebblestone: "very_bad",
  sand: "very_bad",
  mud: "very_bad",
  sett: "bad",
  unhewn_cobblestone: "very_bad",
  unpaved: "bad",
  wood: "intermediate",
}

export const surfaceToSmoothnessNonStandardValues = {
  "dirt/sand": "very_bad",
  "asphalt|sett": "very_bad",
  grund: "bad",
}

export const extrapolatedSmoothnessBasedOnSurface = (surfaceValue: string) => {
  const assumedSmoothness = {
    ...surfaceToSmoothness,
    ...surfaceToSmoothnessNonStandardValues,
  }[surfaceValue.toLocaleLowerCase()]

  if (!assumedSmoothness) {
    console.error(
      `🧨 Error: Cannot extrapolate smoothness for surface=${surfaceValue}`
    )
  }

  return assumedSmoothness
}
