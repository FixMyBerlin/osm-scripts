import { FeatureCollection } from "../types"

export type AreaCallbackProps = (
  areaFile: string,
  areaKey: string,
  geoJson: FeatureCollection
) => void

export type OverpassToGeoJson = {
  readFile: string
  outputFolder: string
  fileNamePart: string
  filterCallback?: (geoJson: FeatureCollection) => void
  addPropertiesCallback?: (geoJson: FeatureCollection) => void
  /** @desc { eichwalde: 'path/to/eichwalde-boundary.geojson }, optional. Will add a cusotm prop "FMC:Gebiete:${areaKey}=True|False" */
  areasForIntersection?: { [key: string]: string }
}
