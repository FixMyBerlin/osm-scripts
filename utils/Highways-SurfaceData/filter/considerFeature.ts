import { filterGenerallyIrrelevantWays } from "../../filter"
import { Feature } from "../../types"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const considerFeature = (feature: Feature) => {
  return !filterGenerallyIrrelevantWays(feature)
}
