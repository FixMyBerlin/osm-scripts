import { overpassComposeToGeoJson } from "../ZESPlus/utils/overpassToGeoJson/overpassComposeToGeoJson"
import { osmRawHighways, outputFolder } from "./files.const"

overpassComposeToGeoJson({
  readFile: osmRawHighways,
  outputFolder: outputFolder,
  fileNamePart: "osmHighwaysUnclipped",
})
