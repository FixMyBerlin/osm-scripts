import { overpassComposeToGeoJson } from "../../overpassToGeoJson/overpassComposeToGeoJson"
import { cleanupNonNeededTags } from "./utils/cleanupNonNeededTags"
import { enhanceDataWitAreaInformation } from "./utils/enhanceDataWitAreaInformation"

export const transposeHighways = ({
  inputFile,
  outputFolder,
  areasForIntersection = {},
}) => {
  overpassComposeToGeoJson({
    readFile: inputFile,
    outputFolder,
    fileNamePart: "osmHighwaysUnclipped",
    filterCallback: cleanupNonNeededTags,
    areasForIntersection,
  })
}
