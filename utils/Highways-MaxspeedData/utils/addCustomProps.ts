import { Feature } from "../../types"
import { considerFeature } from "../filter/considerFeature"
import { addMaxspeedProperty } from "./addMaxspeedProperty"
import { addMaxspeedSourceProperty } from "./addMaxspeedSourceProperty"

export const addCustomPropsMaxSpeedData = (feature: Feature) => {
  feature.properties["FMC:Category:MaxspeedData"] = `${considerFeature(
    feature
  )}`

  addMaxspeedProperty(feature)
  addMaxspeedSourceProperty(feature)

  // const todoCategories = []

  // todoCategories.forEach((category) => {
  //   if (category(feature)) {
  //     feature.properties[
  //       `FMC:Category:MaxspeedData:TODO:${category.name.replace("TODO_", "")}`
  //     ] = "true"
  //   }
  // })
}
