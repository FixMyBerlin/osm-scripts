import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { fileName, rawOutputFolder } from "./filesFolders.const"

// `ferry=yes` is included.
// "Berliner Parkeisenbahn" is a small train in a park that we cannot properly exclude by other means.
const overpassQuery = `
[out:json][timeout:25];
(
  node
  ["public_transport"="station"]
  ["operator"!= "Berliner Parkeisenbahn"]
  ["disused"!="yes"]
  (${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: rawOutputFolder,
  fileName: fileName,
})
