import { overpassComposeToGeoJson } from "../../utils/overpassToGeoJson/overpassComposeToGeoJson"
import { enhanceDataWitAreaInformation } from "./utils/enhanceDataWitAreaInformation"

overpassComposeToGeoJson({
  readFile:
    "./ZESPlus/Highways-PrepareData/1-download-highways/osmRawHighways.json",
  outputFolder: __dirname,
  fileNamePart: "osmHighwaysUnclipped",
  areaCallback: enhanceDataWitAreaInformation,
})
