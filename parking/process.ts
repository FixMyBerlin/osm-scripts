import fs from "fs"
import { filterAndWrite } from "./utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../ZESPlus/utils/filterLeftoverHighwaysToBeCheckedManually"
import { FeatureCollection } from "../ZESPlus/utils/types"
import { writeFile } from "../ZESPlus/utils/writeFile"
import { osmHighwaysUnclipped, outputFolder } from "./files.const"
import { parkingLanePosition, parkingLaneTagging } from "./filter"

// Different thinks are happen here.
// It creates (filter+write) the specified files.
// It collects length info on those files and on the totalLength
//   and writes this to a json file as well.
fs.readFile(osmHighwaysUnclipped, "utf8", (err, data) => {
  if (err) {
    console.error("🧨", err)
    return
  }
  console.time("⏱ parking/process.ts")

  const allHighways: FeatureCollection = JSON.parse(data)

  const totalLength = allHighways.features
    .reduce(
      (partialSum, feature) =>
        partialSum + parseFloat(feature.properties["FMC:length"]),
      0
    )
    .toFixed(2)

  const parkingLaneTaggingLength = filterAndWrite(
    parkingLaneTagging,
    allHighways,
    outputFolder
  )
  const parkingLanePositionLength = filterAndWrite(
    parkingLanePosition,
    allHighways,
    outputFolder
  )

  // Needs to be at the end of the list, since it checks all previously categorised highways
  if (process.env.SKIP_LEFTOVER_CHECK !== "true") {
    filterAndWrite(
      TODO_filterLeftoverHighwaysToBeCheckedManually,
      allHighways,
      outputFolder
    )
  }

  const length = {
    totalLength,
    parkingLaneTaggingLength,
    parkingLanePositionLength,
  }

  writeFile({
    dataString: JSON.stringify(length, null, 2),
    dataLength: Object.keys(length).length,
    outputFolder: outputFolder,
    fileNamePart: "lengthStats",
    format: "json",
  })

  console.timeEnd("⏱ parking/process.ts")
})
