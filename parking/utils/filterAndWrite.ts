import { addCategoryProperty } from "../../ZESPlus/utils/addFilterNameProperty"
import { collectFilteredHighways } from "../../ZESPlus/utils/collectFilteredHighways"
import { Feature, FeatureCollection } from "../../ZESPlus/utils/types"
import { writeGeoJson } from "../../ZESPlus/utils/writeGeoJson"

export const filterAndWrite = (
  filterMethod: (feature: Feature) => boolean,
  allHighways: FeatureCollection,
  outputFolder: string
) => {
  console.time(`⏱ filterAndWrite(): ${filterMethod.name}`)

  // Filter Data
  const filteredData = allHighways.features.filter(filterMethod)
  const length =
    (filteredData &&
      filteredData.reduce(
        (partialSum, feature) =>
          partialSum + parseFloat(feature.properties["FMC:length"]),
        0
      )) ||
    0

  addCategoryProperty(filteredData, filterMethod.name)

  collectFilteredHighways(filteredData, filterMethod.name)

  const filteredGeoJson: FeatureCollection = {
    type: "FeatureCollection",
    features: filteredData,
  }

  writeGeoJson({
    geoJsonData: filteredGeoJson,
    folder: outputFolder,
    fileNamePart: filterMethod.name,
  })
  console.timeEnd(`⏱ filterAndWrite(): ${filterMethod.name}`)

  return length.toFixed(2)
}
