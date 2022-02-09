import fs from "fs"
import { areaKeys } from "../../AreaOfInterest/areas.constant"
import { addLinkProperties } from "../transpose/addLinkProperties"
import { processingDateProperty } from "../transpose/addProcessingDateProperty"
import { FeatureCollection } from "../types"
import { writeFile } from "../writeFile"
import { OverpassToGeoJson } from "./types"

export const overpassComposeToGeoJson = ({
  readFile,
  outputFolder,
  fileNamePart,
  filterCallback,
  areaCallback,
}: OverpassToGeoJson) => {
  fs.readFile(readFile, "utf8", (err, _data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(
      "overpassComposeToGeoJson()",
      "Parse, Transform, Enhance and Write file"
    )
    console.time(`overpassComposeToGeoJson(): Transform, enhance, write`)

    const rawJsonData = JSON.parse(_data)
    const geoJsonData = {
      type: "FeatureCollection",
      generator: rawJsonData.generator,
      copyright: rawJsonData.osm3s.copyright,
      timestamp: rawJsonData.osm3s.timestamp_osm_base,
      features: rawJsonData.elements.map((element) => {
        // `__type` is a helper that we add in `1-download-highways/download.ts` > `compose``
        // to re-generate the full GeoJSON osmId. Afterwards, we can clean it up.
        const osmId = `${element.tags.__type}/${element.id}`
        delete element.tags.__type

        return {
          type: "Feature",
          properties: {
            "@id": osmId,
            ...element.tags,
            ...processingDateProperty,
          },
          geometry: element.geometry,
          id: osmId,
        }
      }),
    } as FeatureCollection

    // addProcessingDateProperty(geoJsonData.features) // Done via spread operator above
    addLinkProperties(geoJsonData.features)
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

    console.timeEnd(`overpassComposeToGeoJson(): Transform, enhance, write`)
  })
}
