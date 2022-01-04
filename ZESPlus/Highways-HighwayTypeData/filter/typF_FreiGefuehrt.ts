import { irrelevanteWege } from "./irrelevanteWege"

// TYP F – Frei geführt / Fußgängerweg [Außerorts]
export const typFreiGefuehrt = (feature) => {
  if (irrelevanteWege(feature)) return false

  const includePathTrack = ["path", "track", "bridleway"].includes(
    feature.properties.highway
  )

  // Fußweg mit Fahrrad frei
  const includeGehwegMitRadwegFrei =
    feature.properties.traffic_sign === "DE:239,1022-10"

  const includeDurchfahrtswege =
    feature.properties.highway === "service" &&
    ["drive-through", "alley"].includes(feature.properties.service) &&
    feature.properties.tunnel !== "building_passage"

  const includeRadwege =
    feature.properties.highway === "cycleway" &&
    parseFloat(feature.properties["FMC:length"]) > 20.0

  // Haben Charakter einer Zufahrtsstraße zu Gebäuden; Ähnlich Wohnstraße. Vermutlich als "unclassified" falsch getaggt
  const includeZwischenwege =
    feature.properties.highway == "pedestrian" ||
    (feature.properties.highway == "unclassified" &&
      feature.properties.surface === "unpaved") ||
    (feature.properties.highway == "footway" &&
      (feature.properties.is_sidepath !== "yes" ||
        feature.properties.footway !== "crossing"))

  return (
    includePathTrack ||
    includeGehwegMitRadwegFrei ||
    includeDurchfahrtswege ||
    includeRadwege ||
    includeZwischenwege
  )
}
