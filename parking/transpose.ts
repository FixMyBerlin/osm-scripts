import { overpassComposeToGeoJson } from "../ZESPlus/utils/overpassToGeoJson/overpassComposeToGeoJson"

overpassComposeToGeoJson({
  readFile: "./parking/output/osmRawHighways.json",
  outputFolder: __dirname,
  fileNamePart: "osmHighwaysUnclipped",
})
