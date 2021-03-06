import { gehUndRadwegGemeinsam } from "./gehUndRadwegGemeinsam"
import { considerFeature } from "./considerFeature"
import { stufen } from "./stufen"

// Getrennter Geh- und Radweg / Getrennter Rad- und Gehweg
// traffic_sign=DE:241-30, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:241-30
// traffic_sign=DE:241-31, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:241-31
export const gehUndRadwegGetrennt = (feature) => {
  if (!considerFeature(feature)) return false
  if (stufen(feature)) return false
  // "Gemeinsamer Geh- und Radweg" gewinnt gegen "segregated=yes".
  if (gehUndRadwegGemeinsam(feature)) return false

  const basedOnSign = feature.properties.traffic_sign?.startsWith("DE:241")

  const basedOnAccess =
    feature.properties.bicycle === "designated" &&
    feature.properties.foot === "designated" &&
    feature.properties.segregated === "yes"

  return basedOnSign || basedOnAccess
}
