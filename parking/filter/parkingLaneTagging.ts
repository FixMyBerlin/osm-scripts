import { Feature } from "../../ZESPlus/utils/types"

// Filter for all streets that have any parking lane tagging.
// This does not look at completeness (left/right/both), yet
export const parkingLaneTagging = (feature: Feature) => {
  const parkingTaggedBase = !!feature.properties["parking:lane"]
  const parkingTaggedBoth = !!feature.properties["parking:lane:both"]
  const parkingTaggedLeft = !!feature.properties["parking:lane:left"]
  const parkingTaggedRight = !!feature.properties["parking:lane:right"]

  return (
    parkingTaggedBase ||
    parkingTaggedBoth ||
    parkingTaggedLeft ||
    parkingTaggedRight
  )
}
