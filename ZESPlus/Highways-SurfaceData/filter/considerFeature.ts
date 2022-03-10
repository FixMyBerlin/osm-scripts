import { filterGenerallyIrrelevantWays } from "../../utils/filterGenerallyIrrelevantWays"
import { Feature } from "../../utils/types"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const considerFeature = (feature: Feature) => {
  return !filterGenerallyIrrelevantWays(feature)
}
