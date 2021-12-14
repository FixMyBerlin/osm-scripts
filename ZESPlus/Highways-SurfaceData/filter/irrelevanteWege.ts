import { filterGenerallyIrrelevantWays } from "../../utils/filterGenerallyIrrelevantWays"
import { Feature } from "../../utils/types"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const irrelevanteWege = (feature: Feature) => {
  return filterGenerallyIrrelevantWays(feature)
}
