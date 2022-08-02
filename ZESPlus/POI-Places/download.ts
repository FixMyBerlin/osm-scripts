import { overpassDownloadJson } from "../../utils/overpassDownload"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { fileName, rawOutputFolder } from "./filesFolders.const"

const overpassQuery = `
[out:json][timeout:25];
(
  node
  ["place"]["name"="Zeuthen"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"]["name"="Eichwalde"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"]["name"="Schulzendorf"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"]["name"="Königs Wusterhausen"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"]["name"="Schönefeld"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"]["name"="Wildau"]
  (${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: rawOutputFolder,
  fileName: fileName,
})
