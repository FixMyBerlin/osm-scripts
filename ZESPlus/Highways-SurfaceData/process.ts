import fs from "fs"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { cleanupDirectory } from "../utils/cleanupDirectory"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { FeatureCollection } from "../utils/types"
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

    filterAndWrite(irrelevanteWege, allHighways, outputFolder)

    filterAndWrite(smoothnessExcellent, allHighways, outputFolder)
    filterAndWrite(smoothnessGood, allHighways, outputFolder)
    filterAndWrite(smoothnessIntermediate, allHighways, outputFolder)
    filterAndWrite(smoothnessBad, allHighways, outputFolder)
    filterAndWrite(smoothnessVeryBad, allHighways, outputFolder)

    filterAndWrite(TODO_WegeOhneSurface, allHighways, outputFolder)
    filterAndWrite(
      TODO_WegeOhneSmoothnessAberMitSurface,
      allHighways,
      outputFolder
    )
    filterAndWrite(TODO_fixSmoothnessValues, allHighways, outputFolder)

    // Needs to be at the end of the list, since it checks all previously categorised highways
    filterAndWrite(
      TODO_filterLeftoverHighwaysToBeCheckedManually,
      allHighways,
      outputFolder
    )

    // We can use this list to add notes to the list output/TODO_featuresWithMultipleCategories.json
    const manualCheckList = [
      {
        "way/4929432": "Has multiple scopes",
      },
      {
        "way/8067760": "Has multiple scopes",
      },
      {
        "way/23707342": "Has multiple scopes",
      },
      {
        "way/123": "Test eines veralteten Eintrags",
      },
    ]

    checkIfHighwayIsInMultipleCategories(
      allHighways as FeatureCollection,
      outputFolder,
      manualCheckList
    )
  }
)
