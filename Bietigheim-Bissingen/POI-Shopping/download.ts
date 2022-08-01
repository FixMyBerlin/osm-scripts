import { ignoreListeForDownload } from "../../utils"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { fileName, rawOutputFolder } from "./filesFolders.const"

const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"]
  ${ignoreListeForDownload.map((entry) => `["amenity"!="${entry}"]`).join("\n")}
  ["access"!="private"](${bboxBetrachtungsraum.join(", ")});
  node["shop"](${bboxBetrachtungsraum.join(", ")});
);
out center;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: rawOutputFolder,
  fileName: fileName,
})
