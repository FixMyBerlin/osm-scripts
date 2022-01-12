import { overpassDownloadJson } from "../utils/overpassDownloadJson"
import { areaKeys, areas, areaValues } from "./areas.constant"

const downloadAreaOfInterestBorder = (
  areaNames: string[],
  fileName: string
) => {
  const overpassQuery = `
[out:json][timeout:25];
(
  ${areaNames
    .map(
      (areaName) =>
        `relation["boundary"="administrative"]["admin_level"="8"]["name"="${areaName}"];`
    )
    .join("\n")}
);
out body;>;out skel qt;
`

  overpassDownloadJson({
    query: overpassQuery,
    outputFolder: "./ZESPlus/AreaOfInterest/output/raw",
    fileName: fileName,
  })
}

// One file forEach
areaKeys.map((areaKey) =>
  downloadAreaOfInterestBorder([areas[areaKey]], areaKey)
)

// One file with all
downloadAreaOfInterestBorder(areaValues, "areaAll")
