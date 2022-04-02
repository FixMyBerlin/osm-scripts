import { cleanupPropsFromPoiPoints } from "../POI/utils/cleanupPropsFromPoiPoints"
import { overpassJsonToGeoJson } from "../utils/overpassToGeoJson/overpassJsonToGeoJson"
import { fileName, outputFolder, rawFile } from "./filesFolders.const"

overpassJsonToGeoJson({
  readFile: rawFile,
  outputFolder: outputFolder,
  fileNamePart: fileName,
  addPropertiesCallback: cleanupPropsFromPoiPoints,
})
