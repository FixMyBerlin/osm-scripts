import { Feature } from "../../types"
import { considerFeature } from "./considerFeature"
import { typHauptUndSammelstrasse } from "./typC_HauptUndSammelstrasse"

// TYP A + B – Wohnweg/Wohnstraße (Erschließungsstraßen)
// Mindset: Wir müssen hier präzise sein, um eine Abgrenung zu TypHauptUndSammelstrasse zu erreichen
export const typWohnstrasse = (feature: Feature) => {
  if (!considerFeature(feature)) return false
  if (typHauptUndSammelstrasse(feature)) return false

  const byType = ["residential", "living_street"].includes(
    feature.properties.highway
  )

  // Which we have in typFreiGefuehrt()
  const notDriveThrought = feature.properties.service !== "drive-through"

  const serviceWithName =
    feature.properties.highway === "service" &&
    feature.properties.name &&
    notDriveThrought

  const serviceWithBikeAccess =
    feature.properties.highway === "service" &&
    ["designated", "permissive", "permit"].includes(feature.properties.bicycle)

  const serviceWithMaxspeed =
    feature.properties.highway === "service" &&
    feature.properties.maxspeed === "30" &&
    notDriveThrought

  return !!(
    byType ||
    serviceWithName ||
    serviceWithBikeAccess ||
    serviceWithMaxspeed
  )
}
