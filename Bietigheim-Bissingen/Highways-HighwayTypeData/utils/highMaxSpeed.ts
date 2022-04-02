export const highMaxSpeed = (feature) => {
  // Beispiel für forward/backward https://www.openstreetmap.org/way/164719884
  // TBD: This rule is too broad. In some regions, no one bothered to formally classify roads as maxspeed=30
  //   just because they are not used that much. So formally they are 50. But still residential.
  // const hoherMaxSpeed =
  //   parseFloat(feature.properties.maxspeed) >= 50.0 ||
  //   parseFloat(feature.properties["maxspeed:forward"]) >= 50.0 ||
  //   parseFloat(feature.properties["maxspeed:backward"]) >= 50.0
  return (
    parseFloat(feature.properties.maxspeed) >= 50.1 ||
    parseFloat(feature.properties["maxspeed:forward"]) >= 50.1 ||
    parseFloat(feature.properties["maxspeed:backward"]) >= 50.1
  )
}
