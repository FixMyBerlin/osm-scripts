import { overpassComposeToGeoJson } from "../ZESPlus/utils/overpassToGeoJson/overpassComposeToGeoJson"

overpassComposeToGeoJson({
  readFile: "./parking/output/osmRawHighways.json",
  outputFolder: "./parking/output/",
  fileNamePart: "osmHighwaysUnclipped",
})
