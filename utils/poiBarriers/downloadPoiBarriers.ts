import { overpassDownloadJson } from "../overpassDownload"

// TXT für Filter
// SQL für Flächenberechnung, dann all kleinen Seen und Teiche rauswerfen
export const downloadPoiBarriers = ({ bboxBetrachtungsraum, outputFolder }) => {
  // The `natural=water` case is something special.
  // We want the geometry of water bodies which represent the barrier of water better than the waterway-line.
  // However, that would include all kind of small water bodies in fields and residential areas.
  // Overpass does not allow to filter by area size; as a workaround, we filter by length.
  // That is a bit wonky, since small ponds with detailed borderes are included but large river bodies with straight lines are excluded.
  // However, the result is good enough for our purposes.
  const overpassQuery = `
[out:json][timeout:25];
(
  way["railway"="rail"]["usage"="main"](${bboxBetrachtungsraum.join(", ")});
  way["railway"="rail"]["usage"="branch"](${bboxBetrachtungsraum.join(", ")});
  way["waterway"="river"](${bboxBetrachtungsraum.join(", ")});
  way["waterway"="canal"](${bboxBetrachtungsraum.join(", ")});
  wr["natural"="water"]
    (if: length() > 1000)(${bboxBetrachtungsraum.join(", ")});
  wr["highway"="motorway"](${bboxBetrachtungsraum.join(", ")});
  wr["highway"="motorway_link"](${bboxBetrachtungsraum.join(", ")});
  wr["highway"="primary"](${bboxBetrachtungsraum.join(", ")});
  wr["highway"="primary_link"](${bboxBetrachtungsraum.join(", ")});
  wr["highway"="trunk"](${bboxBetrachtungsraum.join(", ")});
  wr["highway"="trunk_link"](${bboxBetrachtungsraum.join(", ")});
  wr["aeroway"="aerodrome"](${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

  overpassDownloadJson({
    query: overpassQuery,
    outputFolder,
    fileName: "poiBarriers",
  })
}
