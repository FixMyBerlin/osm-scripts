import { Feature } from "../../types"
import {
  extrapolatedSmoothnessBasedOnHighway,
  highwayToAssumedSurface,
} from "./extrapolatedSmoothnessBasedOnHighway"
import { extrapolatedSmoothnessBasedOnSurface } from "./extrapolatedSmoothnessBasedOnSurface"
import { addCollecorProp } from "./handleCollectorProp"
import { normalizedSmoothness } from "./normalizedSmoothness"
import { ScopeValues } from "./types"

const addCustomProps = (
  feature: Feature,
  scope: ScopeValues,
  smoothness: string,
  conficenceString: string,
  sourceString: string
) => {
  feature.properties[`FMC:Category:SurfaceData:Scope${scope}`] = smoothness
  feature.properties[`FMC:Category:SurfaceData:Scope${scope}:Confidence`] =
    conficenceString
  feature.properties[`FMC:Category:SurfaceData:Scope${scope}:Source`] =
    sourceString
  addCollecorProp(feature, `${scope}`, "AllScopeValues")
  addCollecorProp(feature, smoothness, "AllSmoothnessValues")
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
