import { Feature } from "../../types"
import {
  typAusserorts,
  typFreiGefuehrt,
  typHauptUndSammelstrasse,
  typWohnstrasse,
} from "../filter"
import {
  TODO_addIsSidepathTagging,
  TODO_addMissingSidewalkTagging,
  TODO_addSubtaggingOrAccessTagsToServiceWay,
  TODO_checkIfAreaHighwayHasSeparatelyMappedWays,
} from "../filter/todos"

export const addCustomPropsHighwayTypeData = (feature: Feature) => {
  const mainCategories = [
    typWohnstrasse,
    typHauptUndSammelstrasse,
    typAusserorts,
    typFreiGefuehrt,
  ]

  const categoryResults = mainCategories.map((category) => category(feature))
  const activateDataCategory = categoryResults.includes(true)

  feature.properties["FMC:Category:HighwayTypeData"] = `${activateDataCategory}`

  // Only show subProps if general Category is active
  if (activateDataCategory) {
    mainCategories.forEach((category) => {
      feature.properties[
        `FMC:Category:HighwayTypeData:${category.name}`
      ] = `${category(feature)}`
    })
  }

  const todoCategories = [
    TODO_addIsSidepathTagging,
    TODO_addMissingSidewalkTagging,
    TODO_addSubtaggingOrAccessTagsToServiceWay,
    TODO_checkIfAreaHighwayHasSeparatelyMappedWays,
  ]

  todoCategories.forEach((category) => {
    if (category(feature)) {
      feature.properties[
        `FMC:Category:HighwayTypeData:TODO:${category.name.replace(
          "TODO_",
          ""
        )}`
      ] = "true"
    }
  })
}
