import { mergeFiles, wrapAsFeatureCollection } from "../../utils/mergeFiles"
import { writeGeoJson } from "../../utils/write"
import { outputFile as poiBarriersOutputFile } from "../POI-Barriers/filesFolders.const"
import { outputFile as poiLanduseOutputFile } from "../POI-Landuse/filesFolders.const"
import { outputFolder } from "./filesFolders.const"

const filesToMerge = [poiBarriersOutputFile, poiLanduseOutputFile]

const mergedData = mergeFiles(filesToMerge)

writeGeoJson({
  geoJsonData: wrapAsFeatureCollection(mergedData),
  folder: outputFolder,
  fileNamePart: "mergedPoiAreasWays",
})
