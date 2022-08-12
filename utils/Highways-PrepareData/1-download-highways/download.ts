import { overpassDownloadJson } from "../../overpassDownload"

// Alles TXT? Oder LUA? (wo es einfacher ist)
// SQL: Längeberechnungen
export const downloadHighways = ({ bboxBetrachtungsraum, outputFolder }) => {
  // Overpass BBox-Edges:
  //  south west north east
  //  south-west -- north-east
  //  https://dev.overpass-api.de/overpass-doc/en/full_data/bbox.html
  // Filter most of the tags that are filtered in 'filterGenerallyIrrelevantTags.ts'
  //  This is a performance optimization.
  //  Docs https://dev.overpass-api.de/overpass-doc/en/criteria/per_tag.html
  //  Docs https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#Key.2Fvalue_matches_regular_expression_.28.7E.22key_regex.22.7E.22value_regex.22.29
  // Convert adds 'length' property:
  //  Based on https://github.com/drolbr/Overpass-API/issues/237#issuecomment-927285088I
  //  This return a special json format, that requires the overpassCoposeToGeoJson.ts to convert to GeoJSON.
  const overpassQuery = `
[out:json][timeout:25];
(
  way
  [highway~"^(bridleway|cycleway|footway|living_street|motorway|motorway_link|path|pedestrian|primary|primary_link|residential|secondary|secondary_link|service|steps|tertiary|tertiary_link|track|trunk|trunk_link|unclassified)$"]
  [access!~"^(private|no|destination)$"]
  [service!~"^(driveway|parking_aisle)$"]
  (${bboxBetrachtungsraum.join(", ")});
);
convert result ::=::,::geom=geom(),::id=id(),"__type"=type(),"FMC:length"=length();
out geom;
`

  overpassDownloadJson({
    query: overpassQuery,
    outputFolder,
    fileName: "osmRawHighways",
  })
}
