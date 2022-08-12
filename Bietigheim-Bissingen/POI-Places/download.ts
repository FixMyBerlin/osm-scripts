import { overpassDownloadJson } from "../../utils/overpassDownload"
import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { fileName, rawOutputFolder } from "./filesFolders.const"

// TODO: Präzisieren
// TXT: Die drei Typen
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
