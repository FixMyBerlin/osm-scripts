import { overpassDownloadJson } from "../overpassDownload"

export const downloadPoiEducation = ({
  bboxBetrachtungsraum,
  outputFolder,
}) => {
  const overpassQuery = `
[out:json][timeout:25];
(
  nwr["amenity"="childcare"](${bboxBetrachtungsraum.join(", ")});
  nwr["amenity"="college"](${bboxBetrachtungsraum.join(", ")});
  nwr["amenity"="kindergarten"](${bboxBetrachtungsraum.join(", ")});
  nwr["amenity"="research_institute"](${bboxBetrachtungsraum.join(", ")});
  nwr["amenity"="school"](${bboxBetrachtungsraum.join(", ")});
  nwr["amenity"="university"](${bboxBetrachtungsraum.join(", ")});
);
out center;
`

  overpassDownloadJson({
    query: overpassQuery,
    outputFolder,
    fileName: "poiEducation",
  })
}
