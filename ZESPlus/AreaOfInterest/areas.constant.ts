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
export const bboxBetrachtungsraum = [52.2587, 13.4529, 52.4646, 13.773]

export const areaKeys = Object.keys(areas).map((areaKey) => areaKey)
export const areaValues = Object.keys(areas).map((areaKey) => areas[areaKey])
