import { irrelevanteWege } from "./irrelevanteWege"

export const typSchnellstrassen = (feature) => {
  if (irrelevanteWege(feature)) return false

  return ["trunk", "trunk_link"].includes(feature.properties.highway)
}
