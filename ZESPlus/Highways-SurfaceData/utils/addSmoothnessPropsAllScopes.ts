import { Feature } from "../../utils/types"
import { pickBestSmoothnessSourceAndAddCustomProps } from "./pickBestSmoothnessSourceAndAddCustomProps"

export const addSmoothnessPropsAllScopes = (feature: Feature) => {
  // MainWay
  pickBestSmoothnessSourceAndAddCustomProps(
    feature.properties.smoothness,
    feature.properties.surface,
    feature.properties.highway,
    "MainWay",
    feature
  )

  // SidewalkOnMainWay
  addSmoothnessPropsForSidewalkOnMainWay(feature)

  // CyclewayOnMainWay
  addSmoothnessPropsForCyclewayOnMainWay(feature)
}

const addSmoothnessPropsForSidewalkOnMainWay = (feature: Feature) => {
  // Gehwege mit Radwegfreigabe: Beide Seiten
  if (feature.properties["sidewalk:both:bicycle"] === "yes") {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["sidewalk:smoothness"] ||
        feature.properties["sidewalk:both:smoothness"],
      feature.properties["sidewalk:surface"] ||
        feature.properties["sidewalk:both:surface"],
      "footway",
      "SidewalkOnMainWay",
      feature
    )
  }
  // Gehwege mit Radwegfreigabe: Links
  if (feature.properties["sidewalk:left:bicycle"] === "yes") {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["sidewalk:left:smoothness"],
      feature.properties["sidewalk:left:surface"],
      "footway",
      "SidewalkOnMainWay",
      feature
    )
  }
  // Gehwege mit Radwegfreigabe: Rechts
  if (feature.properties["sidewalk:right:bicycle"] === "yes") {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["sidewalk:right:smoothness"],
      feature.properties["sidewalk:right:surface"],
      "footway",
      "SidewalkOnMainWay",
      feature
    )
  }
}

const addSmoothnessPropsForCyclewayOnMainWay = (feature: Feature) => {
  // Radweg an der Haupt way gemapped: Beide Seiten
  if (
    ["yes", "designated"].includes(feature.properties["cycleway:both:bicycle"])
  ) {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["cycleway:smoothness"] ||
        feature.properties["cycleway:both:smoothness"],
      feature.properties["cycleway:surface"] ||
        feature.properties["cycleway:both:surface"],
      "cycleway",
      "CyclewayOnMainWay",
      feature
    )
  }
  // Radweg an der Haupt way gemapped: Links
  if (
    ["yes", "designated"].includes(feature.properties["cycleway:left:bicycle"])
  ) {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["cycleway:left:smoothness"],
      feature.properties["cycleway:left:surface"],
      "cycleway",
      "CyclewayOnMainWay",
      feature
    )
  }
  // Radweg an der Haupt way gemapped: Rechts
  if (
    ["yes", "designated"].includes(feature.properties["cycleway:right:bicycle"])
  ) {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["cycleway:right:smoothness"],
      feature.properties["cycleway:right:surface"],
      "cycleway",
      "CyclewayOnMainWay",
      feature
    )
  }
}
