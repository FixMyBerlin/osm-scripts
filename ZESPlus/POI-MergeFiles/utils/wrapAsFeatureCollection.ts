import { Feature, FeatureCollection } from "../../utils/types"

export const wrapAsFeatureCollection = (
  mergedData: Feature[]
): FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: mergedData,
  }
}
