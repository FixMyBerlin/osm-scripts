import { downloadPoiLanduse } from "../../utils/poiLanduse"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { rawOutputFolder } from "./filesFolders.const"

downloadPoiLanduse({ bboxBetrachtungsraum, outputFolder: rawOutputFolder })
