// Note, we ignore https://wiki.openstreetmap.org/wiki/DE:Key:maxspeed:variable for now.
export const addMaxspeedSourceProperty = (feature) => {
  // Handle the special case where no maxspeed present (usually)
  // More at https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dliving_street
  if (feature.properties.highway === "living_street") {
    feature.properties["FMC:maxspeed:source"] = "Verkehrsberuhigter Bereich"
    return
  }

  if (
    feature.properties["maxspeed:type"] === "DE:bicycle_road" ||
    feature.properties["source:maxspeed"] === "DE:bicycle_road"
  ) {
    feature.properties["FMC:maxspeed:source"] = "Fahrradstraße"
    return
  }

  // Beschildert
  if (
    feature.properties["maxspeed:type"] === "sign" ||
    feature.properties["source:maxspeed"] === "sign" ||
    feature.properties["source:maxspeed:conditional"] === "sign" ||
    feature.properties["maxspeed:type"] === "sign;DE:urban" ||
    feature.properties["source:maxspeed"] === "sign;DE:urban" ||
    feature.properties["source:maxspeed:conditional"] === "sign;DE:urban" ||
    feature.properties["maxspeed:type"] === "traffic_sign" ||
    feature.properties["source:maxspeed"] === "traffic_sign" ||
    feature.properties["source:maxspeed:conditional"] === "traffic_sign" ||
    feature.properties["source:maxspeed:forward"] === "sign" ||
    feature.properties["source:maxspeed:backward"] === "sign"
  ) {
    feature.properties["FMC:maxspeed:source"] = "Beschilderung"
    return
  }

  // Innerorts
  if (
    feature.properties["maxspeed:type"] === "DE:urban" ||
    feature.properties["source:maxspeed"] === "DE:urban" ||
    feature.properties["source:maxspeed:forward"] === "DE:urban" ||
    feature.properties["source:maxspeed:backward"] === "DE:urban"
  ) {
    feature.properties["FMC:maxspeed:source"] = "Innerorts"
    return
  }

  // Außerorts
  if (
    feature.properties["maxspeed:type"] === "DE:rural" ||
    feature.properties["source:maxspeed"] === "DE:rural" ||
    feature.properties["source:maxspeed:forward"] === "DE:rural" ||
    feature.properties["source:maxspeed:backward"] === "DE:rural"
  ) {
    feature.properties["FMC:maxspeed:source"] = "Außerorts"
    return
  }

  // Zone
  if (
    feature.properties["maxspeed:type"] === "DE:zone30" ||
    feature.properties["source:maxspeed"] === "DE:zone:30" ||
    feature.properties["source:maxspeed"] === "DE:zone30" ||
    feature.properties["zone:maxspeed"] === "DE:30" ||
    feature.properties["zone:maxspeed"] === "DE30" ||
    feature.properties["zone:maxspeed"] === "30" ||
    feature.properties["maxspeed:type"] === "DE:zone20" ||
    feature.properties["source:maxspeed"] === "DE:zone:20" ||
    feature.properties["source:maxspeed"] === "DE:zone20" ||
    feature.properties["zone:maxspeed"] === "DE:20" ||
    feature.properties["zone:maxspeed"] === "DE20" ||
    feature.properties["zone:maxspeed"] === "20" ||
    feature.properties["source:maxspeed"] === "DE:zone"
  ) {
    feature.properties["FMC:maxspeed:source"] = "Zone"
    return
  }

  // Fallback: Notify about missing value
  feature.properties["FMC:maxspeed:source"] = "No source given"
}
