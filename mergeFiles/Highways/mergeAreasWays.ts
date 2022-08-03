import { writeGeoJson } from "../../utils/write"
import { mergeFiles, wrapAsFeatureCollection } from "../../utils/mergeFiles"
import { outputFolder as bbFolder } from "../../Bietigheim-Bissingen/Highways/filesFolders.const"
import { outputFolder as ttFolder } from "../../Treptower-Tollensewinkel/Highways/filesFolders.const"
import { outputFolder as zesFolder } from "../../ZESplus/Highways/filesFolders.const"
import { outputFolder } from "./filesFolders.const"

const allFilesToMerge = [
  `${zesFolder}/allHighways.geojson`,
  `${bbFolder}/allHighways.geojson`,
  `${ttFolder}/allHighways.geojson`,
]

const mergedData = mergeFiles(allFilesToMerge)

writeGeoJson({
  geoJsonData: wrapAsFeatureCollection(mergedData),
  folder: outputFolder,
  fileNamePart: "allHighways",
})
