import { irrelevanteWege } from "./irrelevanteWege"
import { radwegVerbindungsstueck } from "./radwegVerbindungsstueck"

// Dedicated and signed bicycle ways
// - that are not parallel to a road
// - that are not connection pieces of a road
// Eg. https://www.openstreetmap.org/way/27701956
export const radwegFreiGefuehrt = (feature) => {
  if (irrelevanteWege(feature)) return false
  if (radwegVerbindungsstueck(feature)) return false

  return (
    feature.properties.highway === "cycleway" &&
    feature.properties.traffic_sign === "DE:237" &&
    !feature.properties.is_sidepath
  )
}
