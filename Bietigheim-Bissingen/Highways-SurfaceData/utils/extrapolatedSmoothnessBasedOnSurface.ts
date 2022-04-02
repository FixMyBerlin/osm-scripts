const surfaceToSmoothness = {
  "cobblestone:flattened": "bad",
  "concrete:lanes": "intermediate",
  "concrete:plates": "intermediate",
  "stone:plates": "intermediate",
  asphalt: "good",
  brick: "bad",
  cobblestone: "very_bad",
  compacted: "intermediate",
  concrete: "intermediate",
  dirt: "bad",
  earth: "bad",
  fine_gravel: "intermediate",
  granite: "intermediate",
  grass_paver: "bad",
  grass: "bad",
  gravel: "bad",
  ground: "bad",
  metal_grid: "bad",
  metal: "good",
  mud: "very_bad",
  paved: "intermediate",
  paving_stones: "intermediate",
  pebblestone: "very_bad",
  rock: "very_bad",
  rubber: "good",
  sand: "very_bad",
  sett: "bad",
  stepping_stones: "bad", // https://www.openstreetmap.org/way/669442481 Stones on grass
  stone: "bad",
  tartan: "good", // rubber https://www.google.com/search?q=tartan+paving
  unhewn_cobblestone: "very_bad",
  unpaved: "bad",
  wood: "intermediate",
  woodchips: "very_bad",
}

export const surfaceToSmoothnessNonStandardValues = {
  ":plates": "intermediate",
  "asphalt;compacted": "intermediate",
  "asphalt;paving_stones": "intermediate",
  "asphalt:lanes": "intermediate",
  "asphalt|sett": "very_bad",
  "cobblestone;ground": "bad",
  "compacted;paving_s": "bad",
  "compacted;paving_stones": "intermediate",
  "dirt/sand": "very_bad",
  "grass;gravel": "bad",
  "ground;grass": "bad",
  "paving_s;sett": "bad",
  "paving_stones;asphalt": "intermediate",
  "paving_stones;sett": "bad",
  "paving_stones:30": "intermediate",
  "sett;paving_s": "bad",
  "sett;paving_stones;cobblestone:flattened": "bad",
  "sett;paving_stones": "bad",
  grass_unpaved: "bad",
  grund: "bad",
  macadam: "intermediate", // https://www.google.com/search?q=macadam
  paving_stonees: "intermediate",
  tiles: "bad",
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
