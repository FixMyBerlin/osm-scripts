import { Feature } from "../../utils/types"

export const TODO_WegeOhneSurface = (feature: Feature) => {
  return !feature.properties.surface
}
export const TODO_WegeOhneSmoothnessAberMitSurface = (feature: Feature) => {
  return feature.properties.surface && !feature.properties.smoothness
}

// A list of borken smoothness values that we need to cleanup in OSM.
export const TODO_fixSmoothnessValues = (feature: Feature) => {
  return ["verbad"].includes(feature.properties.smoothness)
}
