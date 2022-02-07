import fs from "fs"
import osmtogeojson from "osmtogeojson"
import { areaKeys } from "../AreaOfInterest/areas.constant"
import { addLenghtFromOverpassStatsResultToGeoJson } from "./transpose/addLenghtFromOverpassStatsResultToGeoJson"
import { addProcessingDateToGeoJson } from "./transpose/addProcessingDateToGeoJson"
import { FeatureCollection } from "./types"
import { writeFile } from "./writeFile"

export type AreaCallbackProps = (
  areaKey: string,
  geoJson: FeatureCollection
) => void

type Props = {
  readFile: string
  outputFolder: string
  fileNamePart: string
  filterCallback?: (geoJson: FeatureCollection) => void
  areaCallback?: AreaCallbackProps
}

export const overpassJsonToGeoJson = ({
  readFile,
  outputFolder,
  fileNamePart,
  filterCallback,
  areaCallback,
}: Props) => {
  fs.readFile(readFile, "utf8", (err, _data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("transposeData()", "Parse, Transform, Enhance and Write file")

    const rawJsonData = JSON.parse(_data)
    const geoJsonData = osmtogeojson(rawJsonData) as FeatureCollection

    addLenghtFromOverpassStatsResultToGeoJson(rawJsonData, geoJsonData)
    addProcessingDateToGeoJson(geoJsonData)
    filterCallback && filterCallback(geoJsonData)
    areaCallback &&
      areaKeys.forEach((areaKey) => areaCallback(areaKey, geoJsonData))

    writeFile({
      dataString: JSON.stringify(geoJsonData, null, 2),
      dataLength: geoJsonData.features.length,
      outputFolder: outputFolder,
      fileNamePart: fileNamePart,
      format: "geojson",
    })
  })
}
