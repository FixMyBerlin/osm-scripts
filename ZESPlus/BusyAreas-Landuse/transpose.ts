import { overpassJsonToGeoJson } from "../utils/overpassToGeoJson/overpassJsonToGeoJson"

overpassJsonToGeoJson({
  readFile: "./ZESPlus/BusyAreas-Landuse/output/raw/shops.json",
  outputFolder: "./ZESPlus/BusyAreas-Landuse/output/",
  fileNamePart: "landuseResidential",
})
