import { filteredHighwayFeatureIds } from "./collectFilteredHighways"
import { Feature } from "./types"

// Creates a list of all highways that we did not assign to a specific cateogry.
// We can use this to check what we are missing.
// But in general, there are a lot of highways that we do want to exclude.
export const TODO_filterLeftoverHighwaysToBeCheckedManually = (
  feature: Feature
) => {
  return !filteredHighwayFeatureIds.flat().includes(feature.properties.id)
}
