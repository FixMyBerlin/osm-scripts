import { irrelevanteWege } from "./irrelevanteWege"

// TYP E – Landes-/Kreisstraße [Außerorts]
/* K 6161 ist Landstraße und führt dann in die Stadt;
TODO: Innerhalb der Stadt müssten wir sie manuell umkategorisieren und als Hauptstraße taggen. */
export const typAusserorts = (feature) => {
  return (
    !irrelevanteWege(feature) &&
    ["tertiary", "tertiary_link"].includes(feature.properties.highway)
  )
}
