import { Feature } from "../../utils/types"
import { irrelevanteWege } from "./irrelevanteWege"

export const smoothness = (feature: Feature) => {
  if (irrelevanteWege(feature)) return false

  return true
}
