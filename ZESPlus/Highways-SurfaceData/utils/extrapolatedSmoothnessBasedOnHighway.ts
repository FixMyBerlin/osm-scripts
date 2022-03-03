import { extrapolatedSmoothnessBasedOnSurface } from "./extrapolatedSmoothnessBasedOnSurface"

export const highwayToAssumedSurface = {
  bridleway: "pebblestone",
  cycleway: "paving_stones",
  footway: "paving_stones",
  living_street: "paving_stones",
  motorway_link: "asphalt",
  motorway: "asphalt",
  path: "compacted",
  pedestrian: "paving_stones",
  primary_link: "asphalt",
  primary: "asphalt",
  residential: "sett", // This is very ZES+ specific, in other regions it is likely 'asphalt'
  rest_area: "asphalt",
  secondary: "asphalt",
  service: "paving_stones",
  tertiary_link: "asphalt",
  tertiary: "asphalt",
  track: "compacted",
  trunk_link: "asphalt",
  trunk: "asphalt",
  unclassified: "asphalt",
  steps: "asphalt",
}

export const extrapolatedSmoothnessBasedOnHighway = (highwayValue: string) => {
  const assumedSurface = highwayToAssumedSurface[highwayValue]

  if (!assumedSurface) {
    console.error(
      `🧨 Error: Cannot extrapolate surface for highway=${highwayValue}`
    )
  }

  return extrapolatedSmoothnessBasedOnSurface(assumedSurface)
}
