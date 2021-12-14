import { leftOverHighwaysGrouped } from "./collectLeftOverHighways"
import { writeFile } from "./writeFile"

type FeaturesToCheckEntryProps = {
  categories: string[]
  todo?: string
  url?: string
  manualCheck?: string
}
type FeaturesToCheckProps = {
  [key: string]: FeaturesToCheckEntryProps
}

// const extractSafeList = (allHighways: FeatureCollection) => {
//   const saveList = allHighways.features
//     .filter((feature) => {
//       const rawScopes = (feature.properties["FMC:appliedScopes"] ||
//         []) as string[]
//       const scopes = rawScopes.filter(
//         (item, pos, self) => self.indexOf(item) == pos
//       )
//       return scopes.length > 1
//     })
//     .map((feature) => feature.id)
//
//   return saveList
// }

// Dopplungen prüfen
export const checkIfHighwayIsInMultipleCategories = (
  allHighways: FeatureCollection,
  outputFolder: string,
  manualCheckList?: object[]
) => {
  // Re-Map data: All categories of a featureId
  const featureIdToCategory = {}
  // console.log(leftOverHighwaysGrouped)
  Object.keys(leftOverHighwaysGrouped).forEach((category) => {
    leftOverHighwaysGrouped[category].forEach((featureId) => {
      featureIdToCategory[featureId] = [
        ...(featureIdToCategory[featureId] || []),
        category,
      ]
    })
  })

  // Filter: Include only features with multiple categories
  const featureIdsWithMultipleCategories = Object.keys(
    featureIdToCategory
  ).filter((featureIds) => featureIdToCategory[featureIds].length > 1)

  // Filter: Include only features that are not on our savelist
  // TODO: This is not working, yet
  const featureIdsWithMultipleCategoriesWithoutSaveList =
    featureIdsWithMultipleCategories
  // const saveList = extractSafeList(allHighways)
  // const featureIdsWithMultipleCategoriesWithoutSaveList = Object.keys(
  //   featureIdToCategory
  // ).filter(
  //   (featureId) =>
  //     !saveList.includes(featureIdToCategory[featureId])
  // )

  // TODO fix TS with something FeaturesToCheckEntryProps
  const featuresToCheck: any = Object.fromEntries(
    featureIdsWithMultipleCategoriesWithoutSaveList.map((featureId) => [
      featureId,
      {
        categories: filteredHighwayFeatureIdsWithCategories[featureId],
        url: `https://www.openstreetmap.org/${featureId}`,
      },
    ])
  )

  // Mark those that are fine
  manualCheckList &&
    manualCheckList.forEach((line) => {
      const lineKey = Object.keys(line)[0] // 'way/123'

      if (featuresToCheck[lineKey]) {
        featuresToCheck[lineKey]["manualCheck"] = line[lineKey]
      } else {
        // Make sure we know what to cleanup from the manualCheckList
        featuresToCheck[lineKey] = {
          todo: "Remove from manualCheckList",
          manualCheck: line[lineKey],
        }
      }
    })

  writeFile({
    dataString: JSON.stringify(featuresToCheck, null, 2),
    dataLength: Object.keys(featuresToCheck).length,
    outputFolder: outputFolder,
    fileNamePart: "TODO_featuresWithMultipleCategories",
    format: "json",
  })
  console.error("featuresWithMultipleCategories", featuresToCheck)
}
