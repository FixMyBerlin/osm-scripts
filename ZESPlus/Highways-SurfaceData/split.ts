import fs from "fs"
import { osmHighwaysUnclipped } from "../Highways-PrepareData/2-transpose-highways/files.const"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { Feature, FeatureCollection } from "../utils/types"
import { writeGeoJson } from "../utils/writeGeoJson"
import { smoothness } from "./filter/smoothnessCategories"
import {
  TODO_fixSmoothnessValues,
  TODO_fixSurfaceValues,
  TODO_WegeOhneSmoothnessAberMitSurface,
  TODO_WegeOhneSurface,
} from "./filter/todos"
import { addSmoothnessPropsAllScopes } from "./utils/addSmoothnessPropsAllScopes"

const outputFolder = `${__dirname}/output`

// This file takes the generated smoothness file and splits it into separate files per smoothness.

const filterSmoothnessForAllScopes = (
  feature: Feature,
  checkSmoothness: string
) => {
  return (
    feature.properties["FMC:Smoothness:ScopeMainWay"] === checkSmoothness ||
    feature.properties["FMC:Smoothness:ScopeSidewalkOnMainWay"] ===
      checkSmoothness ||
    feature.properties["FMC:Smoothness:ScopeCyclewayOnMainWay"] ===
      checkSmoothness
  )
}

const smoothnessExcellent = (feature: Feature) =>
  filterSmoothnessForAllScopes(feature, "excellent")

const smoothnessGood = (feature: Feature) =>
  filterSmoothnessForAllScopes(feature, "good")

const smoothnessIntermediate = (feature: Feature) =>
  filterSmoothnessForAllScopes(feature, "intermediate")

const smoothnessBad = (feature: Feature) =>
  filterSmoothnessForAllScopes(feature, "bad")

const smoothnessVeryBad = (feature: Feature) =>
  filterSmoothnessForAllScopes(feature, "very_bad")

fs.readFile(`${outputFolder}/smoothness.geojson`, "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.time("Highways-SurfaceData/split.ts")

  const allHighways: FeatureCollection = JSON.parse(data)

  filterAndWrite(smoothnessExcellent, allHighways, outputFolder)
  filterAndWrite(smoothnessGood, allHighways, outputFolder)
  filterAndWrite(smoothnessIntermediate, allHighways, outputFolder)
  filterAndWrite(smoothnessBad, allHighways, outputFolder)
  filterAndWrite(smoothnessVeryBad, allHighways, outputFolder)

  console.timeEnd("Highways-SurfaceData/split.ts")
})
