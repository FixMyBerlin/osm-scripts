import { addCustomProperties } from "./addCustomProperties"
import { collectLeftOverHighways } from "./collectLeftOverHighways"
import { writeGeoJson } from "./writeGeoJson"

export const filterAndWrite = (filterMethod, allHighways, outputFolder) => {
  // Filter Data
  const filteredData = allHighways.features.filter(filterMethod)

  addCustomProperties(filteredData)

  collectLeftOverHighways(filteredData, filterMethod.name)

  writeGeoJson({
    data: filteredData,
    folder: outputFolder,
    fileNamePart: filterMethod.name,
  })
}
