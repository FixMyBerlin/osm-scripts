import { Feature } from "../../utils/types"
import { surfaceToSmoothnessNonStandardValues } from "../utils/assumedSmoothnessBasedOnSurface"
import { smoothnessNormalizationTypos } from "../utils/normalizedSmoothness"
import { irrelevanteWege } from "./irrelevanteWege"

export const TODO_WegeOhneSurface = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  return !feature.properties.surface
}
export const TODO_WegeOhneSmoothnessAberMitSurface = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  return feature.properties.surface && !feature.properties.smoothness
}

export const TODO_fixSurfaceValues = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  // A list of non standard values that we need to cleanup in OSM.
  const hasNonStandardValue = Object.keys(
    surfaceToSmoothnessNonStandardValues
  ).includes(feature.properties.surface)

  return hasNonStandardValue
}

export const TODO_fixSmoothnessValues = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  // A list of broken smoothness values that we need to cleanup in OSM.
  const hasTypos = Object.keys(smoothnessNormalizationTypos).includes(
    feature.properties.smoothness
  )

  const hasCapitalLetters =
    feature.properties.smoothness?.toLowerCase() !==
      feature.properties.smoothness ||
    feature.properties.surface?.toLowerCase() !== feature.properties.surface ||
    feature.properties.highway?.toLowerCase() !== feature.properties.highway

  return hasTypos || hasCapitalLetters
}
