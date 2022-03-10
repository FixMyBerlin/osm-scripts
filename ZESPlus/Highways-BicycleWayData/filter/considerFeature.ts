import { filterGenerallyIrrelevantWays } from "../../utils/filterGenerallyIrrelevantWays"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const considerFeature = (feature) => {
  return !filterGenerallyIrrelevantWays(feature)
}
