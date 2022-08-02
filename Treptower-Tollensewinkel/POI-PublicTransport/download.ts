import { downloadPoiPublicTransport } from "../../utils/poiPublicTransport"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { rawOutputFolder } from "./filesFolders.const"

downloadPoiPublicTransport({
  bboxBetrachtungsraum,
  outputFolder: rawOutputFolder,
})
