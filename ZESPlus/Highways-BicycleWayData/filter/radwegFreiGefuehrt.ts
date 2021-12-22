import { irrelevanteWege } from "./irrelevanteWege"
import { radwegVerbindungsstueck } from "./radwegVerbindungsstueck"

// Dedicated and signed bicycle ways
// - that are not parallel to a road
// - that are not connection pieces of a road
// Eg. https://www.openstreetmap.org/way/27701956
export const radwegFreiGefuehrt = (feature) => {
  if (irrelevanteWege(feature)) return false
  if (radwegVerbindungsstueck(feature)) return false

  // https://osmtools.de/traffic_signs/?signs=237
  const propperCycleway =
    feature.properties.highway === "cycleway" &&
    feature.properties.traffic_sign === "DE:237" &&
    !feature.properties.is_sidepath

  // We could add this as the reverse to the mtb:scale-gruard in gehwegRadfarerFrei().
  // However, the example way https://www.openstreetmap.org/way/23366687 can just as well be excluded completely.
  // const wegMitRadfreigabeDerKeinGehwegIstDaMTB =
  //   ["footway", "path"].includes(feature.properties.highway) &&
  //   feature.properties.bicycle === "yes" &&
  //   feature.properties["mtb:scale"]

  return propperCycleway
}
