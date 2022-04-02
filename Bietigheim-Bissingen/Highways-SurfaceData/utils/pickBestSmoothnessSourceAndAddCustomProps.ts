import { Feature } from "../../utils/types"
import {
  addCustomPropsBasedOnHighway,
  addCustomPropsBasedOnSmoothness,
  addCustomPropsBasedOnSurface,
} from "./addCustomSmoothnessProps"
import { extrapolatedSmoothnessBasedOnHighway } from "./extrapolatedSmoothnessBasedOnHighway"
import { extrapolatedSmoothnessBasedOnSurface } from "./extrapolatedSmoothnessBasedOnSurface"
import { normalizedSmoothness } from "./normalizedSmoothness"
import { ScopeValues } from "./types"

export const pickBestSmoothnessSourceAndAddCustomProps = (
  smoothnessValue: string,
  surfaceValue: string,
  highwayValue: string,
  scope: ScopeValues,
  featureToAddHelperProps: Feature
) => {
  // Best result is having a smoothness tag
  if (smoothnessValue) {
    addCustomPropsBasedOnSmoothness(
      featureToAddHelperProps,
      smoothnessValue,
      scope
    )
    return
  }

  // Second best is, assuming the smoothness based of the surface
  if (surfaceValue) {
    addCustomPropsBasedOnSurface(featureToAddHelperProps, surfaceValue, scope)
    return
  }

  // Third best is, assuming the smoothness based of the highway type
  if (highwayValue) {
    addCustomPropsBasedOnHighway(featureToAddHelperProps, highwayValue, scope)
    return
  }
}
