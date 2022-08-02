import { mergeFiles, wrapAsFeatureCollection } from "../../utils/mergeFiles"
import { writeGeoJson } from "../../utils/write"
import { outputFile as poiEducationOutputFile } from "../POI-Education/filesFolders.const"
import { outputFile as poiPlacesOutputFile } from "../POI-Places/filesFolders.const"
import { outputFile as poiPublicTransportOutputFile } from "../POI-PublicTransport/filesFolders.const"
import { outputFile as poiShoppingOutputFile } from "../POI-Shopping/filesFolders.const"
import { outputFolder } from "./filesFolders.const"

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
