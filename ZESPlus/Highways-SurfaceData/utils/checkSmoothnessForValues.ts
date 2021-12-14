import { Feature } from "../../utils/types"
import {
  addSmoothnessConfidenceCategoryHighwayType,
  addSmoothnessConfidenceCategorySmoothnessValue,
  addSmoothnessConfidenceCategorySurfaceValue,
} from "./addSmoothnessConfidenceCategories"
import { assumedSmoothnessBasedOnHighway } from "./assumedSmoothnessBasedOnHighway"
import { assumedSmoothnessBasedOnSurface } from "./assumedSmoothnessBasedOnSurface"
import { normalizedSmoothness } from "./normalizedSmoothness"
import { ScopeValues } from "./types"

export const checkSmoothnessForValues = (
  featureSmoothness: string,
  checkSmoothness: string,
  checkSurface: string,
  checkHighwayType: string,
  scope: ScopeValues,
  featureToAddHelperProps: Feature
) => {
  // Best result is having a smoothness tag
  if (featureSmoothness) {
    addSmoothnessConfidenceCategorySmoothnessValue(
      featureToAddHelperProps,
      checkSmoothness,
      scope
    )
    return normalizedSmoothness(featureSmoothness) === checkSmoothness
  }

  // Second best is, assuming the smoothness based of the surface
  if (checkSurface) {
    addSmoothnessConfidenceCategorySurfaceValue(
      featureToAddHelperProps,
      checkSurface,
      scope
    )
    return assumedSmoothnessBasedOnSurface(checkSurface) === checkSmoothness
  }

  // Third best is, assuming the smoothness based of the highway type
  if (checkHighwayType) {
    addSmoothnessConfidenceCategoryHighwayType(
      featureToAddHelperProps,
      checkHighwayType,
      scope
    )
    return assumedSmoothnessBasedOnHighway(checkHighwayType) === checkSmoothness
  }
}
