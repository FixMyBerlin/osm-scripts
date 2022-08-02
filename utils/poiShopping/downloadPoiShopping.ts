import { overpassDownloadJson } from "../overpassDownload"
import { ignoreListeForDownload } from "./utils/ignoreListeForDownload"

export const downloadPoiShopping = ({ bboxBetrachtungsraum, outputFolder }) => {
  const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"]
  ${ignoreListeForDownload.map((entry) => `["amenity"!="${entry}"]`).join("\n")}
  ["access"!="private"](${bboxBetrachtungsraum.join(", ")});
  node["shop"](${bboxBetrachtungsraum.join(", ")});
);
out center;
`

  overpassDownloadJson({
    query: overpassQuery,
    outputFolder,
    fileName: "poiShopping",
  })
}
