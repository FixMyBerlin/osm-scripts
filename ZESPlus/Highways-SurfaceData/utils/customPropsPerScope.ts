import { Feature } from "../../utils/types"
import { pickBestSmoothnessSourceAndAddCustomProps } from "./pickBestSmoothnessSourceAndAddCustomProps"

export const customPropsPerScope = (feature: Feature) => {
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
    const smoothness =
      feature.properties["sidewalk:smoothness"] ||
      feature.properties["sidewalk:both:smoothness"]
    const surface =
      feature.properties["sidewalk:surface"] ||
      feature.properties["sidewalk:both:surface"]
    pickBestSmoothnessSourceAndAddCustomProps(
      smoothness,
      surface,
      "footway",
      "SidewalkOnMainWay:Left",
      feature
    )
    pickBestSmoothnessSourceAndAddCustomProps(
      smoothness,
      surface,
      "footway",
      "SidewalkOnMainWay:Right",
      feature
    )
  }
  // Gehwege mit Radwegfreigabe: Links
  if (feature.properties["sidewalk:left:bicycle"] === "yes") {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["sidewalk:left:smoothness"],
      feature.properties["sidewalk:left:surface"],
      "footway",
      "SidewalkOnMainWay:Left",
      feature
    )
  }
  // Gehwege mit Radwegfreigabe: Rechts
  if (feature.properties["sidewalk:right:bicycle"] === "yes") {
    pickBestSmoothnessSourceAndAddCustomProps(
      feature.properties["sidewalk:right:smoothness"],
      feature.properties["sidewalk:right:surface"],
      "footway",
      "SidewalkOnMainWay:Right",
      feature
    )
  }
}

const addSmoothnessPropsForCyclewayOnMainWay = (feature: Feature) => {
  // Radweg an der Haupt way gemapped: Beide Seiten
  if (
    ["yes", "designated"].includes(feature.properties["cycleway:both:bicycle"])
  ) {
    const smoothness =
      feature.properties["cycleway:smoothness"] ||
      feature.properties["cycleway:both:smoothness"]
    const surface =
      feature.properties["cycleway:surface"] ||
      feature.properties["cycleway:both:surface"]
    pickBestSmoothnessSourceAndAddCustomProps(
      smoothness,
      surface,
      "cycleway",
      "CyclewayOnMainWay:Left",
      feature
    )
    pickBestSmoothnessSourceAndAddCustomProps(
      smoothness,
      surface,
      "cycleway",
      "CyclewayOnMainWay:Right",
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
      "CyclewayOnMainWay:Left",
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
      "CyclewayOnMainWay:Right",
      feature
    )
  }
}
