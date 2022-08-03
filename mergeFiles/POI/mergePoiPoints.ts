import { mergeFiles, wrapAsFeatureCollection } from "../../utils/mergeFiles"
import { writeGeoJson } from "../../utils/write"
import { outputFolder as bbFolder } from "../../Bietigheim-Bissingen/POI-MergeFiles/filesFolders.const"
import { outputFolder as ttFolder } from "../../Treptower-Tollensewinkel/POI-MergeFiles/filesFolders.const"
import { outputFolder as zesFolder } from "../../ZESplus/POI-MergeFiles/filesFolders.const"
import { outputFolder } from "./filesFolders.const"

const allFilesToMerge = [
  `${zesFolder}/mergedPoiPoints.geojson`,
  `${bbFolder}/mergedPoiPoints.geojson`,
  `${ttFolder}/mergedPoiPoints.geojson`,
]

const mergedData = mergeFiles(allFilesToMerge)

writeGeoJson({
  geoJsonData: wrapAsFeatureCollection(mergedData),
  folder: outputFolder,
  fileNamePart: "mergedPoiPoints",
})
