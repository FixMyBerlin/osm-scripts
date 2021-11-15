// Ein paar Wege-Typen können wir aktiv ausschließen.
// highway=service gehört erstmal nicht dazu, da möglicherweise Daten fehlen und der Weg doch geeignet ist.
// Allerdings werde kurze highway=service-Stücke ohne weitere service-Kategorie ausgeschlossen. Das sind meist Einfahrten, die nicht als solche getaggt sind.
export const irrelevanteWege = (feature) => {
  const shortServiceWays =
    feature.properties.highway === "service" &&
    feature.properties["FMC:lenght"] <= 10.0

  return (
    shortServiceWays ||
    feature.properties.highway === "proposed" ||
    feature.properties.highway === "construction" ||
    feature.properties.service === "driveway"
  )
}
