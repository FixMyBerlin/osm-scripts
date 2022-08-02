import { overpassJsonToGeoJson } from "../overpassToGeoJson"
import { cleanupPropsFromPoiPoints } from "../propsHelper"

export const transposePoiPublicTransport = ({ inputFile, outputFolder }) => {
  overpassJsonToGeoJson({
    readFile: inputFile,
    outputFolder,
    fileNamePart: "poiPublicTransport",
    addPropertiesCallback: cleanupPropsFromPoiPoints,
  })
}
