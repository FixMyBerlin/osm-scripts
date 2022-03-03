import fs from "fs"
import { osmHighwaysUnclipped } from "../Highways-PrepareData/2-transpose-highways/files.const"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { filterAndWrite } from "../utils/filterAndWrite"
import { Feature, FeatureCollection } from "../utils/types"
import { writeGeoJson } from "../utils/writeGeoJson"
import { filterMaxspeed } from "./filter/filterMaxspeed"
import { addMaxspeedProperty } from "./utils/addMaxspeedProperty"
import { addMaxspeedSourceProperty } from "./utils/addMaxspeedSourceProperty"

const outputFolder = "./ZESPlus/Highways-MaxspeedData/output/"

fs.readFile(osmHighwaysUnclipped, "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.time("Highways-MaxspeedData/process.ts")

  const allHighways: FeatureCollection = JSON.parse(data)
  const collectedHighways: Feature[] = []

  allHighways.features.map((feature) => {
    addMaxspeedProperty(feature)
    addMaxspeedSourceProperty(feature)
  })

  filterAndWrite(filterMaxspeed, allHighways, outputFolder)

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

  console.timeEnd("Highways-MaxspeedData/process.ts")
})
