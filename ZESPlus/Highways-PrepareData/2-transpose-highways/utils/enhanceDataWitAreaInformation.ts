import de9im from "de9im"
import fs from "fs"
import { AreaCallbackProps } from "../../../utils/overpassToGeoJson/types"

export const enhanceDataWitAreaInformation: AreaCallbackProps = (
  areaKey,
  geoJson
) => {
  console.time(`⏱ enhanceData(): Ergänze FMC:Gebiete:${areaKey}=True|False`)

  const file = `./ZESPlus/AreaOfInterest/output/${areaKey}.geojson`
  // Needs to be .readFileSync or otherise all needs to become async
  const area = JSON.parse(fs.readFileSync(file, { encoding: "utf8" }))

  geoJson.features.forEach((feature) => {
    const partOfOrOverlaps = de9im.intersects(area, feature.geometry)
    feature.properties[`FMC:Gebiete:${areaKey}`] = `${partOfOrOverlaps}`
    if (partOfOrOverlaps) {
      feature.properties["FMC:Gebiete"] = [
        areaKey,
        feature.properties["FMC:Gebiete"],
      ]
        .filter((n) => n) // Remove unfefined and null values. Ruby, I miss you.
        .join(",")
    }
  })

  console.timeEnd(`⏱ enhanceData(): Ergänze FMC:Gebiete:${areaKey}=True|False`)
}
