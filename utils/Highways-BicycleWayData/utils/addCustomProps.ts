import { Feature } from "../../types"
import {
  considerFeature,
  stufen,
  fussgaengerzonenWegFahrradFrei,
  gehUndRadwegGemeinsam,
  gehUndRadwegGetrennt,
  gehwegRadfarerFrei,
  radwegBaulichAbgesetzt,
  radwegFreiGefuehrt,
  radwegVerbindungsstueck,
  verkehrsberuhigterBereichMitFahrradFrei,
} from "../filter"
import {
  TODO_RadwegUnspezifisch,
  TODO_FussgaengerzonenWeg_AccessPruefen,
  TODO_FahrradFrei_CheckTagging,
  TODO_VerkehrsberuhigterBereich_AccessPruefen,
  TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist,
} from "../filter/todos"

export const addCustomPropsBicycleWayData = (feature: Feature) => {
  const mainCategories = [
    stufen,
    fussgaengerzonenWegFahrradFrei,
    gehUndRadwegGemeinsam,
    gehUndRadwegGetrennt,
    gehwegRadfarerFrei,
    radwegBaulichAbgesetzt,
    radwegFreiGefuehrt,
    radwegVerbindungsstueck,
    verkehrsberuhigterBereichMitFahrradFrei,
  ]

  const categoryResults = mainCategories.map((category) => category(feature))
  const activateDataCategory = categoryResults.includes(true)

  feature.properties["FMC:Category:BicycleWayData"] = `${activateDataCategory}`

  // Only show subProps if general Category is active
  if (activateDataCategory) {
    mainCategories.forEach((category) => {
      feature.properties[
        `FMC:Category:BicycleWayData:${category.name}`
      ] = `${category(feature)}`
    })
  }

  const todoCategories = [
    TODO_RadwegUnspezifisch,
    TODO_FussgaengerzonenWeg_AccessPruefen,
    TODO_FahrradFrei_CheckTagging,
    TODO_VerkehrsberuhigterBereich_AccessPruefen,
    TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist,
  ]

  todoCategories.forEach((category) => {
    if (category(feature)) {
      feature.properties[
        `FMC:Category:BicycleWayData:TODO:${category.name.replace("TODO_", "")}`
      ] = "true"
    }
  })
}
