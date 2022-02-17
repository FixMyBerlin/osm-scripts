import { Feature } from "../../ZESPlus/utils/types"

// Filter for all streets that have a position value like "on_street"
// We do this by just checking all vales against our appectList
export const parkingLanePosition = (feature: Feature) => {
  const present: boolean[] = Object.keys(feature.properties).map((key) => {
    const acceptList = [
      "on_street",
      "half_on_kerb",
      "on_kerb",
      "street_side",
      "lay_by",
      "painted_area_only",
      "shoulder",
    ]
    return acceptList.includes(feature.properties[key])
  })

  return present.includes(true)
}
