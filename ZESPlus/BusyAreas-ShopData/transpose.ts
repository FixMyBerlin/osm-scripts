import { overpassJsonToGeoJson } from "../utils/overpassToGeoJson/overpassJsonToGeoJson"
import { categories } from "./utils/shopCategories.const"

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
      "addCategoryProperty()",
      "Missing category for",
      feature.properties?.amenity
    )
    return
  })
}

overpassJsonToGeoJson({
  readFile: "./ZESPlus/BusyAreas-ShopData/output/raw/shops.json",
  outputFolder: "./ZESPlus/BusyAreas-ShopData/output/",
  fileNamePart: "shops",
  addPropertiesCallback: addCategoryProperty,
})
