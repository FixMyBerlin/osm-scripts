import { filterGenerallyIrrelevantWays } from "../../utils/filterGenerallyIrrelevantWays"

// Wege, die wir aktiv ausschließen von allen Abfragen
export const irrelevanteWege = (feature) => {
  return filterGenerallyIrrelevantWays(feature)
}
