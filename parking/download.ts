import { overpassDownloadJson } from "../ZESPlus/utils/overpassDownloadJson"
import { outputFolder } from "./files.const"

// Script from https://github.com/SupaplexOSM/strassenraumkarte-neukoelln/tree/main/scripts/parking_lanes#how-to-use
// Area Xhain
const overpassQuery = `
[out:json];
(
  area["boundary"="administrative"]["admin_level"="9"]["name"="Friedrichshain-Kreuzberg"];
)->.searchArea;
(
  // streets
  way["highway"="primary"](area.searchArea);
  way["highway"="primary_link"](area.searchArea);
  way["highway"="secondary"](area.searchArea);
  way["highway"="secondary_link"](area.searchArea);
  way["highway"="tertiary"](area.searchArea);
  way["highway"="tertiary_link"](area.searchArea);
  way["highway"="residential"](area.searchArea);
  way["highway"="unclassified"](area.searchArea);
  way["highway"="living_street"](area.searchArea);
  way["highway"="pedestrian"](area.searchArea);
  way["highway"="road"](area.searchArea);
  way["highway"="service"](area.searchArea);
  way["highway"="track"](area.searchArea);
  way["highway"="bus_guideway"](area.searchArea);

  // streets under construction
  way["highway"="construction"]["construction"="primary"](area.searchArea);
  way["highway"="construction"]["construction"="primary_link"](area.searchArea);
  way["highway"="construction"]["construction"="secondary"](area.searchArea);
  way["highway"="construction"]["construction"="secondary_link"](area.searchArea);
  way["highway"="construction"]["construction"="tertiary"](area.searchArea);
  way["highway"="construction"]["construction"="tertiary_link"](area.searchArea);
  way["highway"="construction"]["construction"="residential"](area.searchArea);
  way["highway"="construction"]["construction"="unclassified"](area.searchArea);
  way["highway"="construction"]["construction"="living_street"](area.searchArea);
  way["highway"="construction"]["construction"="pedestrian"](area.searchArea);
  way["highway"="construction"]["construction"="road"](area.searchArea);
  way["highway"="construction"]["construction"="service"](area.searchArea);
  way["highway"="construction"]["construction"="track"](area.searchArea);
  way["highway"="construction"]["construction"="bus_guideway"](area.searchArea);

  // (foot)ways and path that can be used by motor vehicles
  way["highway"="footway"]["motor_vehicle"]["motor_vehicle"!="no"](area.searchArea);
  way["highway"="cycleway"]["motor_vehicle"]["motor_vehicle"!="no"](area.searchArea);
  way["highway"="path"]["motor_vehicle"]["motor_vehicle"!="no"](area.searchArea);
  way["highway"="footway"]["vehicle"]["vehicle"!="no"]["motor_vehicle"!="no"](area.searchArea);
  way["highway"="cycleway"]["vehicle"]["vehicle"!="no"]["motor_vehicle"!="no"](area.searchArea);
  way["highway"="path"]["vehicle"]["vehicle"!="no"]["motor_vehicle"!="no"](area.searchArea);

  // crossings and traffic signals
  node["highway"="traffic_signals"](area.searchArea);
  node["highway"="crossing"](area.searchArea);
  node["highway"="stop"](area.searchArea);
  node["highway"="give_way"](area.searchArea);
);
convert result ::=::,::geom=geom(),::id=id(),"__type"=type(),"FMC:length"=length();
out geom;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: outputFolder,
  fileName: "osmRawHighways",
})
