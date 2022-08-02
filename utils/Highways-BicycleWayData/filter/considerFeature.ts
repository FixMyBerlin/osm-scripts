import { filterGenerallyIrrelevantWays } from "../../filter"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const considerFeature = (feature) => {
  return !filterGenerallyIrrelevantWays(feature)
}
