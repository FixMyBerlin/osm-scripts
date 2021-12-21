import { gehUndRadwegGemeinsam } from "./gehUndRadwegGemeinsam"
import { gehUndRadwegGetrennt } from "./gehUndRadwegGetrennt"
import { irrelevanteWege } from "./irrelevanteWege"

// Baulich abgesetzter Radweg
// https://wiki.openstreetmap.org/wiki/DE:Tag:cycleway%3Dtrack
// https://wiki.openstreetmap.org/wiki/DE:Tag:cycleway%3Dopposite_track
export const radwegBaulichAbgesetzt = (feature) => {
  if (irrelevanteWege(feature)) return false
  // Wenn "Getrennter Rad- und Gehweg" oder "Gemeinsamer Geh- und Radweg", dann gewinnt das Verkehrszeichen
  if (gehUndRadwegGemeinsam(feature)) return false
  if (gehUndRadwegGetrennt(feature)) return false

  // Eg https://www.openstreetmap.org/way/278057274
  const RadwegNebenStrasse =
    feature.properties.highway === "cycleway" &&
    feature.properties.is_sidepath === "yes"

  // Eg https://www.openstreetmap.org/way/963592923
  // This is the same case as the is_sidepath=yes above, but on crossings we don't set that.
  const StraßenuebergangWennRadwegGetrennt =
    feature.properties.highway === "cycleway" &&
    feature.properties.cycleway === "crossing"

  // Eg https://www.openstreetmap.org/way/964476026
  // "DE:237"="Radweg" https://wiki.openstreetmap.org/wiki/DE:Tag:traffic%20sign=DE:237
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
    StraßenuebergangWennRadwegGetrennt ||
    RadwegNebenStrasseVerkehrszeichen ||
    RadwegErfassungSeparat ||
    RadwegErfassungAnStrasse
  )
}
