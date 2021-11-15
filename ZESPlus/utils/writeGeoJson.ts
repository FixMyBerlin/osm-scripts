import { writeFile } from "./writeFile"

type Props = { data: object[]; folder: string; fileNamePart: string }

export const writeGeoJson = ({ data, folder, fileNamePart }: Props) => {
  const geoJsonString = JSON.stringify(
    {
      type: "FeatureCollection",
      features: data,
    },
    null,
    2
  )

  writeFile({
    dataString: geoJsonString,
    outputFolder: folder,
    dataLength: data.length,
    fileNamePart: fileNamePart,
    format: "geojson",
  })
}
