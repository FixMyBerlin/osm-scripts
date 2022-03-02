import { Feature } from "../../ZESPlus/utils/types"

// Filter for all streets that have a position value like "on_street"
// We do this by just checking all vales against our appectList
//
// We include `separate` in this list even though it does leave room for interpretation as to where one would park.
// However if the mapper followed our guidelines, parking=street_side is only used for "shoulder"-type parking.
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
      "separate",
    ]
    return acceptList.includes(feature.properties[key])
  })

  return present.includes(true)
}
