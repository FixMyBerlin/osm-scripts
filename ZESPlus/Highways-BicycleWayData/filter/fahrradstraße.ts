// Fahrradstraße (ggf. mit Zusatzzeichen)
// https://wiki.openstreetmap.org/wiki/DE:Key:bicycle%20road
export const fahrradstraße = (feature) => {
  return (
    feature.properties.bicycle_road === "yes" ||
    feature.properties.traffic_sign?.startsWith("DE:244")
  )
}
