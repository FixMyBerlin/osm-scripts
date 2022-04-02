import { outputFile as poiEducationOutputFile } from "../POI-Education/filesFolders.const"
import { outputFile as poiPlacesOutputFile } from "../POI-Places/filesFolders.const"
import { outputFile as poiPublicTransportOutputFile } from "../POI-PublicTransport/filesFolders.const"
import { outputFile as poiShoppingOutputFile } from "../POI-Shopping/filesFolders.const"
import { writeGeoJson } from "../utils/writeGeoJson"
import { outputFolder } from "./filesFolders.const"
import { mergeFiles, wrapAsFeatureCollection } from "./utils"

const filesToMerge = [
  poiEducationOutputFile,
  poiPlacesOutputFile,
  poiPublicTransportOutputFile,
  poiShoppingOutputFile,
]

const mergedData = mergeFiles(filesToMerge)

writeGeoJson({
  geoJsonData: wrapAsFeatureCollection(mergedData),
  folder: outputFolder,
  fileNamePart: "mergedPoiPoints",
})
