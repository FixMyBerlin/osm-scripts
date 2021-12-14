import { Feature } from "./types"

/**
 * Add custom `FMC:*` helper properties.
 */
export const addCustomProperties = (
  features: Feature[],
  filterMethodName: string
) => {
  features.forEach((feature) => {
    feature.properties["FMC:category"] = filterMethodName

    feature.properties[
      "FMC:linkToOsmWebsite"
    ] = `https://www.openstreetmap.org/${feature.id}`

    const latLonInMiddle =
      feature.geometry.coordinates[
        Math.floor(feature.geometry.coordinates.length - 1 / 2)
      ]
    feature.properties[
      "FMC:linkToMapillary"
    ] = `https://www.mapillary.com/app/?lat=${latLonInMiddle[1]}&lng=${latLonInMiddle[0]}&z=16&focus=map`
  })
}
