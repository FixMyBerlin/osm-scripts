import { filterGenerallyIrrelevantWays } from "../../utils/filterGenerallyIrrelevantWays"

// https://wiki.openstreetmap.org/wiki/DE:Key:maxspeed
// Site node https://wiki.openstreetmap.org/wiki/Proposed_features/maxspeed_walk
export const filterMaxspeed = (feature) => {
  if (filterGenerallyIrrelevantWays(feature)) return

  // We don't exclude it but use the value
  // const excludeExplicitNone = feature.properties["maxspeed"] === "none"

  const includeDirectlyTagged =
    feature.properties["maxspeed"] ||
    feature.properties["maxspeed:conditional"] ||
    feature.properties["maxspeed:forward"] ||
    feature.properties["maxspeed:backward"] ||
    feature.properties["maxspeed:variable"]

  const includeByType =
    feature.properties["maxspeed:type"] ||
    feature.properties["source:maxspeed"] ||
    feature.properties["zone:maxspeed"]

  // https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dliving_street
  const includeIndirectlyTagged = feature.properties.highway === "living_street"

  return includeDirectlyTagged || includeByType || includeIndirectlyTagged
}
