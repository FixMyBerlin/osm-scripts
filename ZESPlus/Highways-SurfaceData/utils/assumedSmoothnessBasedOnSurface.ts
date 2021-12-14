const surfaceToSmoothness = {
  "cobblestone:flattened": "bad",
  "concrete:plates": "intermediate",
  asphalt: "good",
  cobblestone: "very_bad",
  compacted: "intermediate",
  concrete: "intermediate",
  dirt: "bad",
  earth: "bad",
  fine_gravel: "intermediate",
  grass_paver: "bad",
  grass: "bad",
  gravel: "bad",
  ground: "bad",
  metal: "good",
  paved: "intermediate",
  paving_stones: "intermediate",
  pebblestone: "very_bad",
  sand: "very_bad",
  sett: "bad",
  unhewn_cobblestone: "very_bad",
  unpaved: "bad",
  wood: "intermediate",
}

export const assumedSmoothnessBasedOnSurface = (surfaceValue: string) => {
  const assumedSmoothness = surfaceToSmoothness[surfaceValue]

  if (!assumedSmoothness) {
    console.error(
      `Error: Cannot find assumed smoothness for surface=${surfaceValue}`
    )
  }

  return assumedSmoothness
}
