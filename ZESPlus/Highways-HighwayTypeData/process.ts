import fs from "fs"
import { irrelevanteWege } from "./filter/irrelevanteWege"
import {
  TODO_AddIsSidepath,
  TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist,
  TODO_BuergersteigTaggingFehlt,
  TODO_ServiceWithoutAccessAndSubtagging,
} from "./filter/todos"
import { typAusserorts } from "./filter/typE_Ausserorts"
import { typFreiGefuehrt } from "./filter/typF_FreiGefuehrt"
import { typHauptUndSammelstrasse } from "./filter/typC_HauptUndSammelstrasse"
import { typWohnstrasse } from "./filter/typA_Wohnstrasse"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { Feature, FeatureCollection } from "../utils/types"
import { writeGeoJson } from "../utils/writeGeoJson"
import { osmHighwaysUnclipped } from "../Highways-PrepareData/2-transpose-highways/files.const"

const outputFolder = `${__dirname}/output`

fs.readFile(osmHighwaysUnclipped, "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.time("Highways-HighwayTypeData/process.ts")

  const allHighways: FeatureCollection = JSON.parse(data)
  const collectedHighways: Feature[] = []

  filterAndWrite(irrelevanteWege, allHighways, outputFolder)

  filterAndWrite(typWohnstrasse, allHighways, outputFolder, collectedHighways)
  filterAndWrite(
    typHauptUndSammelstrasse,
    allHighways,
    outputFolder,
    collectedHighways
  )
  filterAndWrite(typAusserorts, allHighways, outputFolder, collectedHighways)
  filterAndWrite(typFreiGefuehrt, allHighways, outputFolder, collectedHighways)

  filterAndWrite(TODO_BuergersteigTaggingFehlt, allHighways, outputFolder)
  filterAndWrite(TODO_AddIsSidepath, allHighways, outputFolder)
  filterAndWrite(
    TODO_ServiceWithoutAccessAndSubtagging,
    allHighways,
    outputFolder
  )
  filterAndWrite(
    TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist,
    allHighways,
    outputFolder
  )

  // Needs to be at the end of the list, since it checks all previously categorised highways
  if (process.env.SKIP_LEFTOVER_CHECK !== "true") {
    filterAndWrite(
      TODO_filterLeftoverHighwaysToBeCheckedManually,
      allHighways,
      outputFolder
    )
  }

  // We can use this list to add notes to the list output/TODO_featuresWithMultipleCategories.json
  const manualCheckList = [
    {
      "way/123": "Test eines veralteten Eintrags",
    },
  ]

  checkIfHighwayIsInMultipleCategories(
    allHighways,
    outputFolder,
    manualCheckList
  )

  writeGeoJson({
    data: collectedHighways,
    folder: outputFolder,
    fileNamePart: "collectedHighways",
  })

  console.timeEnd("Highways-HighwayTypeData/process.ts")
})
