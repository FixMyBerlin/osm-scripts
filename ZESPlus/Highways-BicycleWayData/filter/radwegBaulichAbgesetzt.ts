import { irrelevanteWege } from "./irrelevanteWege"

// Baulich abgesetzter Radweg
// https://wiki.openstreetmap.org/wiki/DE:Tag:cycleway%3Dtrack
// https://wiki.openstreetmap.org/wiki/DE:Tag:cycleway%3Dopposite_track
export const radwegBaulichAbgesetzt = (feature) => {
  if (irrelevanteWege(feature)) return false

  // Eg https://www.openstreetmap.org/way/278057274
  const RadwegNebenStrasse =
    feature.properties.highway === "cycleway" &&
    feature.properties.is_sidepath === "yes"

  // Eg https://www.openstreetmap.org/way/964476026
  const RadwegNebenStrasseVerkehrszeichen =
    feature.properties.traffic_signal === "DE:237" &&
    feature.properties.is_sidepath === "yes"

  const RadwegErfassungSeparat =
    feature.properties.cycleway === "track" ||
    feature.properties.cycleway === "opposite_track"

  const RadwegErfassungAnStrasse =
    feature.properties["cycleway:right"] === "track" ||
    feature.properties["cycleway:left"] === "track" ||
    feature.properties["cycleway:both"] === "track"

  return (
    RadwegNebenStrasse ||
    RadwegNebenStrasseVerkehrszeichen ||
    RadwegErfassungSeparat ||
    RadwegErfassungAnStrasse
  )
}
