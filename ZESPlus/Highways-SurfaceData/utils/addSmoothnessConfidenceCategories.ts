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
  // TODO We can make this nicer.
  // The goal is to have a list of scopes so that we can use this in
  // checkIfHighwayIsInMultipleCategories() to exclude those with multiple scopes from the list.
  // Issue 1: We have to manually overwrite the types here (for now)
  // Issue 2: The array holds duplicate values for some reason, which are filterin later but should not have to.
  feature.properties["FMC:appliedScopes"] = [
    ...((feature.properties["FMC:appliedScopes"] || []) as any),
    scope,
  ] as any
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