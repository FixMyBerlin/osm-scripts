import { bboxGeojsonToOverpass } from "../../utils/overpassDownload"

export const areas = {}

export const bboxBetrachtungsraum = bboxGeojsonToOverpass([
  12.8633, 53.4984, 13.5838, 53.9388,
])

export const areaKeys = Object.keys(areas).map((areaKey) => areaKey)
export const areaValues = Object.keys(areas).map((areaKey) => areas[areaKey])
