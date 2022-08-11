import { bboxGeojsonToOverpass } from "../../utils/overpassDownload"

export const areas = {}

export const bboxBetrachtungsraum = bboxGeojsonToOverpass([
  8.9316, 48.8342, 9.3032, 49.0739,
])

export const areaKeys = Object.keys(areas).map((areaKey) => areaKey)
export const areaValues = Object.keys(areas).map((areaKey) => areas[areaKey])
