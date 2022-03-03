import { Feature } from "../../utils/types"
import {
  extrapolatedSmoothnessBasedOnHighway,
  highwayToAssumedSurface,
} from "./extrapolatedSmoothnessBasedOnHighway"
import { extrapolatedSmoothnessBasedOnSurface } from "./extrapolatedSmoothnessBasedOnSurface"
import { normalizedSmoothness } from "./normalizedSmoothness"
import { ScopeValues } from "./types"

const addCustomProps = (
  feature: Feature,
  scope: ScopeValues,
  smoothness: string,
  conficenceString: string,
  sourceString: string
) => {
  feature.properties[`FMC:Smoothness:Scope${scope}`] = smoothness
  feature.properties[`FMC:Smoothness:Scope${scope}:Confidence`] =
    conficenceString
  feature.properties[`FMC:Smoothness:Scope${scope}:Source`] = sourceString
  // Cannot get the types working for this one…
  feature.properties["FMC:Smoothness:AppliedScopes"] = [
    ...((feature.properties["FMC:Smoothness:AppliedScopes"] || []) as any),
    scope,
  ] as any
}

export const addCustomPropsBasedOnSmoothness = (
  featureToAddHelperProps: Feature,
  smoothnessValue: string,
  scope: ScopeValues
) => {
  const normalizedSmoothnessValue = normalizedSmoothness(smoothnessValue)
  const sourceString =
    smoothnessValue === normalizedSmoothnessValue
      ? `Based on 'smoothness=${smoothnessValue}'`
      : `Based on 'smoothness=${smoothnessValue}', which we normalize to '${normalizedSmoothnessValue}'`

  addCustomProps(
    featureToAddHelperProps,
    scope,
    normalizedSmoothnessValue,
    "High",
    sourceString
  )
}

export const addCustomPropsBasedOnSurface = (
  featureToAddHelperProps: Feature,
  checkSurface: string,
  scope: ScopeValues
) => {
  const extrapolatedSmoothessValue =
    extrapolatedSmoothnessBasedOnSurface(checkSurface)

  addCustomProps(
    featureToAddHelperProps,
    scope,
    extrapolatedSmoothessValue,
    "Medium",
    `Based on 'surface=${checkSurface}', which we extrapolate to '${extrapolatedSmoothessValue}'`
  )
}

export const addCustomPropsBasedOnHighway = (
  featureToAddHelperProps: Feature,
  highwayValue: string,
  scope: ScopeValues
) => {
  const extrapolatedSurfaceValue = highwayToAssumedSurface[highwayValue]
  const extrapolatedSmoothnessValue =
    extrapolatedSmoothnessBasedOnHighway(highwayValue)

  addCustomProps(
    featureToAddHelperProps,
    scope,
    extrapolatedSmoothnessValue,
    "Low",
    `Based on 'highway=${highwayValue}', which we extrapolate to '${extrapolatedSurfaceValue}', which we then extrapolate to '${extrapolatedSmoothnessValue}'`
  )
}
