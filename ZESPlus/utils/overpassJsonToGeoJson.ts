import fs from "fs"
import osmtogeojson from "osmtogeojson"
import { writeFile } from "./writeFile"
import { addLenghtFromOverpassStatsResultToGeoJson } from "./transpose/addLenghtFromOverpassStatsResultToGeoJson"
import { addProcessingDateToGeoJson } from "./transpose/addProcessingDateToGeoJson"
import { FeatureCollection } from "./types"

type Props = {
  readFile: string
  outputFolder: string
  fileNamePart: string
  filterCallback?: (geoJson: FeatureCollection) => void
}

export const overpassJsonToGeoJson = ({
  readFile,
  outputFolder,
  fileNamePart,
  filterCallback,
}: Props) => {
  fs.readFile(readFile, "utf8", (err, _data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("transposeData()", "Parse, Transform, Enhance and Write file")

    const rawJsonData = JSON.parse(_data)
    const geoJsonData = osmtogeojson(rawJsonData)

    addLenghtFromOverpassStatsResultToGeoJson(rawJsonData, geoJsonData)
    addProcessingDateToGeoJson(geoJsonData)
    filterCallback && filterCallback(geoJsonData as FeatureCollection)

    writeFile({
      dataString: JSON.stringify(geoJsonData, null, 2),
      dataLength: geoJsonData.features.length,
      outputFolder: outputFolder,
      fileNamePart: fileNamePart,
      format: "geojson",
    })
  })
}
