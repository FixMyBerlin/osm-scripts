import fs from "fs"
import https from "https"

// https://overpass.kumi.systems/api/convert?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A(%0A%20%20area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Zeuthen%22%5D%3B%0A%20%20area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Eichwalde%22%5D%3B%0A%20%20area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Schulzendorf%22%5D%3B%0A%20%20area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Wildau%22%5D%3B%0A%20%20area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22K%C3%B6nigs%20Wusterhausen%22%5D%3B%0A%20%20area%5B%22boundary%22%3D%22administrative%22%5D%5B%22admin_level%22%3D%228%22%5D%5B%22name%22%3D%22Sch%C3%B6nefeld%22%5D%3B%0A)-%3E.searchArea%3B%0A(%0A%20%20way%5B%22highway%22%5D(area.searchArea)%3B%0A)%3B%0Aout%20geom%3B%0Amake%20stat%20total_length%3Dsum(length())%2Cway_id_length%3Dset(type()%20%2B%20%22%2F%22%20%2B%20id()%20%2B%20%22%3A%22%20%2B%20length())%3B%0Aout%3B&target=mapql
// const baseUrl = "https://overpass.kumi.systems/api/interpreter"
const baseUrl = "https://overpass.kumi.systems/api/interpreter"
const overpassQuery = `
[out:json][timeout:25];
(
  area["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"];
)->.searchArea;
(
  way["highway"](area.searchArea);
);
out geom;
make stat total_length=sum(length()),way_id_length=set(type() + "/" + id() + ":" + length());
out;
`
const overpassUrl = `${baseUrl}?data=${encodeURIComponent(overpassQuery)}`

export const downloadData = () => {
  console.log("downloadData()", "Overpass Query:", overpassQuery)

  const file = fs.createWriteStream(
    "./ZESPlus/Highways-PrepareData/1-download-highways/osmRawHighways.json"
  )

  https
    .get(overpassUrl, (response) => {
      console.log("downloadData()", "Response StatusCode:", response.statusCode)

      response.pipe(file)
    })
    .on("error", (error) => {
      console.error("downloadData()", "Response Status Code:", error)
    })
}

downloadData()
