import { transposePoiEducation } from "../../utils/poiEducation/transposePoiEducation"
import { outputFolder, rawFile } from "./filesFolders.const"

transposePoiEducation({ inputFile: rawFile, outputFolder })
