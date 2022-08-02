import { overpassJsonToGeoJson } from "../overpassToGeoJson/overpassJsonToGeoJson"
import { cleanupPropsFromPoiPoints } from "../propsHelper"

export const transposePoiBarriers = ({ inputFile, outputFolder }) => {
  overpassJsonToGeoJson({
    readFile: inputFile,
    outputFolder,
    fileNamePart: "poiBarriers",
    addPropertiesCallback: cleanupPropsFromPoiPoints,
  })
}
