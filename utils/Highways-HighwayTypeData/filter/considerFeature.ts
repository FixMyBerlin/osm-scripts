import { filterGenerallyIrrelevantWays } from "../../filter"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const considerFeature = (feature) => {
  if (filterGenerallyIrrelevantWays(feature)) return false

  // Alle reinen Gehwege (sie müssen noch nicht mal `is_sidepath=yes` getaggt sein.)
  // Auch wenn diese Wege geteilte Radwege sind (DE:239,1022-10)
  const gehwege =
    feature.properties.footway === "sidewalk" ||
    (feature.properties.highway === "footway" &&
      feature.properties.is_sidepath === "yes")

  const begleitenderWeg = feature.properties.is_sidepath === "yes"

  const stufen = feature.properties.highway === "steps"

  const schnellstrasse = ["motorway_link", "motorway"].includes(
    feature.properties.highway
  )

  const ignoreSmallServiceSegments =
    feature.properties.highway === "service" &&
    parseFloat(feature.properties["FMC:length"]) <= 40.0

  const ignoreByAccess = feature.properties.access === "delivery"

  return !(
    gehwege ||
    begleitenderWeg ||
    stufen ||
    schnellstrasse ||
    ignoreSmallServiceSegments ||
    ignoreByAccess
  )
}
