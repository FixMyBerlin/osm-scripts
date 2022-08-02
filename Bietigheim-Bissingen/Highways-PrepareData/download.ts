import { downloadHighways } from "../../utils/Highways-PrepareData"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"

downloadHighways({ bboxBetrachtungsraum, outputFolder: __dirname })
