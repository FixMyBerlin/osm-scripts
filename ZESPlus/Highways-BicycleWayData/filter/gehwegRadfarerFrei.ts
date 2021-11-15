import { fussgaengerzonenWegFahrradFrei } from "./fussgaengerzonenWegFahrradFrei"
import { stufen } from "./stufen"

// Gehweg, Fahrrad frei
// traffic_sign=DE:239,1022-10, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:239
export const gehwegRadfarerFrei = (feature) => {
  if (stufen(feature)) return false
  if (fussgaengerzonenWegFahrradFrei(feature)) return false

  const includeGehwegMitFreigabe =
    ["footway", "path"].includes(feature.properties.highway) &&
    feature.properties.bicycle === "yes"

  const includeGehwegMitFreigabeTaggingMainWay =
    feature.properties["sidewalk:left:bicycle"] === "yes" ||
    feature.properties["sidewalk:right:bicycle"] === "yes" ||
    feature.properties["sidewalk:both:bicycle"] === "yes"

  // EdgeCase: Sometimes we use highway=cycleway where the traffic_sign is set when the road is split, so we exclude this here.
  const includeIfSignFits =
    feature.properties.traffic_sign === "DE:239,1022-10" &&
    feature.properties.highway !== "cycleway"

  return (
    includeGehwegMitFreigabe ||
    includeGehwegMitFreigabeTaggingMainWay ||
    includeIfSignFits
  )
}
