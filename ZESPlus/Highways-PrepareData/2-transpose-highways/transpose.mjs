// Run with
//    node ./ZESPlus/2-transpose/transpose.mjs

import fs from 'fs'
import osmtogeojson from 'osmtogeojson'

fs.readFile('./ZESPlus/1-download/osmRawHighways.json', 'utf8' , (err, _data) => {
  if (err) {
    console.error(err)
    return
  }

  const rawJsonData = JSON.parse(_data)
  const geoJsonData = osmtogeojson(rawJsonData)

  addLenghtFromOverpassStatsResultToGeoJson(rawJsonData, geoJsonData)
  writeGeoJson(geoJsonData)
})

// We use a special overpass feature to get the length of the highway segments.
// However, once we parse this data, the length is lost.
// This moves the length data from a 'stats' object on top level to the 'properties' of our highway.
const addLenghtFromOverpassStatsResultToGeoJson = (rawJsonData, geoJsonData) => {
  const lengthString = rawJsonData.elements.filter(e => e.type === 'stat')[0].tags.way_id_length
  const lengthObject = Object.fromEntries(lengthString.split(';').map(line => line.split(':')))

  if (!lengthString) {
    console.log('No lenght data found')
    return
  }

  geoJsonData.features.forEach(feature => {
    const featureLength = lengthObject[Object.keys(lengthObject).find(key => key == feature.properties.id)]
    if (!featureLength) console.error('Could not find lenght for', feature.properties.id)

    // Add length to GeoJSON as string (since all keys and values are of type string)
    feature.properties["FMC:length"] = `${parseFloat(featureLength)}`
  })

  console.log(geoJsonData.features.map(feature => feature.properties).slice(0, 5))
}

const writeGeoJson = (geoJsonData) => {
  // Add date to filename: …-${new Date().toJSON().slice(0, 10)}
  fs.writeFile(
    './ZESPlus/2-transpose/osmHighwaysUnclipped.geojson',
    JSON.stringify(geoJsonData, null, 2),
    function (error) {
      if (error) throw error
      console.log(
        `GeoJSON mit ${geoJsonData.features.length} features geschrieben.`
      )
    }
  )
}
