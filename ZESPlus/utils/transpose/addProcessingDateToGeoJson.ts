export const addProcessingDateToGeoJson = (geoJsonData) => {
  console.log(
    "addProcessingDateToGeoJson()",
    "Adding FMC:DataCreatedAndProcessedAt to properties"
  )

  geoJsonData.features.forEach((feature) => {
    const createdAt = new Date().toISOString().slice(0, 16).replace("T", " ")
    feature.properties["FMC:DataCreatedAndProcessedAt"] = `${createdAt}`
  })
}
