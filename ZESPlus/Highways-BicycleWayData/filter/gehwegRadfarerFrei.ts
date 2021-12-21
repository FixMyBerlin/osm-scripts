import { fussgaengerzonenWegFahrradFrei } from "./fussgaengerzonenWegFahrradFrei"
import { irrelevanteWege } from "./irrelevanteWege"
import { stufen } from "./stufen"

// Gehweg, Fahrrad frei
// traffic_sign=DE:239,1022-10, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:239
export const gehwegRadfarerFrei = (feature) => {
  if (irrelevanteWege(feature)) return false
  if (stufen(feature)) return false
  if (fussgaengerzonenWegFahrradFrei(feature)) return false

  const includeGehwegMitFreigabe =
    ["footway", "path"].includes(feature.properties.highway) &&
    feature.properties.bicycle === "yes"

  const includeGehwegMitFreigabeTaggingMainWay =
    feature.properties["sidewalk:left:bicycle"] === "yes" ||
    feature.properties["sidewalk:right:bicycle"] === "yes" ||
    feature.properties["sidewalk:both:bicycle"] === "yes"

  const includeIfSignFitsWithoutEdgeCase =
    feature.properties.traffic_sign === "DE:239,1022-10" &&
    // EdgeCase: Sometimes we use highway=cycleway where the traffic_sign is set when the road is split, so we explicitly exclude this here.
    feature.properties.highway !== "cycleway"

  return (
    includeGehwegMitFreigabe ||
    includeGehwegMitFreigabeTaggingMainWay ||
    includeIfSignFitsWithoutEdgeCase
  )
}
