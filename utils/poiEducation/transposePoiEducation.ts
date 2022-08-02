import { cleanupPropsFromPoiPoints } from "../propsHelper"
import { overpassJsonToGeoJson } from "../overpassToGeoJson"

export const transposePoiEducation = ({ inputFile, outputFolder }) => {
  overpassJsonToGeoJson({
    readFile: inputFile,
    outputFolder,
    fileNamePart: "poiEducation",
    addPropertiesCallback: cleanupPropsFromPoiPoints,
  })
}
