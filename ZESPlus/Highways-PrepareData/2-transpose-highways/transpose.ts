import fs from "fs"
import osmtogeojson from "osmtogeojson"
import { writeFile } from "../../utils/writeFile"
import { addLenghtFromOverpassStatsResultToGeoJson } from "./utils/addLenghtFromOverpassStatsResultToGeoJson"

const outputFolder = "./ZESPlus/Highways-PrepareData/2-transpose-highways/"

fs.readFile(
  "./ZESPlus/Highways-PrepareData/1-download-highways/osmRawHighways.json",
  "utf8",
  (err, _data) => {
    if (err) {
      console.error(err)
      return
    }

    const rawJsonData = JSON.parse(_data)
    const geoJsonData = osmtogeojson(rawJsonData)

    addLenghtFromOverpassStatsResultToGeoJson(rawJsonData, geoJsonData)

    writeFile({
      dataString: JSON.stringify(geoJsonData, null, 2),
      dataLength: geoJsonData.features.length,
      outputFolder: outputFolder,
      fileNamePart: "osmHighwaysUnclipped",
      format: "geojson",
    })
  }
)
