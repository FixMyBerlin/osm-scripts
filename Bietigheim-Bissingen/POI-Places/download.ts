import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { fileName, rawOutputFolder } from "./filesFolders.const"

// TODO: Präzisieren
const overpassQuery = `
[out:json][timeout:25];
(
  node
  ["place"="village"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"="town"]
  (${bboxBetrachtungsraum.join(", ")});
  node
  ["place"="suburb"]
  (${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: rawOutputFolder,
  fileName: fileName,
})
