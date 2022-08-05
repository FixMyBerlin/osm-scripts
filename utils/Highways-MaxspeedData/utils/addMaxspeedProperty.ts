// Note, we ignore https://wiki.openstreetmap.org/wiki/DE:Key:maxspeed:variable for now.
// Same for maxspeed:hgv, maxspeed:hgv:conditional
// Same for maxspeed:bus
// Same for maxspeed:trailer
// Same for maxspeed:forward:conditional
export const addMaxspeedProperty = (feature) => {
  // Handle the special case where no maxspeed present (usually)
  // More at https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dliving_street
  if (feature.properties.highway === "living_street") {
    feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] =
      "Verkehrsberuhigter Bereich"
    return
  }

  if (
    feature.properties["maxspeed:type"] === "DE:bicycle_road" ||
    feature.properties["source:maxspeed"] === "DE:bicycle_road"
  ) {
    feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] =
      feature.properties["maxspeed"] || "30"
    return
  }

  // Pick the highest value if multiple present.
  const maxspeed = Math.max(
    parseInt(feature.properties["maxspeed"]) || 0,
    parseInt(feature.properties["maxspeed:forward"]) || 0,
    parseInt(feature.properties["maxspeed:backward"]) || 0
  )
  if (maxspeed) {
    feature.properties[
      "FMC:Category:MaxspeedData:MaxspeedValue"
    ] = `${maxspeed}`
    return
  }

  // Translate maxspeed:type (and tagging variants) to maxspeed
  if (
    feature.properties["maxspeed:type"] === "DE:urban" ||
    feature.properties["source:maxspeed"] === "DE:urban"
  ) {
    feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] = "50"
    return
  }
  // https://wiki.openstreetmap.org/wiki/DE:Key:maxspeed#Beispiele
  if (
    feature.properties["maxspeed:type"] === "DE:rural" ||
    feature.properties["source:maxspeed"] === "DE:rural"
  ) {
    feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] = "100"
    return
  }

  if (
    feature.properties["maxspeed:type"] === "DE:zone30" ||
    feature.properties["source:maxspeed"] === "DE:zone:30" ||
    feature.properties["source:maxspeed"] === "DE:zone30" ||
    feature.properties["zone:maxspeed"] === "DE:30" ||
    feature.properties["zone:maxspeed"] === "30"
  ) {
    feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] = "30"
    return
  }

  if (
    feature.properties["maxspeed:type"] === "DE:zone20" ||
    feature.properties["source:maxspeed"] === "DE:zone:20" ||
    feature.properties["source:maxspeed"] === "DE:zone20" ||
    feature.properties["zone:maxspeed"] === "DE:20" ||
    feature.properties["zone:maxspeed"] === "20"
  ) {
    feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] = "20"
    return
  }

  // Add note about conditional maxspeed
  if (feature.properties["maxspeed:conditional"]) {
    feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] =
      "Angabe mit Einschränkungen"
    return
  }

  // Fallback: Notify about missing value
  feature.properties["FMC:Category:MaxspeedData:MaxspeedValue"] =
    "No maxspeed value found"
}
