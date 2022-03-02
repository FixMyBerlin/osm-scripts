import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"

const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"]
  ["amenity"!="bench"]
  ["amenity"!="bicycle_parking"]
  ["amenity"!="parking"]
  ["amenity"!="telephone"]
  ["amenity"!="waste_basket"]
  ["amenity"!="parking_entrance"]
  ["amenity"!="shelter"]
  ["amenity"!="recycling"]
  ["amenity"!="hunting_stand"]
  ["amenity"!="post_box"]
  ["access"!="private"](${bboxBetrachtungsraum.join(", ")});
  node["shop"](${bboxBetrachtungsraum.join(", ")});
);
out center;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: "./ZESPlus/BusyAreas-ShopData/output/raw",
  fileName: "shops",
})
