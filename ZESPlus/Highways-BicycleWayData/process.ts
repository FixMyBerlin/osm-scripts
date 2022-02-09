import fs from "fs"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { cleanupOutputFolder } from "../utils/cleanupOutputFolder"
import { filterAndWrite } from "../utils/filterAndWrite"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { Feature, FeatureCollection } from "../utils/types"
import { writeGeoJson } from "../utils/writeGeoJson"
import { fahrradstrasse } from "./filter/fahrradstr"
import { fussgaengerzonenWegFahrradFrei } from "./filter/fussgaengerzonenWegFahrradFrei"
import { gehUndRadwegGemeinsam } from "./filter/gehUndRadwegGemeinsam"
import { gehUndRadwegGetrennt } from "./filter/gehUndRadwegGetrennt"
import { gehwegRadfarerFrei } from "./filter/gehwegRadfarerFrei"
import { irrelevanteWege } from "./filter/irrelevanteWege"
import { radfahrstreifen } from "./filter/radfahrstreifen"
import { radwegBaulichAbgesetzt } from "./filter/radwegBaulichAbgesetzt"
import { radwegFreiGefuehrt } from "./filter/radwegFreiGefuehrt"
import { radwegVerbindungsstueck } from "./filter/radwegVerbindungsstueck"
import { stufen } from "./filter/stufen"
import {
  TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist,
  TODO_FahrradFrei_CheckTagging,
  TODO_FussgaengerzonenWeg_AccessPruefen,
  TODO_RadwegUnspezifisch,
  TODO_VerkehrsberuhigterBereich_AccessPruefen,
} from "./filter/todos"
import { verkehrsberuhigterBereichMitFahrradFrei } from "./filter/verkehrsberuhigterBereichMitFahrradFrei"

const outputFolder = "./ZESPlus/Highways-BicycleWayData/output/"

fs.readFile(
  "./ZESPlus/Highways-PrepareData/2-transpose-highways/osmHighwaysUnclipped.geojson",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    // cleanupOutputFolder(outputFolder)

    const allHighways: FeatureCollection = JSON.parse(data)
    const collectedHighways: Feature[] = []

    filterAndWrite(irrelevanteWege, allHighways, outputFolder)
    filterAndWrite(stufen, allHighways, outputFolder, collectedHighways)
    filterAndWrite(
      verkehrsberuhigterBereichMitFahrradFrei,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(
      fussgaengerzonenWegFahrradFrei,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(
      gehwegRadfarerFrei,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(
      gehUndRadwegGemeinsam,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(
      gehUndRadwegGetrennt,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(fahrradstrasse, allHighways, outputFolder, collectedHighways)
    filterAndWrite(
      radwegBaulichAbgesetzt,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(
      radwegFreiGefuehrt,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(
      radwegVerbindungsstueck,
      allHighways,
      outputFolder,
      collectedHighways
    )
    filterAndWrite(
      radfahrstreifen,
      allHighways,
      outputFolder,
      collectedHighways
    )

    filterAndWrite(TODO_RadwegUnspezifisch, allHighways, outputFolder)
    filterAndWrite(
      TODO_FussgaengerzonenWeg_AccessPruefen,
      allHighways,
      outputFolder
    )
    filterAndWrite(TODO_FahrradFrei_CheckTagging, allHighways, outputFolder)
    filterAndWrite(
      TODO_VerkehrsberuhigterBereich_AccessPruefen,
      allHighways,
      outputFolder
    )
    filterAndWrite(
      TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist,
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

    // We can use this list to add notes to the list output/TODO_featuresWithMultipleCategories.json
    const manualCheckList = [
      {
        "way/123": "Test eines veralteten Eintrags",
      },
    ]

    checkIfHighwayIsInMultipleCategories(
      allHighways,
      outputFolder,
      manualCheckList
    )

    writeGeoJson({
      data: collectedHighways,
      folder: outputFolder,
      fileNamePart: "collectedHighways",
    })
  }
)
