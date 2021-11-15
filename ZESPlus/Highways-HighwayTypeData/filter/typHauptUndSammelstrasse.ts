import { irrelevanteWege } from "./irrelevanteWege"
import { typWohnstrasse } from "./typWohnstrasse"

// TYP C – Haupt-/Sammel-[Wohn]straße
export const typHauptUndSammelstrasse = (feature) => {
  const residentialMitRadwegIstSammelstrasse =
    feature.properties.highway === "residential" &&
    feature.properties["cycleway:both"] === "separate"

  // Beispiel für forward/backward https://www.openstreetmap.org/way/164719884
  // TODO OSM: Eine Wohnstraße ohne Gehweg mit maxspeed 50? way/4920400
  const hoherMaxSpeed =
    feature.properties.maxspeed >= 50 ||
    feature.properties["maxspeed:forward"] >= 50 ||
    feature.properties["maxspeed:backward"] >= 50

  const residentialMitMit50plusIstSammelstrasse =
    hoherMaxSpeed &&
    ["residential", "unclassified", "secondary"].includes(
      feature.properties.highway
    ) &&
    feature.properties.surface !== "unpaved" // unpaved macht es zu FreiGefuehrt

  const zubringerMitGuterOberflaeche =
    feature.properties.highway === "unclassified" &&
    feature.properties.surface === "asphalt"

  return (
    !irrelevanteWege(feature) &&
    !typWohnstrasse(feature) &&
    (residentialMitRadwegIstSammelstrasse ||
      residentialMitMit50plusIstSammelstrasse ||
      zubringerMitGuterOberflaeche)
  )
}
