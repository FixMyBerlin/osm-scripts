import { Feature } from "../../utils/types"
import { checkSmoothnessForFeatureOnRoadSidewalkCycleway } from "../utils/checkSmoothnessForFeatureOnRoadSidewalkCycleway"

export const smoothnessExcellent = (feature: Feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "excellent")
}
export const smoothnessGood = (feature: Feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "good")
}
export const smoothnessIntermediate = (feature: Feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(
    feature,
    "intermediate"
  )
}

export const smoothnessBad = (feature: Feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "bad")
}
export const smoothnessVeryBad = (feature: Feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "very_bad")
}
