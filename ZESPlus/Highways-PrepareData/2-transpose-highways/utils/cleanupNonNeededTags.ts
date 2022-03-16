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
  "is_in:",
  "int_ref",
  "layer",
  "material",
  "maxaxleload",
  "maxheight",
  "maxlength",
  "lit_by_gaslight",
  "loc_name",
  "location",
  "lda:criteria",
  "maxweight",
  "maxweight:",
  "name_old",
  "odbl",
  "old_name",
  "old_ref",
  "opening_date",
  "opening_hours",
  "operator",
  "piste:",
  "placement",
  "placement:",
  "razed:",
  "ref",
  "ref:",
  "roof:",
  "shelter",
  "step:",
  "temporary",
  "temporary:",
  "toll",
  "toll:",
  "was:",
  "abandoned:",
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
