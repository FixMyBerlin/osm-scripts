import { FeatureCollection } from "../types"

// We match for those exact keys.
// In addition, all "FMC:*" keys are save.
// This way, we avoid adding all those "name:*" keys by accident.
const saveListKeys = [
  "aeroway",
  "amenity",
  "highway",
  "id",
  "landuse",
  "name",
  "natural",
  "place",
  "population",
  "railway",
  "railway",
  "shop",
  "usage",
  "waterway",
]

export const cleanupPropsFromPoiPoints = (geoJson: FeatureCollection) => {
  console.time("⏱ cleanupPropsFromPoiPoints()")

  geoJson.features.forEach((feature) => {
    const cleanProperties = {}

    Object.keys(feature.properties).forEach((propKey) => {
      saveListKeys.forEach((saveListKey) => {
        if (propKey.startsWith("FMC:") || propKey == saveListKey) {
          cleanProperties[propKey] = feature.properties[propKey]
        }
      })
    })

    feature.properties = cleanProperties
  })

  console.timeEnd("⏱ cleanupPropsFromPoiPoints()")
}
