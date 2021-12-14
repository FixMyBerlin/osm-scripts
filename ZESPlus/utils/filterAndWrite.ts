import { addCustomProperties } from "./addCustomProperties"
import { collectFilteredHighways } from "./collectFilteredHighways"
import { Feature, FeatureCollection } from "./types"
import { writeGeoJson } from "./writeGeoJson"

export const filterAndWrite = (
  filterMethod: (feature: Feature) => boolean,
  allHighways: FeatureCollection,
  outputFolder: string
) => {
  // Filter Data
  const filteredData = allHighways.features.filter(filterMethod)

  addCustomProperties(filteredData, filterMethod.name)

  collectFilteredHighways(filteredData, filterMethod.name)

  writeGeoJson({
    data: filteredData,
    folder: outputFolder,
    fileNamePart: filterMethod.name,
  })
}
