import { overpassJsonToGeoJson } from "../../utils/overpassJsonToGeoJson"

overpassJsonToGeoJson({
  readFile:
    "./ZESPlus/Highways-PrepareData/1-download-highways/osmRawHighways.json",
  outputFolder: "./ZESPlus/Highways-PrepareData/2-transpose-highways/",
  fileNamePart: "osmHighwaysUnclipped",
})
