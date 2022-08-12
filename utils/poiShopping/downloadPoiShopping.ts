import { overpassDownloadJson } from "../overpassDownload"
import { ignoreListeForDownload } from "./utils/ignoreListeForDownload"

// TXT für amenity + !private
// TXT für shop
// ignore List in LUA
// TODO: "out center;" in LUA oder SQL
// TODO TJO: nodes + ways testen
export const downloadPoiShopping = ({ bboxBetrachtungsraum, outputFolder }) => {
  const overpassQuery = `
[out:json][timeout:25];
(
  nw["amenity"]
  ${ignoreListeForDownload.map((entry) => `["amenity"!="${entry}"]`).join("\n")}
  ["access"!="private"](${bboxBetrachtungsraum.join(", ")});
  nw["shop"](${bboxBetrachtungsraum.join(", ")});
);
out center;
`

  overpassDownloadJson({
    query: overpassQuery,
    outputFolder,
    fileName: "poiShopping",
  })
}
