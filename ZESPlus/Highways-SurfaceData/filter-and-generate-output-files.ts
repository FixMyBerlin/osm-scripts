import fs from "fs"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { irrelevanteWege } from "./filter/irrelevanteWege"
import {
  TODO_WegeOhneSmoothnessAberMitSurface,
  TODO_WegeOhneSurface,
} from "./filter/todos"
import {
  smoothnessExcellent,
  smoothnessGood,
  smoothnessIntermediate,
  smoothnessBad,
  smoothnessVeryBad,
} from "./filter/smoothnessCategories"
import { cleanupDirectory } from "../utils/cleanupDirectory"

let allHighways = {}
const outputFolder = "./ZESPlus/Highways-SurfaceData/output/"

fs.readFile(
  "./ZESPlus/Highways-PrepareData/2-transpose-highways/osmHighwaysUnclipped.geojson",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    cleanupDirectory(outputFolder)

    allHighways = JSON.parse(data)

    filterAndWrite(irrelevanteWege, allHighways, outputFolder)

    filterAndWrite(smoothnessExcellent, allHighways, outputFolder)
    filterAndWrite(smoothnessGood, allHighways, outputFolder)
    filterAndWrite(smoothnessIntermediate, allHighways, outputFolder)
    filterAndWrite(smoothnessBad, allHighways, outputFolder)
    filterAndWrite(smoothnessVeryBad, allHighways, outputFolder)

    filterAndWrite(TODO_WegeOhneSurface, allHighways, outputFolder)
    filterAndWrite(
      TODO_WegeOhneSmoothnessAberMitSurface,
      allHighways,
      outputFolder
    )
    filterAndWrite(TODO_fixSmoothnessValues, allHighways, outputFolder)
    filterAndWrite(
      TODO_filterLeftoverHighwaysToBeCheckedManually,
      allHighways,
      outputFolder
    )

    checkIfHighwayIsInMultipleCategories(outputFolder)
  }
)

const addSmoothnessConfidenceCategory = (
  feature,
  scope: ScopeValues,
  categoryString,
  sourceString
) => {
  feature.properties[`FMC:smoothnessConfidence:ForScope${scope}`] = "yes"
  feature.properties[`FMC:smoothnessConfidence:ForScope${scope}:Confidence`] =
    categoryString
  feature.properties[`FMC:smoothnessConfidence:ForScope${scope}:Source`] =
    sourceString
}

const addSmoothnessConfidenceCategorySmoothnessValue = (
  feature,
  scope: ScopeValues
) => {
  addSmoothnessConfidenceCategory(
    feature,
    scope,
    "High",
    `Based on 'smoothness=${
      feature.properties.smoothness
    }', which we normalize to '${normalizedSmoothness(
      feature.properties.smoothness
    )}'`
  )
}

const addSmoothnessConfidenceCategorySurfaceValue = (
  feature,
  scope: ScopeValues
) => {
  addSmoothnessConfidenceCategory(
    feature,
    scope,
    "Medium",
    `Based on 'surface=${feature.properties.surface}', which we translate to '${
      surfaceToSmoothness[feature.properties.surface]
    }'`
  )
}

const addSmoothnessConfidenceCategoryHighwayType = (
  feature,
  scope: ScopeValues,
  highwayType
) => {
  addSmoothnessConfidenceCategory(
    feature,
    scope,
    "Low",
    `Based on 'highway=${highwayType}', which we translate to '${highwayToAssumedSurface[highwayType]}'`
  )
}

const smoothnessNormalization = {
  excellent: "excellent",
  very_good: "excellent",
  good: "good",
  intermediate: "intermediate",
  bad: "bad",
  very_bad: "very_bad",
  impassable: "very_bad",
  horrible: "very_bad",
  very_horrible: "very_bad",
  verbad: "very_bad", // TODO fixed in OSM, remove after next download
}

const normalizedSmoothness = (smoothnessValue) => {
  const assumedSmoothness = smoothnessNormalization[smoothnessValue]
  if (!assumedSmoothness) {
    return console.error(
      `Error: Cannot find assumed surface for smoothness=${smoothnessValue}`
    )
  }

  return assumedSmoothness
}

const TODO_fixSmoothnessValues = (feature) => {
  return feature.properties.smoothness === "verbad"
}

const surfaceToSmoothness = {
  "cobblestone:flattened": "bad",
  "concrete:plates": "intermediate",
  asphalt: "good",
  cobblestone: "very_bad",
  compacted: "intermediate",
  concrete: "intermediate",
  dirt: "bad",
  earth: "bad",
  fine_gravel: "intermediate", // Meist ein "besseres compacted", daher ggf. auch "good"
  grass_paver: "bad",
  grass: "bad",
  gravel: "bad",
  ground: "bad",
  metal: "good",
  paved: "intermediate",
  paving_stones: "intermediate",
  pebblestone: "very_bad",
  sand: "very_bad",
  sett: "bad",
  unhewn_cobblestone: "very_bad",
  unpaved: "bad",
  wood: "intermediate",
}

const assumedSmoothnessBasedOnSurface = (surfaceValue) => {
  const assumedSmoothness = surfaceToSmoothness[surfaceValue]
  if (!assumedSmoothness)
    return console.error(
      `Error: Cannot find assumed surface for surface=${surfaceValue}`
    )

  return assumedSmoothness
}

const highwayToAssumedSurface = {
  bridleway: "pebblestone", // Translated to 'smoothness=very_bad'
  cycleway: "paving_stones",
  footway: "sett",
  living_street: "paving_stones",
  motorway_link: "asphalt",
  motorway: "asphalt",
  path: "compacted",
  pedestrian: "paving_stones",
  primary_link: "asphalt",
  primary: "asphalt",
  residential: "asphalt",
  rest_area: "asphalt",
  secondary: "asphalt",
  service: "sett",
  tertiary_link: "asphalt",
  tertiary: "asphalt",
  track: "compacted",
  trunk_link: "asphalt",
  trunk: "asphalt",
  unclassified: "asphalt",
}

const assumedSmoothnessBasedOnHighway = (highwayValue) => {
  const assumedSurface = highwayToAssumedSurface[highwayValue]
  if (!assumedSurface)
    return console.error(
      `Error: Cannot find assumed surface for highway=${highwayValue}`
    )

  return assumedSmoothnessBasedOnSurface(highwayToAssumedSurface[highwayValue])
}

type ScopeValues = "MainWay" | "SidewalkOnMainWay" | "CyclewayOnMainWay"

const checkSmoothnessForValues = (
  featureSmoothness,
  checkSmoothness,
  surface,
  highwayType,
  scope: ScopeValues,
  featureToAddHelperProps
) => {
  // Best result is having a smoothness tag
  if (featureSmoothness) {
    addSmoothnessConfidenceCategorySmoothnessValue(
      featureToAddHelperProps,
      scope
    )
    return normalizedSmoothness(featureSmoothness) === checkSmoothness
  }

  // Second best is, assuming the smoothness based of the surface
  if (surface) {
    addSmoothnessConfidenceCategorySurfaceValue(featureToAddHelperProps, scope)
    return assumedSmoothnessBasedOnSurface(surface) === checkSmoothness
  }

  // Third best is, assuming the smoothness based of the highway type
  if (highwayType) {
    addSmoothnessConfidenceCategoryHighwayType(
      featureToAddHelperProps,
      scope,
      highwayType
    )
    return assumedSmoothnessBasedOnHighway(highwayType) === checkSmoothness
  }
}

export const checkSmoothnessForFeatureOnRoadSidewalkCycleway = (
  feature,
  checkSmoothness
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
