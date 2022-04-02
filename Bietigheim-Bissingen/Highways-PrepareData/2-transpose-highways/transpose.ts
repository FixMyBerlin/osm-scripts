import { overpassComposeToGeoJson } from "../../utils/overpassToGeoJson/overpassComposeToGeoJson"
import { cleanupNonNeededTags } from "./utils/cleanupNonNeededTags"
import { enhanceDataWitAreaInformation } from "./utils/enhanceDataWitAreaInformation"

overpassComposeToGeoJson({
  readFile:
    "./Bietigheim-Bissingen/Highways-PrepareData/1-download-highways/osmRawHighways.json",
  outputFolder: __dirname,
  fileNamePart: "osmHighwaysUnclipped",
  filterCallback: cleanupNonNeededTags,
  areaCallback: enhanceDataWitAreaInformation,
})
