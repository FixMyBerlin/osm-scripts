import { overpassJsonToGeoJson } from "../utils/overpassToGeoJson/overpassJsonToGeoJson"
import { FeatureCollection } from "../utils/types"
import { areaKeys } from "./areas.constant"

const inputPath = "./ZESPlus/AreaOfInterest/output/raw/"
const outputFolder = "./ZESPlus/AreaOfInterest/output/"

const filterPointsFromGeoJson = (geoJson: FeatureCollection): void => {
  // https://stackoverflow.com/a/41271541/729221
  // Needs to be sorted Z-A so we remove the last item first
  const arrayIdexesToRemove = geoJson.features
    .map((feature, i) => (feature.geometry.type === "Point" ? i : ""))
    .filter(String)
    .sort((a: number, b: number) => b - a)

  console.log(
    "filterPointsFromGeoJson()",
    `Removing ${arrayIdexesToRemove.length} Point features from GeoJSON.`
  )

  arrayIdexesToRemove.forEach((index) => {
    // `.splice` is better than `delete`, see https://stackoverflow.com/a/500617/729221
    geoJson.features.splice(index as number, 1)
  })
}

// One file forEach
areaKeys.map((areaKey) =>
  overpassJsonToGeoJson({
    readFile: `${inputPath}/${areaKey}.json`,
    outputFolder: outputFolder,
    fileNamePart: areaKey,
    filterCallback: filterPointsFromGeoJson,
  })
)

// One file with all
overpassJsonToGeoJson({
  readFile: `${inputPath}/areaAll.json`,
  outputFolder: outputFolder,
  fileNamePart: "areaAll",
  filterCallback: filterPointsFromGeoJson,
})
