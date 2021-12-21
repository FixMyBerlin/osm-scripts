// TODO: This does not work, yet. We need to rework it so it does not use a bbox anymore.
import fetch from "node-fetch"

// https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A(+%0A++area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Zeuthen%22%5D%3B%0A++area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Eichwalde%22%5D%3B%0A++area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Schulzendorf%22%5D%3B%0A)-%3E.searchArea%3B%0A(%0A++way%5B%22highway%22%5D(area.searchArea)%3B%0A)%3B%0Aout+body%3B%0A%3E%3B%0Aout+skel+qt%3B%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A
const queryBbox =
  "52.32400930869265,13.57884407043457,52.35893342602915,13.645019531249998"
const baseUrl = "https://overpass-api.de/api/interpreter"
const overpassQuery = `[out:json][timeout:10];(way["highway"](${queryBbox}););out body geom;`
const overpassUrl = `${baseUrl}?data=${encodeURIComponent(overpassQuery)}`

const getData = async () => {
  await fetch(overpassUrl)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}
getData()
