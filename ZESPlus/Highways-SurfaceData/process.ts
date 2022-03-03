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

fs.readFile(osmHighwaysUnclipped, "utf8", (err, data) => {
  if (err) {
    console.error("🧨", err)
    return
  }
  console.time("⏱ Highways-SurfaceData/process.ts")

  const allHighways: FeatureCollection = JSON.parse(data)
  const collectedHighways: Feature[] = []

  allHighways.features.forEach((feature) => {
    addSmoothnessPropsAllScopes(feature)
  })

  filterAndWrite(smoothness, allHighways, outputFolder)

  filterAndWrite(TODO_WegeOhneSurface, allHighways, outputFolder)
  filterAndWrite(
    TODO_WegeOhneSmoothnessAberMitSurface,
    allHighways,
    outputFolder
  )
  filterAndWrite(TODO_fixSurfaceValues, allHighways, outputFolder)
  filterAndWrite(TODO_fixSmoothnessValues, allHighways, outputFolder)

  // Those checks are deactivated:
  //   - TODO_filterLeftoverHighwaysToBeCheckedManually
  //   - checkIfHighwayIsInMultipleCategories
  // They took too long and the result was questionable. We need to re-think and check those if we need them.

  writeGeoJson({
    data: collectedHighways,
    folder: outputFolder,
    fileNamePart: "collectedHighways",
  })

  console.timeEnd("⏱ Highways-SurfaceData/process.ts")
})
