import fs from "fs"
import { areaKeys } from "../../ZESPlus/AreaOfInterest/areas.constant"
import { enhanceDataWitAreaInformation } from "../Highways-PrepareData/2-transpose-highways/utils/enhanceDataWitAreaInformation"
import { addFilenameProperty } from "../transpose/addFilenameProperty"
import { addLinkProperties } from "../transpose/addLinkProperties"
import { processingDateProperty } from "../transpose/addProcessingDateProperty"
import { FeatureCollection } from "../types"
import { writeFile } from "../write/writeFile"
import { OverpassToGeoJson } from "./types"

export const overpassComposeToGeoJson = ({
  readFile,
  outputFolder,
  fileNamePart,
  filterCallback,
  areasForIntersection,
}: OverpassToGeoJson) => {
  fs.readFile(readFile, "utf8", (err, _data) => {
    if (err) {
      console.error("🧨", err)
      return
    }
    console.log(
      "overpassComposeToGeoJson()",
      "Parse, Transform, Enhance and Write file"
    )
    console.time(`⏱ overpassComposeToGeoJson(): Transform, enhance, write`)

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
          id: parseInt(element.id), // needs to be numeric due to https://github.com/mapbox/tippecanoe/issues/357
        }
      }),
    } as FeatureCollection

    // addProcessingDateProperty(geoJsonData.features) // Done via spread operator above
    addFilenameProperty(geoJsonData.features, fileNamePart)
    addLinkProperties(geoJsonData.features)
    filterCallback && filterCallback(geoJsonData)
    areasForIntersection &&
      Object.keys(areasForIntersection).length &&
      Object.entries(areasForIntersection).forEach(([areaKey, filePath]) =>
        enhanceDataWitAreaInformation(filePath, areaKey, geoJsonData)
      )

    writeFile({
      dataString: JSON.stringify(geoJsonData, null, 2),
      dataLength: geoJsonData.features.length,
      outputFolder: outputFolder,
      fileNamePart: fileNamePart,
      format: "geojson",
    })

    console.timeEnd(`⏱ overpassComposeToGeoJson(): Transform, enhance, write`)
  })
}
