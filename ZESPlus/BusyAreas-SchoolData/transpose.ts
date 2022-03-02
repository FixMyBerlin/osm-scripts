import { overpassJsonToGeoJson } from "../utils/overpassToGeoJson/overpassJsonToGeoJson"

overpassJsonToGeoJson({
  readFile: "./ZESPlus/BusyAreas-SchoolData/output/raw/schools.json",
  outputFolder: "./ZESPlus/BusyAreas-SchoolData/output/",
  fileNamePart: "schools",
})
