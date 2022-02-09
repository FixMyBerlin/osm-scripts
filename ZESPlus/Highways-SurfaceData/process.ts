import fs from "fs"
import { cleanupDirectory } from "../utils/cleanupDirectory"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { Feature, FeatureCollection } from "../utils/types"
import { writeGeoJson } from "../utils/writeGeoJson"
import { irrelevanteWege } from "./filter/irrelevanteWege"
import {
  smoothnessBad,
  smoothnessExcellent,
  smoothnessGood,
  smoothnessIntermediate,
  smoothnessVeryBad,
} from "./filter/smoothnessCategories"
import {
  TODO_fixSmoothnessValues,
  TODO_fixSurfaceValues,
  TODO_WegeOhneSmoothnessAberMitSurface,
  TODO_WegeOhneSurface,
} from "./filter/todos"

const outputFolder = "./ZESPlus/Highways-SurfaceData/output/"

fs.readFile(
  "./ZESPlus/Highways-PrepareData/2-transpose-highways/osmHighwaysUnclipped.geojson",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    cleanupDirectory(outputFolder)

    const allHighways: FeatureCollection = JSON.parse(data)
    const collectedHighways: Feature[] = []

    filterAndWrite(irrelevanteWege, allHighways, outputFolder)

    filterAndWrite(
      smoothnessExcellent,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(smoothnessGood, allHighways, outputFolder, collectedHighways)
    filterAndWrite(
      smoothnessIntermediate,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(smoothnessBad, allHighways, outputFolder, collectedHighways)
    filterAndWrite(
      smoothnessVeryBad,
      allHighways,
      outputFolder,
      collectedHighways
    )

    filterAndWrite(TODO_WegeOhneSurface, allHighways, outputFolder)
    filterAndWrite(
      TODO_WegeOhneSmoothnessAberMitSurface,
      allHighways,
      outputFolder
    )
    filterAndWrite(TODO_fixSurfaceValues, allHighways, outputFolder)
    filterAndWrite(TODO_fixSmoothnessValues, allHighways, outputFolder)

    // Needs to be at the end of the list, since it checks all previously categorised highways
    if (process.env.SKIP_LEFTOVER_CHECK !== "true") {
      filterAndWrite(
        TODO_filterLeftoverHighwaysToBeCheckedManually,
        allHighways,
        outputFolder
      )
    }

    // For this process, the list it not very usefull until we fix `checkIfHighwayIsInMultipleCategories`.
    // We can use this list to add notes to the list output/TODO_featuresWithMultipleCategories.json
    // const manualCheckList = [
    //   {
    //     "way/4929432": "Has multiple scopes",
    //   },
    //   {
    //     "way/8067760": "Has multiple scopes",
    //   },
    //   {
    //     "way/23707342": "Has multiple scopes",
    //   },
    //   {
    //     "way/123": "Test eines veralteten Eintrags",
    //   },
    // ]

    // checkIfHighwayIsInMultipleCategories(
    //   allHighways as FeatureCollection,
    //   outputFolder,
    //   manualCheckList
    // )

    writeGeoJson({
      data: collectedHighways,
      folder: outputFolder,
      fileNamePart: "collectedHighways",
    })
  }
)
