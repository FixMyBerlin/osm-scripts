import { overpassDownloadJson } from "../overpassDownload"

export const downloadPoiPublicTransport = ({
  bboxBetrachtungsraum,
  outputFolder,
}) => {
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
    outputFolder,
    fileName: "poiPublicTransport",
  })
}
