import { downloadPoiShopping } from "../../utils/poiShopping"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { rawOutputFolder } from "./filesFolders.const"

downloadPoiShopping({ bboxBetrachtungsraum, outputFolder: rawOutputFolder })
