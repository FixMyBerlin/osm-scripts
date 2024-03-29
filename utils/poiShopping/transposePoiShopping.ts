import { cleanupPropsFromPoiPoints } from "../propsHelper"
import { overpassJsonToGeoJson } from "../overpassToGeoJson"
import { categories } from "./utils/shopCategories.const"

export const transposePoiShopping = ({ inputFile, outputFolder }) => {
  const categoriseAndCleanup = (geoJson) => {
    addCategoryProperty(geoJson)
    cleanupPropsFromPoiPoints(geoJson)
  }

  const addCategoryProperty = (geoJson) => {
    const categoryKeys = Object.keys(categories).map((key) => key)

    geoJson.features.map((feature) => {
      // All shop=* are category "Einkauf"
      if (feature.properties?.shop) {
        feature.properties["FMC:ShopCategory"] = "Einkauf"
        return
      }

      // All amenity=* (that we include in the query) are categorized via our custom list.
      if (categoryKeys.includes(feature.properties?.amenity)) {
        feature.properties["FMC:ShopCategory"] =
          categories[feature.properties.amenity]
        return
      }

      // Everything else is undefined, yet
      feature.properties["FMC:ShopCategory"] = "No category specified"
      console.error(
        "👉 addCategoryProperty():",
        "Missing category for",
        feature.properties?.amenity
      )
      return
    })
  }

  overpassJsonToGeoJson({
    readFile: inputFile,
    outputFolder,
    fileNamePart: "poiShopping",
    addPropertiesCallback: categoriseAndCleanup,
  })
}
