import { bboxBetrachtungsraum } from "../AreaOfInterest/areas.constant"
import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { fileName, rawOutputFolder } from "./filesFolders.const"

const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"]
  ["amenity"!="adult_gaming_centre"]
  ["amenity"!="animal_shelter"]
  ["amenity"!="atm"]
  ["amenity"!="baby_hatch"]
  ["amenity"!="bench"]
  ["amenity"!="bicycle_parking"]
  ["amenity"!="bicycle_repair_station"]
  ["amenity"!="brothel"]
  ["amenity"!="bus_station"]
  ["amenity"!="car_sharing"]
  ["amenity"!="charging_station"]
  ["amenity"!="clock"]
  ["amenity"!="compressed_air"]
  ["amenity"!="coworking_space"]
  ["amenity"!="drinking_water"]
  ["amenity"!="ferry_terminal"]
  ["amenity"!="fire_station"]
  ["amenity"!="first_aid"]
  ["amenity"!="fountain"]
  ["amenity"!="funeral_hall"]
  ["amenity"!="give_box"]
  ["amenity"!="grave_yard"]
  ["amenity"!="grit_bin"]
  ["amenity"!="hookah_lounge"]
  ["amenity"!="hunting_stand"]
  ["amenity"!="kitchen"]
  ["amenity"!="lamp"]
  ["amenity"!="letter_box"]
  ["amenity"!="luggage_locker"]
  ["amenity"!="mobile_library"]
  ["amenity"!="motorcycle_parking"]
  ["amenity"!="nursing_home"]
  ["amenity"!="parcel_locker"]
  ["amenity"!="parking_entrance"]
  ["amenity"!="parking_space"]
  ["amenity"!="parking"]
  ["amenity"!="photo_booth"]
  ["amenity"!="planetarium"]
  ["amenity"!="police"]
  ["amenity"!="post_box"]
  ["amenity"!="public_bookcase"]
  ["amenity"!="pushchair_parking"]
  ["amenity"!="recycling"]
  ["amenity"!="sanitary_dump_station"]
  ["amenity"!="shelter"]
  ["amenity"!="shower"]
  ["amenity"!="smoking_area"]
  ["amenity"!="stripclub"]
  ["amenity"!="studio"]
  ["amenity"!="swingerclub"]
  ["amenity"!="table"]
  ["amenity"!="taxi"]
  ["amenity"!="telephone"]
  ["amenity"!="ticket_validator"]
  ["amenity"!="toilets"]
  ["amenity"!="trolley_bay"]
  ["amenity"!="vacuum_cleaner"]
  ["amenity"!="vending_any"]
  ["amenity"!="vending_cigarette"]
  ["amenity"!="vending_machine"]
  ["amenity"!="washing_machine"]
  ["amenity"!="waste_basket"]
  ["amenity"!="waste_disposal"]
  ["amenity"!="water_point"]
  ["amenity"!="workshop"]
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
