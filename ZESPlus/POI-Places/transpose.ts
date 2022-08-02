import { cleanupPropsFromPoiPoints } from "../../utils/propsHelper"
import { overpassJsonToGeoJson } from "../../utils/overpassToGeoJson"
import { fileName, outputFolder, rawFile } from "./filesFolders.const"

overpassJsonToGeoJson({
  readFile: rawFile,
  outputFolder: outputFolder,
  fileNamePart: fileName,
  addPropertiesCallback: cleanupPropsFromPoiPoints,
})
