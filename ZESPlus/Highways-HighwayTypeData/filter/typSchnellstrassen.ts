export const typSchnellstrassen = (feature) => {
  return ["trunk", "trunk_link"].includes(feature.properties.highway)
}
