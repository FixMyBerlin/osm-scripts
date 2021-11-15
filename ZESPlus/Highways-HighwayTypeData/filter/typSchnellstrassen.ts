export const typSchnellstrassen = (feature) => {
  return ["trunk", "trunk_link", "rest_area"].includes(
    feature.properties.highway
  )
}
