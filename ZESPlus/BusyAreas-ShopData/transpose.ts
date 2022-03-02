import { overpassJsonToGeoJson } from "../utils/overpassToGeoJson/overpassJsonToGeoJson"

// Source: https://docs.google.com/spreadsheets/d/1YekkPvujoGQoNO9izg2wRyFql2nTZzKfXzhAUMWwDys/edit#gid=372987930
const categories = {
  arts_centre: "Freizeit",
  artwork: "Freizeit",
  attraction: "Freizeit",
  bakery: "Einkauf",
  bank: "Besorgungen",
  bar: "Freizeit",
  beauty_shop: "Einkauf",
  beverages: "Einkauf",
  bicycle_rental: "Freizeit",
  bicycle_shop: "Einkauf",
  biergarten: "Freizeit",
  boat_rental: "Freizeit",
  boat_storage: "Freizeit",
  boathouse: "Freizeit",
  bookshop: "Einkauf",
  butcher: "Einkauf",
  cafe: "Freizeit",
  camp_site: "Freizeit",
  car_dealership: "Einkauf",
  car_rental: "Einkauf",
  car_wash: "Einkauf",
  caravan_site: "Freizeit",
  chalet: "Freizeit",
  chemist: "Einkauf",
  childcare: "Bildung",
  cinema: "Freizeit",
  clinic: "Besorgungen",
  clothes: "Einkauf",
  college: "Bildung",
  comms_tower: "Freizeit",
  community_centre: "Freizeit",
  computer_shop: "Einkauf",
  convenience: "Einkauf",
  courthouse: "Besorgungen",
  deli: "Einkauf",
  dentist: "Besorgungen",
  department_store: "Einkauf",
  doctors: "Besorgungen",
  doityourself: "Einkauf",
  emergency_service: "Besorgungen",
  events_venue: "Freizeit",
  exhibition_centre: "Freizeit",
  fast_food: "Freizeit",
  florist: "Einkauf",
  fuel: "Einkauf",
  furniture_shop: "Einkauf",
  garden_centre: "Einkauf",
  gift_shop: "Einkauf",
  greengrocer: "Einkauf",
  guesthouse: "Freizeit",
  hairdresser: "Einkauf",
  hospital: "Besorgungen",
  hostel: "Freizeit",
  hotel: "Freizeit",
  jeweller: "Einkauf",
  kindergarten: "Bildung",
  kiosk: "Einkauf",
  laundry: "Einkauf",
  library: "Besorgungen",
  marketplace: "Besorgungen",
  memorial: "Freizeit",
  mobile_phone_shop: "Einkauf",
  motel: "Freizeit",
  museum: "Freizeit",
  music_school: "Bildung",
  newsagent: "Einkauf",
  nightclub: "Freizeit",
  optician: "Einkauf",
  outdoor_shop: "Einkauf",
  pharmacy: "Einkauf",
  picnic_site: "Freizeit",
  place_of_worship: "Freizeit",
  playground: "Freizeit",
  post_depot: "Besorgungen",
  post_office: "Besorgungen",
  prison: "Besorgungen",
  pub: "Freizeit",
  research_institute: "Bildung",
  restaurant: "Freizeit",
  ruins: "Freizeit",
  school: "Bildung",
  shoe_shop: "Einkauf",
  social_facility: "Besorgungen",
  sports_centre: "Freizeit",
  sports_shop: "Einkauf",
  stadium: "Freizeit",
  supermarket: "Einkauf",
  swimming_pool: "Freizeit",
  theatre: "Freizeit",
  theme_park: "Freizeit",
  tourist_info: "Freizeit",
  tower: "Freizeit",
  town_hall: "Besorgungen",
  townhall: "Besorgungen",
  toy_shop: "Einkauf",
  travel_agent: "Einkauf",
  university: "Bildung",
  vehicle_inspection: "Einkauf",
  vending_any: "Einkauf",
  vending_cigarette: "Einkauf",
  vending_machine: "Einkauf",
  veterinary: "Besorgungen",
  video_shop: "Einkauf",
  viewpoint: "Freizeit",
  water_well: "Freizeit",
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
