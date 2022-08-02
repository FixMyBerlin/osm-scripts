import { transposeHighways } from "../../utils/Highways-PrepareData"

transposeHighways({
  inputFile: `${__dirname}/osmRawHighways.json`,
  outputFolder: __dirname,
})
