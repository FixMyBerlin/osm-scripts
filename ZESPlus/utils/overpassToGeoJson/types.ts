import { FeatureCollection } from "../types"

export type AreaCallbackProps = (
  areaKey: string,
  geoJson: FeatureCollection
) => void

export type OverpassToGeoJson = {
  readFile: string
  outputFolder: string
  fileNamePart: string
  filterCallback?: (geoJson: FeatureCollection) => void
  addPropertiesCallback?: (geoJson: FeatureCollection) => void
  areaCallback?: AreaCallbackProps
}
