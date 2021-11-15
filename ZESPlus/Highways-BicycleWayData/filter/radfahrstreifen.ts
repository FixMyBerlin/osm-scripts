// Radfahrstreifen, ein Radweg auf der Fahrbahn. Er wird durch einen durchgezogene oder gestrichelte Linie von der Fahrbahn abgeteilt.
// https://wiki.openstreetmap.org/wiki/DE:Tag:cycleway%3Dlane
// https://wiki.openstreetmap.org/wiki/DE:Tag:cycleway%3Dopposite_lane
export const radfahrstreifen = (feature) => {
  return (
    feature.properties.cycleway === "lane" ||
    feature.properties.cycleway === "opposite_lane" ||
    feature.properties["cycleway:right"] === "lane" ||
    feature.properties["cycleway:left"] === "lane" ||
    feature.properties["cycleway:both"] === "lane"
  )
}
