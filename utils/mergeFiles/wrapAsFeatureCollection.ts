import { Feature, FeatureCollection } from "../types"

export const wrapAsFeatureCollection = (
  mergedData: Feature[]
): FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: mergedData,
  }
}
