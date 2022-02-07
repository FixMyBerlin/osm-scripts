// We use a special overpass feature to get the length of the highway segments.
// However, once we parse this data, the length is lost.
// This moves the length data from a 'stats' object on top level to the 'properties' of our highway.
export const addLenghtFromOverpassStatsResultToGeoJson = (
  rawJsonData,
  geoJsonData
) => {
  const lengthString = rawJsonData.elements.filter((e) => e.type === "stat")[0]
    ?.tags?.way_id_length

  if (lengthString) {
    console.log(
      "addLenghtFromOverpassStatsResultToGeoJson()",
      "Adding FMC:length to properties"
    )
  } else {
    console.log(
      "addLenghtFromOverpassStatsResultToGeoJson()",
      "No lenght data found"
    )
    return
  }

  console.time("addLenghtFromOverpassStatsResultToGeoJson()")

  const lengthObject = Object.fromEntries(
    lengthString.split(";").map((line) => line.split(":"))
  )

  geoJsonData.features.forEach((feature) => {
    const featureLength =
      lengthObject[
        Object.keys(lengthObject).find((key) => key == feature.properties.id)
      ]

    if (!featureLength)
      console.error("Could not find lenght for", feature.properties.id)

    // Add length to GeoJSON as string (since all keys and values are of type string)
    feature.properties["FMC:length"] = `${parseFloat(featureLength)}`
  })

  console.timeEnd("addLenghtFromOverpassStatsResultToGeoJson()")
}
