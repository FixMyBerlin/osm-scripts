import { transposePoiShopping } from "../../utils/poiShopping"
import { outputFolder, rawFile } from "./filesFolders.const"

transposePoiShopping({ inputFile: rawFile, outputFolder })
