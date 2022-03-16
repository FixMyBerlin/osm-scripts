export const areas = {
  Zeuthen: "Zeuthen",
  Eichwalde: "Eichwalde",
  Schulzendorf: "Schulzendorf",
  Wildau: "Wildau",
  // Disabled for now, since both take about 30 Sec to generate and we don't need them that urgendly.
  // KoenigsWusterhausen: "Königs Wusterhausen",
  // Schoenefeld: "Schönefeld",
}

// - Betrachtungsraum: 10 km Radien im Gemeindemittelpunkte ZES+ (6 Gemeinden)
// - Erweiterte Planungsraum: Gemeindegrenzen ZES+ (Admingrenzen, 6 Gemeinden)
// - Planungsraum Radnetz: Gemeindegrenzen ZES (Admingrenzen, 3 Gemeinden)
export const bboxBetrachtungsraum = [52.2095712988651, 13.3579450828661, 52.4784242424921, 13.7815582011475]

export const areaKeys = Object.keys(areas).map((areaKey) => areaKey)
export const areaValues = Object.keys(areas).map((areaKey) => areas[areaKey])
