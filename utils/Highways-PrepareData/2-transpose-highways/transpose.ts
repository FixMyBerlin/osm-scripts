import { AreasForIntersection } from "../../overpassToGeoJson"
import { overpassComposeToGeoJson } from "../../overpassToGeoJson/overpassComposeToGeoJson"
import { cleanupNonNeededTags } from "./utils/cleanupNonNeededTags"

type Props = {
  inputFile: string
  outputFolder: string
} & AreasForIntersection

export const transposeHighways = ({
  inputFile,
  outputFolder,
  areasForIntersection,
}: Props) => {
  overpassComposeToGeoJson({
    readFile: inputFile,
    outputFolder,
    fileNamePart: "osmHighwaysUnclipped",
    filterCallback: cleanupNonNeededTags,
    areasForIntersection,
  })
}
