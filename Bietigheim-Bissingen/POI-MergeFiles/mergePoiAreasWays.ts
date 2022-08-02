import { outputFile as poiBarriersOutputFile } from "../POI-Barriers/filesFolders.const"
import { outputFile as poiLanduseOutputFile } from "../POI-Landuse/filesFolders.const"
import { outputFolder } from "./filesFolders.const"
import { mergeFiles, wrapAsFeatureCollection } from "../../utils/mergeFiles"
import { writeGeoJson } from "../../utils/write"

const filesToMerge = [poiBarriersOutputFile, poiLanduseOutputFile]

const mergedData = mergeFiles(filesToMerge)

writeGeoJson({
  geoJsonData: wrapAsFeatureCollection(mergedData),
  folder: outputFolder,
  fileNamePart: "mergedPoiAreasWays",
})
