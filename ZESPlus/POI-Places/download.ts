import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { fileName, rawOutputFolder } from "./filesFolders.const"

const overpassQuery = `
[out:json][timeout:25];
(
  node
  ["place"="village"]["name"="Zeuthen"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"="village"]["name"="Eichwalde"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"="village"]["name"="Schulzendorf"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"="town"]["name"="Königs Wusterhausen"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"="suburb"]["name"="Schönefeld"]
  (${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: rawOutputFolder,
  fileName: fileName,
})
