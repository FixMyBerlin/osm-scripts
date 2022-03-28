import { Feature } from "../types"

export const addFilenameProperty = (
  features: Feature[],
  fileNamePart: string
) => {
  console.time("⏱ addFilenameProperty()")

  features.forEach((feature) => {
    feature.properties[`FMC:Category:${fileNamePart}`] = "true"
    // Custom layer name for the vector tiles
    //  Docs: https://github.com/mapbox/tippecanoe#geojson-extension
    //  We can do this whenever there is only one category per feature (like with our POI data)
    feature['tippecanoe'] = { layer: fileNamePart }
  })

  console.timeEnd("⏱ addFilenameProperty()")
}
