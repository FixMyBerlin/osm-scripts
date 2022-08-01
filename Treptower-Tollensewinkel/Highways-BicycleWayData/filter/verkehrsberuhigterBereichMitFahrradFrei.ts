import { considerFeature } from "./considerFeature"

// Verkehrsberuhigter Bereich, umgangssprachlich auch „Spielstraße“
// https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dliving_street
export const verkehrsberuhigterBereichMitFahrradFrei = (feature) => {
  if (!considerFeature(feature)) return false

  return (
    feature.properties.highway === "living_street" &&
    feature.properties.bicycle !== "no"
  )
}
