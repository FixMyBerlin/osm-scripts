import { outputFile as poiBarriersOutputFile } from "../POI-Barriers/filesFolders.const"
import { outputFile as poiLanduseOutputFile } from "../POI-Landuse/filesFolders.const"
import { writeGeoJson } from "../utils/writeGeoJson"
import { outputFolder } from "./filesFolders.const"
import { mergeFiles, wrapAsFeatureCollection } from "./utils"

const filesToMerge = [poiBarriersOutputFile, poiLanduseOutputFile]

const mergedData = mergeFiles(filesToMerge)

writeGeoJson({
  geoJsonData: wrapAsFeatureCollection(mergedData),
  folder: outputFolder,
  fileNamePart: "mergedPoiAreasWays",
})
