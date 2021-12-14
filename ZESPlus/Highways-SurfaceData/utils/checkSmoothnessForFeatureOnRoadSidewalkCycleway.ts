import { Feature } from "../../utils/types"
import { irrelevanteWege } from "../filter/irrelevanteWege"
import { checkSmoothnessForValues } from "./checkSmoothnessForValues"

export const checkSmoothnessForFeatureOnRoadSidewalkCycleway = (
  feature: Feature,
  checkSmoothness: string
) => {
  if (irrelevanteWege(feature)) return false
  // When sidewalks and cycleways are mapped as part of the main road,
  // we want to categorize all instances.
  // We need to create the itterator manually, to keep our Best-Second-Third-Logic in tact.
  const addFeature = [false]

  addFeature.push(
    checkSmoothnessForValues(
      feature.properties.smoothness,
      checkSmoothness,
      feature.properties.surface,
      feature.properties.highway,
      "MainWay",
      feature
    )
  )

  // Gehwege mit Radwegfreigabe: Beide Seiten
  if (feature.properties["sidewalk:both:bicycle"] === "yes") {
    addFeature.push(
      checkSmoothnessForValues(
        feature.properties["sidewalk:smoothness"] ||
          feature.properties["sidewalk:both:smoothness"],
        checkSmoothness,
        feature.properties["sidewalk:surface"] ||
          feature.properties["sidewalk:both:surface"],
        "footway",
        "SidewalkOnMainWay",
        feature
      )
    )
  }
  // Gehwege mit Radwegfreigabe: Links
  if (feature.properties["sidewalk:left:bicycle"] === "yes") {
    addFeature.push(
      checkSmoothnessForValues(
        feature.properties["sidewalk:left:smoothness"],
        checkSmoothness,
        feature.properties["sidewalk:left:surface"],
        "footway",
        "SidewalkOnMainWay",
        feature
      )
    )
  }
  // Gehwege mit Radwegfreigabe: Rechts
  if (feature.properties["sidewalk:right:bicycle"] === "yes") {
    addFeature.push(
      checkSmoothnessForValues(
        feature.properties["sidewalk:right:smoothness"],
        checkSmoothness,
        feature.properties["sidewalk:right:surface"],
        "footway",
        "SidewalkOnMainWay",
        feature
      )
    )
  }

  // Radweg an der Haupt way gemapped: Beide Seiten
  if (
    ["yes", "designated"].includes(feature.properties["cycleway:both:bicycle"])
  ) {
    addFeature.push(
      checkSmoothnessForValues(
        feature.properties["cycleway:smoothness"] ||
          feature.properties["cycleway:both:smoothness"],
        checkSmoothness,
        feature.properties["cycleway:surface"] ||
          feature.properties["cycleway:both:surface"],
        "cycleway",
        "CyclewayOnMainWay",
        feature
      )
    )
  }
  // Radweg an der Haupt way gemapped: Links
  if (
    ["yes", "designated"].includes(feature.properties["cycleway:left:bicycle"])
  ) {
    addFeature.push(
      checkSmoothnessForValues(
        feature.properties["cycleway:left:smoothness"],
        checkSmoothness,
        feature.properties["cycleway:left:surface"],
        "cycleway",
        "CyclewayOnMainWay",
        feature
      )
    )
  }
  // Radweg an der Haupt way gemapped: Rechts
  if (
    ["yes", "designated"].includes(feature.properties["cycleway:right:bicycle"])
  ) {
    addFeature.push(
      checkSmoothnessForValues(
        feature.properties["cycleway:right:smoothness"],
        checkSmoothness,
        feature.properties["cycleway:right:surface"],
        "cycleway",
        "CyclewayOnMainWay",
        feature
      )
    )
  }

  return addFeature.includes(true)
}
