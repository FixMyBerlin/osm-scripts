// Add footway=sidewalk to all Bürgersteige. The filter tries to exclude false positives.
// like path's with traffic_sign=DE:239,1022-10 https://www.openstreetmap.org/way/883876171
// which are _not_ mapped as sidewalk.
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

// highway and area=yes is fine, but we should need to make sure there are way-/line-highways as well, or the script will leave an empty spot
export const TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist = (feature) => {
  return feature.properties.highway && feature.properties.area === "yes"
}

// highway-service without a subtag is fine, but hard to deal with. Ideally, we have an access=yes|no|… for those.
export const TODO_ServiceWithoutAccessAndSubtagging = (feature) => {
  return (
    feature.properties.highway === "service" &&
    !feature.properties.service &&
    !feature.properties.access
  )
}

// `is_sidepath` is important to filter paths(…). Ideally, we have it set to yes|no for all path|track|cycleway
export const TODO_AddIsSidepath = (feature) => {
  return (
    ["path", "track", "cycleway"].includes(feature.properties.highway) &&
    !feature.properties.is_sidepath &&
    (!feature.properties.access || feature.properties.acces === "yes")
  )
}
