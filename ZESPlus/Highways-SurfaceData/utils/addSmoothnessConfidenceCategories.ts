import { ScopeValues } from "./types"
import { highwayToAssumedSurface } from "./assumedSmoothnessBasedOnHighway"
import { assumedSmoothnessBasedOnSurface } from "./assumedSmoothnessBasedOnSurface"
import { normalizedSmoothness } from "./normalizedSmoothness"
import { Feature } from "../../utils/types"

const addSmoothnessConfidenceCategory = (
  feature: Feature,
  scope: ScopeValues,
  categoryString: string,
  sourceString: string
) => {
  feature.properties[`FMC:smoothnessConfidence:ForScope${scope}`] = "yes"
  feature.properties[`FMC:smoothnessConfidence:ForScope${scope}:Confidence`] =
    categoryString
  feature.properties[`FMC:smoothnessConfidence:ForScope${scope}:Source`] =
    sourceString
}

export const addSmoothnessConfidenceCategorySmoothnessValue = (
  featureToAddHelperProps: Feature,
  checkSmoothness: string,
  scope: ScopeValues
) => {
  addSmoothnessConfidenceCategory(
    featureToAddHelperProps,
    scope,
    "High",
    `Based on 'smoothness=${checkSmoothness}', which we normalize to '${normalizedSmoothness(
      checkSmoothness
    )}'`
  )
}

export const addSmoothnessConfidenceCategorySurfaceValue = (
  featureToAddHelperProps: Feature,
  checkSurface: string,
  scope: ScopeValues
) => {
  addSmoothnessConfidenceCategory(
    featureToAddHelperProps,
    scope,
    "Medium",
    `Based on 'surface=${checkSurface}', which we translate to '${assumedSmoothnessBasedOnSurface(
      checkSurface
    )}'`
  )
}

export const addSmoothnessConfidenceCategoryHighwayType = (
  featureToAddHelperProps: Feature,
  checkHighwayType: string,
  scope: ScopeValues
) => {
  addSmoothnessConfidenceCategory(
    featureToAddHelperProps,
    scope,
    "Low",
    `Based on 'highway=${checkHighwayType}', which we translate to '${highwayToAssumedSurface[checkHighwayType]}'`
  )
}
