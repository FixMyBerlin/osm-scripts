import { Feature } from "../../utils/types"
import { considerFeature } from "../filter/considerFeature"
import {
  TODO_fixSmoothnessValue,
  TODO_fixSurfaceValue,
  TODO_addMissingSmoothness,
  TODO_addMissingSurface,
} from "../filter/todos"
import { collectorPropArrayToString } from "./handleCollectorProp"
import { customPropsPerScope } from "./customPropsPerScope"

export const addCustomPropsSurfaceData = (feature: Feature) => {
  feature.properties["FMC:Category:SurfaceData"] = `${considerFeature(feature)}`

  customPropsPerScope(feature)
  collectorPropArrayToString(feature, "FMC:Category:SurfaceData:AllScopeValues")
  collectorPropArrayToString(
    feature,
    "FMC:Category:SurfaceData:AllSmoothnessValues"
  )

  const todoCategories = [
    TODO_addMissingSurface,
    TODO_addMissingSmoothness,
    TODO_fixSurfaceValue,
    TODO_fixSmoothnessValue,
  ]

  todoCategories.forEach((category) => {
    if (category(feature)) {
      feature.properties[
        `FMC:Category:SurfaceData:TODO:${category.name.replace("TODO_", "")}`
      ] = "true"
    }
  })
}
