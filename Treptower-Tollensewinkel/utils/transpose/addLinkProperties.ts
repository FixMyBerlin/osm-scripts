import { Feature } from "../types"

export const addLinkProperties = (features: Feature[]) => {
  console.time("⏱ addCustomLinkProperties()")

  features.forEach((feature) => {
    feature.properties[
      "FMC:linkToOsmWebsite"
    ] = `https://www.openstreetmap.org/${feature.properties["@id"]}`

    const latLonInMiddle =
      feature.geometry.type === "Point"
        ? feature.geometry.coordinates
        : feature.geometry.coordinates[
            Math.floor(feature.geometry.coordinates.length - 1 / 2)
          ]

    feature.properties[
      "FMC:linkToMapillary"
    ] = `https://www.mapillary.com/app/?lat=${latLonInMiddle[1]}&lng=${latLonInMiddle[0]}&z=16&focus=map`
  })

  console.timeEnd("⏱ addCustomLinkProperties()")
}
