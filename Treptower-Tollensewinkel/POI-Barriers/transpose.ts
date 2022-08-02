import { transposePoiBarriers } from "../../utils/poiBarriers/transposePoiBarriers"
import { outputFolder, rawFile } from "./filesFolders.const"

transposePoiBarriers({ inputFile: rawFile, outputFolder })
