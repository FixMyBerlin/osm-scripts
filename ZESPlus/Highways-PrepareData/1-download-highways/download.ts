import { overpassDownloadJson } from "../../utils/overpassDownloadJson"

// Overpass BBox-Edges:
//  south west north east
//  south-west -- north-east
//  https://dev.overpass-api.de/overpass-doc/en/full_data/bbox.html
// Cut to BBox
//  This prevents large relations to blow up the data
//  It will likely cause false data for the length of way at the edges of the BBox. Which is OK.
//  Docs https://dev.overpass-api.de/overpass-doc/en/criteria/union.html
// Filter most of the tags that are filtered in 'filterGenerallyIrrelevantTags.ts'
//  This is a performance optimization.
//  Docs https://dev.overpass-api.de/overpass-doc/en/criteria/per_tag.html
//  Docs https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#Key.2Fvalue_matches_regular_expression_.28.7E.22key_regex.22.7E.22value_regex.22.29
const overpassQuery = `
[out:json][timeout:25];
(
  way
  [highway~"^(bridleway|cycleway|footway|living_street|motorway|motorway_link|path|pedestrian|primary|primary_link|residential|secondary|secondary_link|service|steps|tertiary|tertiary_link|track|trunk|trunk_link|unclassified)$"]
  [access!~"^(private|no|destination)$"]
  [service!~"^(driveway|parking_aisle)$"]
  (52.2587,13.4529,52.4646,13.7730)
  ;
);
out geom(52.2587,13.4529,52.4646,13.7730);
make stat total_length=sum(length()),way_id_length=set(type() + "/" + id() + ":" + length());
out;
`

overpassDownloadJson({
  query: overpassQuery,
  outputFolder: "./ZESPlus/Highways-PrepareData/1-download-highways/",
  fileName: "osmRawHighways",
})
