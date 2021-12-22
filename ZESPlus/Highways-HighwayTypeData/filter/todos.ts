// Hinweis: Bürgersteige mit Schild DE:239,1022-10 https://www.openstreetmap.org/way/883876171
// werden nicht als "sidewalk" gemapped.
export const TODO_BuergersteigTaggingFehlt = (feature) => {
  return (
    feature.properties.highway === "footway" &&
    feature.properties.is_sidepath === "yes" &&
    (!feature.properties.footway ||
      feature.properties.footway !== "sidewalk") &&
    // If bikes are allowed, we don't tag 'sidewalk'
    !["yes", "designated"].includes(feature.properties.bicycle) &&
    // Crossings are not tagged as 'sidewalk'
    !feature.properties.crossing
  )
}

export const TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist = (feature) => {
  return feature.properties.highway && feature.properties.area === "yes"
}
