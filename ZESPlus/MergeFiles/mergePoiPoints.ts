import fs from "fs"
import { outputFile as poiShoppingOutputFile } from "../POI-Shopping/filesFolders.const"
import { outputFile as poiPublicTransportOutputFile } from "../POI-PublicTransport/filesFolders.const"
import { outputFile as poiEducationOutputFile } from "../POI-Education/filesFolders.const"
import { writeGeoJson } from "../utils/writeGeoJson"
import { FeatureCollection } from "../utils/types"

const filesToMerge = [
  poiShoppingOutputFile,
  poiPublicTransportOutputFile,
  poiEducationOutputFile,
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
  folder: __dirname,
  fileNamePart: "mergedPoiPoints",
})
