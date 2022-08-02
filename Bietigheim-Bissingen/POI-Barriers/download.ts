import { downloadPoiBarriers } from "../../utils/poiBarriers"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { rawOutputFolder } from "./filesFolders.const"

downloadPoiBarriers({ bboxBetrachtungsraum, outputFolder: rawOutputFolder })
