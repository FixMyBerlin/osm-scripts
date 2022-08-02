import { transposeHighways } from "../../utils/Highways-PrepareData"
import { areas } from "../AreaOfInterest/areas.constant"

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
