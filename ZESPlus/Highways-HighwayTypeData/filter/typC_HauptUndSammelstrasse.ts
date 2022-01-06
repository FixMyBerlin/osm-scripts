import { highMaxSpeed } from "../utils/highMaxSpeed"
import { irrelevanteWege } from "./irrelevanteWege"
import { typAusserorts } from "./typE_Ausserorts"

// TYP C – Haupt-/Sammel-[Wohn]straße
export const typHauptUndSammelstrasse = (feature) => {
  if (irrelevanteWege(feature)) return false
  if (typAusserorts(feature)) return false

  const residentialMitRadwegIstSammelstrasse =
    feature.properties.highway === "residential" &&
    feature.properties["cycleway:both"] === "separate"

  const unclassified50PlusAlsSammelstrasse =
    highMaxSpeed(feature) && feature.properties.highway === "unclassified"

  const zubringerMitGuterOberflaeche =
    feature.properties.highway === "unclassified" &&
    feature.properties.surface === "asphalt"

  const residential50PlusAlsSammelstrasse =
    highMaxSpeed(feature) &&
    ["residential", "secondary"].includes(feature.properties.highway) &&
    // Wenn Segement zu klein, dann bleibt es was es vorher war.
    // Beispiel https://www.openstreetmap.org/way/4935069
    parseFloat(feature.properties["FMC:length"]) >= 50.0

  return (
    residentialMitRadwegIstSammelstrasse ||
    unclassified50PlusAlsSammelstrasse ||
    residential50PlusAlsSammelstrasse
  )
}
