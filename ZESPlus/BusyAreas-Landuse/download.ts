import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"

const overpassQuery = `
[out:json][timeout:25];
(
  nwr["landuse"="residential"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="brownfield"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="construction"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="farmyard"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="retail"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="industrial"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="commercial"](${bboxBetrachtungsraum.join(", ")});
  nwr["landuse"="garages"](${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: "./ZESPlus/BusyAreas-Landuse/output/raw",
  fileName: "shops",
})
