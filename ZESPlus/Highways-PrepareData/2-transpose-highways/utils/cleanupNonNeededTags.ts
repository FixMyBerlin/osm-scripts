import { FeatureCollection } from "../../../utils/types"

// We search for this string in the properties keys (so any substring could match)
// This reduces teh filesize from 48,4 to 47,1 MB.
const keysToDelete = [
  "name:",
  "destination",
  "crossing:island",
  "is_sidepath:of",
  "is_sidepath:of:name",
  "postal_code",
  "handrail",
  "incline",
  "stroller",
  "wheelchair",
  "tactile_paving",
  "note",
  "width",
  "priority_road",
  "lanes",
  "tracktype",
  "motor_vehicle",
]

export const cleanupNonNeededTags = (geoJson: FeatureCollection) => {
  console.time("⏱ cleanupNonNeededTags()")
  geoJson.features.forEach((feature) => {
    Object.keys(feature.properties).forEach((prop) => {
      keysToDelete.forEach((keyToDelete) => {
        const regex = new RegExp(keyToDelete)
        if (regex.test(prop)) {
          delete feature.properties[prop]
        }
      })
    })
  })
  console.timeEnd("⏱ cleanupNonNeededTags()")
}
