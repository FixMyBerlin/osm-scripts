import { overpassJsonToGeoJson } from "../overpassToGeoJson"
import { cleanupPropsFromPoiPoints } from "../propsHelper"

export const transposePoiLanduse = ({ inputFile, outputFolder }) => {
  overpassJsonToGeoJson({
    readFile: inputFile,
    outputFolder: outputFolder,
    fileNamePart: "poiLanduse",
    addPropertiesCallback: cleanupPropsFromPoiPoints,
  })
}
