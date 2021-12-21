// TODO: Wie wollen wir Bürgersteige mit Schild DE:239,1022-10 mappen?, https://www.openstreetmap.org/way/883876171
// Auch als sidewalk oder nur als footway?
export const TODO_BuergersteigTaggingFehlt = (feature) => {
  return (
    feature.properties.highway === "footway" &&
    feature.properties.is_sidepath === "yes" &&
    (!feature.properties.footway || feature.properties.footway !== "sidewalk")
  )
}

export const TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist = (feature) => {
  return feature.properties.highway && feature.properties.area === "yes"
}
