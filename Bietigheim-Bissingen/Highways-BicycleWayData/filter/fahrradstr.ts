import { considerFeature } from "./considerFeature"

// Fahrradstraße (ggf. mit Zusatzzeichen)
// https://wiki.openstreetmap.org/wiki/DE:Key:bicycle%20road
export const fahrradstrasse = (feature) => {
  if (!considerFeature(feature)) return false

  return (
    feature.properties.bicycle_road === "yes" ||
    feature.properties.traffic_sign?.startsWith("DE:244")
  )
}
