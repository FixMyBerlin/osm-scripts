import fs from "fs"
import { addCustomPropsBicycleWayData } from "../Highways-BicycleWayData/utils/addCustomProps"
import { addCustomPropsHighwayTypeData } from "../Highways-HighwayTypeData/utils/addCustomProps"
import { addCustomPropsMaxSpeedData } from "../Highways-MaxspeedData/utils/addCustomProps"
import { osmHighwaysUnclipped } from "../Highways-PrepareData/2-transpose-highways/files.const"
import { addCustomPropsSurfaceData } from "../Highways-SurfaceData/utils/addCustomProps"
import { FeatureCollection } from "../utils/types"
import { writeGeoJson } from "../utils/writeGeoJson"
import { outputFolder } from "./filesFolders"

fs.readFile(osmHighwaysUnclipped, "utf8", (err, data) => {
  if (err) {
    console.error("🧨", err)
    return
  }
  console.time("⏱ Highways/process.ts")

  const allHighways: FeatureCollection = JSON.parse(data)

  allHighways.features.forEach((feature) => {
    addCustomPropsBicycleWayData(feature)
    addCustomPropsHighwayTypeData(feature)
    addCustomPropsMaxSpeedData(feature)
    addCustomPropsSurfaceData(feature)
  })

  // Needs to be at the end of the list, since it checks all previously categorised highways
  // if (process.env.SKIP_LEFTOVER_CHECK !== "true") {
  //   filterAndWrite(
  //     TODO_filterLeftoverHighwaysToBeCheckedManually,
  //     allHighways,
  //     outputFolder
  //   )
  // }

  // We can use this list to add notes to the list output/TODO_featuresWithMultipleCategories.json
  // const manualCheckList = [
  //   {
  //     "way/123": "Test eines veralteten Eintrags",
  //   },
  // ]

  // checkIfHighwayIsInMultipleCategories(
  //   allHighways,
  //   outputFolder,
  //   manualCheckList
  // )

  writeGeoJson({
    geoJsonData: allHighways,
    folder: outputFolder,
    fileNamePart: "allHighways",
  })

  console.timeEnd("⏱ Highways/process.ts")
})
