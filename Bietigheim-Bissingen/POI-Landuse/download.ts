import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { fileName, rawOutputFolder } from "./filesFolders.const"

const overpassQuery = `
[out:json][timeout:25];
(
  nwr["landuse"="allotments"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="brownfield"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="cemetery"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="civic"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="commercial"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="construction"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="farmyard"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="garages"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="industrial"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="religious"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="residential"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="retail"](${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: rawOutputFolder,
  fileName: fileName,
})
