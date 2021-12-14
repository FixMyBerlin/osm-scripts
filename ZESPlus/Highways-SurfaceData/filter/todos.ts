import { Feature } from "../../utils/types"
import { irrelevanteWege } from "./irrelevanteWege"

export const TODO_WegeOhneSurface = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  return !feature.properties.surface
}
export const TODO_WegeOhneSmoothnessAberMitSurface = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  return feature.properties.surface && !feature.properties.smoothness
}

// A list of borken smoothness values that we need to cleanup in OSM.
export const TODO_fixSmoothnessValues = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  return ["verbad"].includes(feature.properties.smoothness)
}
