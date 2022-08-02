import { transposePoiLanduse } from "../../utils/poiLanduse"
import { outputFolder, rawFile } from "./filesFolders.const"

transposePoiLanduse({ inputFile: rawFile, outputFolder })
