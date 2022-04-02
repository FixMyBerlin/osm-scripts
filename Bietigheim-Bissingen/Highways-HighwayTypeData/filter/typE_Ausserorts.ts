import { Feature } from "../../utils/types"
import { considerFeature } from "./considerFeature"

// TYP E – Landes-/Kreisstraße [Außerorts]
/* K 6161 ist Landstraße und führt dann in die Stadt;
TODO: Innerhalb der Stadt müssten wir sie manuell umkategorisieren und als Hauptstraße taggen. */
export const typAusserorts = (feature: Feature) => {
  if (!considerFeature(feature)) return false

  const byType = [
    "tertiary",
    "tertiary_link",
    "trunk",
    "trunk_link",
    "primary",
    "secondary",
  ].includes(feature.properties.highway)

  const byRef = feature.properties.ref?.startsWith("L ")

  return !!(byType || byRef)
}
