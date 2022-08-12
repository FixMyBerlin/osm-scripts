import { transposeHighways } from "../../utils/Highways-PrepareData"
import { areas } from "../AreaOfInterest/areas.constant"

// LATER: `areasForIntersection` können wir erstmal weglassen. Es wäre sonst SQL, nämlich anreicherung der highway mit der info, dass das segment in bestimmter administrative boundary ist.
transposeHighways({
  inputFile: `${__dirname}/osmRawHighways.json`,
  outputFolder: __dirname,
  areasForIntersection: Object.fromEntries(
    Object.keys(areas).map((k) => [
      k,
      `./ZESPlus/AreaOfInterest/output/${k}.geojson`,
    ])
  ),
})
