import fs from "fs"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { cleanupDirectory } from "../utils/cleanupDirectory"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { irrelevanteWege } from "./filter/irrelevanteWege"
import {
  smoothnessBad,
  smoothnessExcellent,
  smoothnessGood,
  smoothnessIntermediate,
  smoothnessVeryBad,
} from "./filter/smoothnessCategories"
import {
  TODO_fixSmoothnessValues,
  TODO_WegeOhneSmoothnessAberMitSurface,
  TODO_WegeOhneSurface,
} from "./filter/todos"

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
