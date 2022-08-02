import { transposePoiPublicTransport } from "../../utils/poiPublicTransport"
import { outputFolder, rawFile } from "./filesFolders.const"

transposePoiPublicTransport({ inputFile: rawFile, outputFolder })
