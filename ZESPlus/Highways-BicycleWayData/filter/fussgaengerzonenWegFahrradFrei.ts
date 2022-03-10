import { considerFeature } from "./considerFeature"

// Straßen in Fußgängerzonen und sonstige Wege oder Plätze für Fußgänger
// https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dpedestrian
// HINWEIS: bicycle=dismout wird wird also nicht gezählt.
export const fussgaengerzonenWegFahrradFrei = (feature) => {
  if (!considerFeature(feature)) return false

  return (
    feature.properties.highway === "pedestrian" &&
    feature.properties.bicycle === "yes"
  )
}
