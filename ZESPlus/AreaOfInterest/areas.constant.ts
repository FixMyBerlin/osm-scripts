export const areas = {
  Zeuthen: "Zeuthen",
  Eichwalde: "Eichwalde",
  Schulzendorf: "Schulzendorf",
  Wildau: "Wildau",
  // Disabled for now, since both take about 30 Sec to generate and we don't need them that urgendly.
  // KoenigsWusterhausen: "Königs Wusterhausen",
  // Schoenefeld: "Schönefeld",
}

export const areaKeys = Object.keys(areas).map((areaKey) => areaKey)
export const areaValues = Object.keys(areas).map((areaKey) => areas[areaKey])
