import { Feature } from "../types"

// TBD: Macht es Sinn den Teil "latLonInMiddle" (Punkt in der Mitte der Linie, aber auf der Linie) in SQL zu berehnen und dann fertig ans Frontend zu liefern?
// Links nicht in SQL (etc), sondern im Frontend generieren.
export const addLinkProperties = (features: Feature[]) => {
  console.time("⏱ addCustomLinkProperties()")

  features.forEach((feature) => {
    feature.properties[
      "FMC:linkToOsmWebsite"
    ] = `https://www.openstreetmap.org/${
      feature.properties["id"] || feature.properties["@id"]
    }`

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
