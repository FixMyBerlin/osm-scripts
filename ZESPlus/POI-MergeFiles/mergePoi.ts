import fs from "fs"
import { outputFile as poiBarriersOutputFile } from "../POI-Barriers/filesFolders.const"
import { outputFile as poiEducationOutputFile } from "../POI-Education/filesFolders.const"
import { outputFile as poiLanduseOutputFile } from "../POI-Landuse/filesFolders.const"
import { outputFile as poiPlacesOutputFile } from "../POI-Places/filesFolders.const"
import { outputFile as poiPublicTransportOutputFile } from "../POI-PublicTransport/filesFolders.const"
import { outputFile as poiShoppingOutputFile } from "../POI-Shopping/filesFolders.const"
import { writeGeoJson } from "../utils/writeGeoJson"
import { FeatureCollection } from "../utils/types"
import { outputFolder } from "./filesFolders.const"

const filesToMerge = [
  poiBarriersOutputFile,
  poiEducationOutputFile,
  poiLanduseOutputFile,
  poiPlacesOutputFile,
  poiPublicTransportOutputFile,
  poiShoppingOutputFile,
]

const mergedData = []

filesToMerge.forEach((file) => {
  console.time(`⏱ merge/forEach ${file}`)
  const data = JSON.parse(fs.readFileSync(file, { encoding: "utf8" }))

  data.features.map((feature) => mergedData.push(feature))
  console.timeEnd(`⏱ merge/forEach ${file}`)
})

const mergedDataAsGeoJson: FeatureCollection = {
  type: "FeatureCollection",
  features: mergedData,
}

writeGeoJson({
  geoJsonData: mergedDataAsGeoJson,
  folder: outputFolder,
  fileNamePart: "mergedPoi",
})
