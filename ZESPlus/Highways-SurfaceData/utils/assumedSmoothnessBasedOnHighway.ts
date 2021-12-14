import { assumedSmoothnessBasedOnSurface } from "./assumedSmoothnessBasedOnSurface"

export const highwayToAssumedSurface = {
  bridleway: "pebblestone",
  cycleway: "paving_stones",
  footway: "sett",
  living_street: "paving_stones",
  motorway_link: "asphalt",
  motorway: "asphalt",
  path: "compacted",
  pedestrian: "paving_stones",
  primary_link: "asphalt",
  primary: "asphalt",
  residential: "asphalt",
  rest_area: "asphalt",
  secondary: "asphalt",
  service: "sett",
  tertiary_link: "asphalt",
  tertiary: "asphalt",
  track: "compacted",
  trunk_link: "asphalt",
  trunk: "asphalt",
  unclassified: "asphalt",
}

export const assumedSmoothnessBasedOnHighway = (highwayValue: string) => {
  const assumedSurface = highwayToAssumedSurface[highwayValue]

  if (!assumedSurface) {
    console.error(
      `Error: Cannot find assumed surface for highway=${highwayValue}`
    )
  }

  return assumedSmoothnessBasedOnSurface(assumedSurface)
}
