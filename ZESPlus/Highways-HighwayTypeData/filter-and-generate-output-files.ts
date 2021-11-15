import fs from "fs"
import { irrelevanteWege } from "./filter/irrelevanteWege"
import {
  TODO_AreaWegePruefenObRelevantGgfVerbindungenEinfuegen,
  TODO_BuergersteigTaggingFehlt,
} from "./filter/todos"
import { typAusserorts } from "./filter/typAusserorts"
import { typFreiGefuehrt } from "./filter/typFreiGefuehrt"
import { typHauptUndSammelstrasse } from "./filter/typHauptUndSammelstrasse"
import { typSchnellstrassen } from "./filter/typSchnellstrassen"
import { typWohnstrasse } from "./filter/typWohnstrasse"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"

let allHighways: any = {}
const outputFolder = "./ZESPlus/Highways-HighwayTypeData/output/"

fs.readFile(
  "./ZESPlus/Highways-PrepareData/2-transpose-highways/osmHighwaysUnclipped.geojson",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    allHighways = JSON.parse(data)

    filterAndWrite(irrelevanteWege, allHighways, outputFolder)

    filterAndWrite(typWohnstrasse, allHighways, outputFolder)
    filterAndWrite(typHauptUndSammelstrasse, allHighways, outputFolder)
    filterAndWrite(typAusserorts, allHighways, outputFolder)
    filterAndWrite(typFreiGefuehrt, allHighways, outputFolder)
    filterAndWrite(typSchnellstrassen, allHighways, outputFolder)

    filterAndWrite(
      TODO_filterLeftoverHighwaysToBeCheckedManually,
      allHighways,
      outputFolder
    )
    filterAndWrite(TODO_BuergersteigTaggingFehlt, allHighways, outputFolder)
    filterAndWrite(
      TODO_AreaWegePruefenObRelevantGgfVerbindungenEinfuegen,
      allHighways,
      outputFolder
    )

    checkIfHighwayIsInMultipleCategories(outputFolder)
  }
)
