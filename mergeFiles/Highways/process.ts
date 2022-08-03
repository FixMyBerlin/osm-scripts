import fs from "fs"
import { osmHighwaysUnclipped } from "../../Bietigheim-Bissingen/Highways-PrepareData/files.const"
import { addCustomPropsBicycleWayData } from "../../utils/Highways-BicycleWayData/utils/addCustomProps"
import { addCustomPropsHighwayTypeData } from "../../utils/Highways-HighwayTypeData"
import { addCustomPropsMaxSpeedData } from "../../utils/Highways-MaxspeedData"
import { addCustomPropsSurfaceData } from "../../utils/Highways-SurfaceData"
import { FeatureCollection } from "../../utils/types"
import { writeGeoJson } from "../../utils/write"
import { outputFolder } from "./filesFolders.const"

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

  writeGeoJson({
    geoJsonData: allHighways,
    folder: outputFolder,
    fileNamePart: "allHighways",
  })

  console.timeEnd("⏱ Highways/process.ts")
})
