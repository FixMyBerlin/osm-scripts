import { FeatureCollection } from "../types"
import { writeFile } from "./writeFile"

type Props = {
  geoJsonData: FeatureCollection
  folder: string
  fileNamePart: string
}

export const writeGeoJson = ({ geoJsonData, folder, fileNamePart }: Props) => {
  writeFile({
    dataString: JSON.stringify(geoJsonData, null, 2),
    outputFolder: folder,
    dataLength: geoJsonData.features.length,
    fileNamePart: fileNamePart,
    format: "geojson",
  })
}
