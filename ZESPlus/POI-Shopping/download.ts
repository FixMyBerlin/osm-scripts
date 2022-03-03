import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { fileName, rawOutputFolder } from "./filesFolders.const"

const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"]
  ["amenity"!="atm"]
  ["amenity"!="baby_hatch"]
  ["amenity"!="bench"]
  ["amenity"!="bicycle_parking"]
  ["amenity"!="bicycle_repair_station"]
  ["amenity"!="brothel"]
  ["amenity"!="bus_station"]
  ["amenity"!="charging_station"]
  ["amenity"!="clock"]
  ["amenity"!="drinking_water"]
  ["amenity"!="ferry_terminal"]
  ["amenity"!="fire_station"]
  ["amenity"!="fountain"]
  ["amenity"!="grit_bin"]
  ["amenity"!="hunting_stand"]
  ["amenity"!="lamp"]
  ["amenity"!="letter_box"]
  ["amenity"!="mobile_library"]
  ["amenity"!="parcel_locker"]
  ["amenity"!="parking_entrance"]
  ["amenity"!="parking_space"]
  ["amenity"!="parking"]
  ["amenity"!="photo_booth"]
  ["amenity"!="police"]
  ["amenity"!="post_box"]
  ["amenity"!="public_bookcase"]
  ["amenity"!="recycling"]
  ["amenity"!="shelter"]
  ["amenity"!="shower"]
  ["amenity"!="smoking_area"]
  ["amenity"!="studio"]
  ["amenity"!="swingerclub"]
  ["amenity"!="table"]
  ["amenity"!="taxi"]
  ["amenity"!="telephone"]
  ["amenity"!="ticket_validator"]
  ["amenity"!="toilets"]
  ["amenity"!="trolley_bay"]
  ["amenity"!="waste_basket"]
  ["amenity"!="waste_disposal"]
  ["amenity"!="water_point"]
  ["access"!="private"](${bboxBetrachtungsraum.join(", ")});
  node["shop"](${bboxBetrachtungsraum.join(", ")});
);
out center;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: rawOutputFolder,
  fileName: fileName,
})
