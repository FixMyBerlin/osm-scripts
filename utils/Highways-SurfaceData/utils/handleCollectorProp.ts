import { Feature } from "../../types"

// Creates an array of values for the given Scope.
// However, arrays are not supported with Mapbox Studio, so we need to convert them to strings below.
export const addCollecorProp = (
  feature: Feature,
  valueToCollect: string,
  propNamePart: string
) => {
  // Cannot get the types working for this one…
  const propName = `FMC:Category:SurfaceData:${propNamePart}`
  feature.properties[propName] = [
    ...((feature.properties[propName] || []) as any),
    valueToCollect,
  ] as any
  feature.properties[
    `${propName}:count`
  ] = `${feature.properties[propName].length}`
}

// Convert the arrays to a string to make it conform the Mapbox specs.
// https://docs.mapbox.com/mapbox-tiling-service/guides/frequentlyaskedquestions/#objects-and-arrays-in-feature-properties-are-being-dropped
export const collectorPropArrayToString = (
  feature: Feature,
  propName: string
) => {
  feature.properties[propName] = (feature.properties[propName] as any)?.join(
    ","
  )
}
