import { irrelevanteWege } from "./irrelevanteWege"
import { typAusserorts } from "./typE_Ausserorts"

// TYP C – Haupt-/Sammel-[Wohn]straße
export const typHauptUndSammelstrasse = (feature) => {
  if (irrelevanteWege(feature)) return false
  if (typAusserorts(feature)) return false

  const residentialMitRadwegIstSammelstrasse =
    feature.properties.highway === "residential" &&
    feature.properties["cycleway:both"] === "separate"

  // Beispiel für forward/backward https://www.openstreetmap.org/way/164719884
  // TODO OSM: Eine Wohnstraße ohne Gehweg mit maxspeed 50? way/4920400
  const hoherMaxSpeed =
    parseFloat(feature.properties.maxspeed) >= 50.0 ||
    parseFloat(feature.properties["maxspeed:forward"]) >= 50.0 ||
    parseFloat(feature.properties["maxspeed:backward"]) >= 50.0

  const residentialMitMit50plusIstSammelstrasse =
    hoherMaxSpeed &&
    ["residential", "unclassified", "secondary"].includes(
      feature.properties.highway
    ) &&
    // // unpaved macht es zu FreiGefuehrt
    feature.properties.surface !== "unpaved" &&
    // Wenn Segement zu klein, dann bleibt es was es vorher war.
    // Beispiel https://www.openstreetmap.org/way/4935069
    parseFloat(feature.properties["FMC:length"]) >= 50.0

  const zubringerMitGuterOberflaeche =
    feature.properties.highway === "unclassified" &&
    feature.properties.surface === "asphalt"

  return (
    residentialMitRadwegIstSammelstrasse ||
    residentialMitMit50plusIstSammelstrasse ||
    zubringerMitGuterOberflaeche
  )
}
