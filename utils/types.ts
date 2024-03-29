export type Feature = {
  type: "Feature"
  id: string
  properties: { [key: string]: string } & Partial<{
    population: string | number
  }>
  geometry: any // we don't care about the geometry for our filters
}

export type FeatureCollection = {
  type: "FeatureCollection"
  features: Feature[]
}
