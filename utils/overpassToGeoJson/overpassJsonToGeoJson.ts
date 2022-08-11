import fs from "fs"
import osmtogeojson from "osmtogeojson"
import { storeNumbersAsTypeofNumber } from "../transpose"
import { addFilenameProperty } from "../transpose/addFilenameProperty"
import { addLinkProperties } from "../transpose/addLinkProperties"
import { addProcessingDateProperty } from "../transpose/addProcessingDateProperty"
import { FeatureCollection } from "../types"
import { writeFile } from "../write/writeFile"
import { OverpassToGeoJson } from "./types"

export const overpassJsonToGeoJson = ({
  readFile,
  outputFolder,
  fileNamePart,
  filterCallback,
  addPropertiesCallback,
}: OverpassToGeoJson) => {
  fs.readFile(readFile, "utf8", (err, rawData) => {
    if (err) {
      console.error("🧨", err)
      return
    }
    console.log(
      "overpassJsonToGeoJson():",
      "Parse, Transform, Enhance and Write file"
    )

    const rawJsonData = JSON.parse(rawData)
    const geoJsonData = osmtogeojson(rawJsonData) as FeatureCollection

    storeNumbersAsTypeofNumber(geoJsonData.features)
    addProcessingDateProperty(geoJsonData.features)
    addFilenameProperty(geoJsonData.features, fileNamePart)
    addLinkProperties(geoJsonData.features)
    filterCallback && filterCallback(geoJsonData)
    addPropertiesCallback && addPropertiesCallback(geoJsonData)

    writeFile({
      dataString: JSON.stringify(geoJsonData, null, 2),
      dataLength: geoJsonData.features.length,
      outputFolder: outputFolder,
      fileNamePart: fileNamePart,
      format: "geojson",
    })
  })
}
