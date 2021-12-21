import { filterGenerallyIrrelevantWays } from "../../utils/filterGenerallyIrrelevantWays"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const irrelevanteWege = (feature) => {
  // Alle reinen Gehwege (sie müssen noch nicht mal `is_sidepath=yes` getaggt sein.)
  // Auch wenn diese Wege geteilte Radwege sind (DE:239,1022-10)
  const gehwege =
    feature.properties.footway === "sidewalk" ||
    (feature.properties.highway === "footway" &&
      feature.properties.is_sidepath === "yes")

  const stufen = feature.properties.highway === "steps"

  return filterGenerallyIrrelevantWays(feature) || gehwege || stufen
}
