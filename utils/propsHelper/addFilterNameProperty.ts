import { Feature } from "../types"

export const addCategoryProperty = (
  features: Feature[],
  filterMethodName: string
) => {
  features.forEach((feature) => {
    feature.properties[`FMC:Category:${filterMethodName}`] = "true"
  })
}
