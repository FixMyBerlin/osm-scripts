import { checkSmoothnessForFeatureOnRoadSidewalkCycleway } from "../filter-and-generate-output-files"

export const smoothnessExcellent = (feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "excellent")
}
export const smoothnessGood = (feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "good")
}
export const smoothnessIntermediate = (feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(
    feature,
    "intermediate"
  )
}

export const smoothnessBad = (feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "bad")
}
export const smoothnessVeryBad = (feature) => {
  return checkSmoothnessForFeatureOnRoadSidewalkCycleway(feature, "very_bad")
}
