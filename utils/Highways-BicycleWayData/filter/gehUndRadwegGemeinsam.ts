import { fahrradstrasse } from "./fahrradstr"
import { considerFeature } from "./considerFeature"
import { stufen } from "./stufen"

// Gemeinsamer Geh- und Radweg
// traffic_sign=DE:240, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:240
// TODO: way/231469978 ist highway=cycleway, aber müsste vielleicht =path sein?
export const gehUndRadwegGemeinsam = (feature) => {
  if (!considerFeature(feature)) return false
  if (stufen(feature)) return false
  if (fahrradstrasse(feature)) return false

  const basedOnSign = feature.properties.traffic_sign?.startsWith("DE:240")

  const basedOnAccess =
    feature.properties.bicycle === "designated" &&
    feature.properties.foot === "designated" &&
    feature.properties.segregated === "no"

  return basedOnSign || basedOnAccess
}
