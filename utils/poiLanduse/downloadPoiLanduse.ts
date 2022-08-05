import { overpassDownloadJson } from "../overpassDownload"

export const downloadPoiLanduse = ({ bboxBetrachtungsraum, outputFolder }) => {
  // For some areas, the land usage is only described with area+amenity.
  // For those, I only look at ways so I don't have to handle single nodes here.
  const overpassQuery = `
[out:json];
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
  way["amenity"="university"](${bboxBetrachtungsraum.join(", ")});
  way["amenity"="school"](${bboxBetrachtungsraum.join(", ")});
  way["amenity"="college"](${bboxBetrachtungsraum.join(", ")});
);
out body;>;out skel qt;
`

  overpassDownloadJson({
    query: overpassQuery,
    outputFolder,
    fileName: "poiLanduse",
  })
}
