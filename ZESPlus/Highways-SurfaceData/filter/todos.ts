export const TODO_WegeOhneSurface = (feature) => {
  return !feature.properties.surface
}
export const TODO_WegeOhneSmoothnessAberMitSurface = (feature) => {
  return feature.properties.surface && !feature.properties.smoothness
}
