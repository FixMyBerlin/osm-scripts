import { overpassJsonToGeoJson } from "../../utils/overpassToGeoJson"
import { cleanupPropsFromPoiPoints } from "../../utils/propsHelper"
import { fileName, outputFolder, rawFile } from "./filesFolders.const"

overpassJsonToGeoJson({
  readFile: rawFile,
  outputFolder: outputFolder,
  fileNamePart: fileName,
  addPropertiesCallback: cleanupPropsFromPoiPoints,
})
