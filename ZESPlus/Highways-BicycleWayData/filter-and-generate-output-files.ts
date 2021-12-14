import fs from "fs"
import { checkIfHighwayIsInMultipleCategories } from "../utils/checkIfHighwayIsInMultipleCategories"
import { filterAndWrite } from "../utils/filterAndWrite"
import { fahrradstraße } from "./filter/fahrradstraße"
import { fussgaengerzonenWegFahrradFrei } from "./filter/fussgaengerzonenWegFahrradFrei"
import { gehUndRadwegGemeinsam } from "./filter/gehUndRadwegGemeinsam"
import { gehUndRadwegGetrennt } from "./filter/gehUndRadwegGetrennt"
import { gehwegRadfarerFrei } from "./filter/gehwegRadfarerFrei"
import { irrelevanteWege } from "./filter/irrelevanteWege"
import { radfahrstreifen } from "./filter/radfahrstreifen"
import { radwegBaulichAbgesetzt } from "./filter/radwegBaulichAbgesetzt"
import { stufen } from "./filter/stufen"
import {
  TODO_FahrradFrei_CheckTagging,
  TODO_FussgaengerzonenWeg_AccessPruefen,
  TODO_RadwegUnspezifisch,
  TODO_VerkehrsberuhigterBereich_AccessPruefen,
} from "./filter/todos"
import { verkehrsberuhigterBereichMitFahrradFrei } from "./filter/verkehrsberuhigterBereichMitFahrradFrei"
import { TODO_filterLeftoverHighwaysToBeCheckedManually } from "../utils/filterLeftoverHighwaysToBeCheckedManually"
import { FeatureCollection } from "../utils/types"

const outputFolder = "./ZESPlus/Highways-BicycleWayData/output/"

fs.readFile(
  "./ZESPlus/Highways-PrepareData/2-transpose-highways/osmHighwaysUnclipped.geojson",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const allHighways: FeatureCollection = JSON.parse(data)

    filterAndWrite(irrelevanteWege, allHighways, outputFolder)
    filterAndWrite(stufen, allHighways, outputFolder)
    filterAndWrite(
      verkehrsberuhigterBereichMitFahrradFrei,
      allHighways,
      outputFolder
    )
    filterAndWrite(fussgaengerzonenWegFahrradFrei, allHighways, outputFolder)
    filterAndWrite(gehwegRadfarerFrei, allHighways, outputFolder)
    filterAndWrite(gehUndRadwegGemeinsam, allHighways, outputFolder)
    filterAndWrite(gehUndRadwegGetrennt, allHighways, outputFolder)
    filterAndWrite(TODO_RadwegUnspezifisch, allHighways, outputFolder)
    filterAndWrite(fahrradstraße, allHighways, outputFolder)
    filterAndWrite(radwegBaulichAbgesetzt, allHighways, outputFolder)
    filterAndWrite(radfahrstreifen, allHighways, outputFolder)

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
      TODO_filterLeftoverHighwaysToBeCheckedManually,
      allHighways,
      outputFolder
    )

    // We can use this list to add notes to the list output/TODO_featuresWithMultipleCategories.json
    const manualCheckList = [
      {
        "way/627588107":
          "Zu Recht: cycleway:right=track + sidewalk:left:bicycle=yes(+ traffic_sign)",
      },
      {
        "way/40375021": "Tagging fehler, siehe Checker",
      },
      {
        "way/123": "Test eines veralteten Eintrags",
      },
    ]

    checkIfHighwayIsInMultipleCategories(outputFolder, manualCheckList)
  }
)
