import { downloadPoiEducation } from "../../utils/poiEducation"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { rawOutputFolder } from "./filesFolders.const"

downloadPoiEducation({ bboxBetrachtungsraum, outputFolder: rawOutputFolder })
