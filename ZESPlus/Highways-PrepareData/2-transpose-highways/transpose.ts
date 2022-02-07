import de9im from "de9im"
import fs from "fs"
import {
  AreaCallbackProps,
  overpassJsonToGeoJson,
} from "../../utils/overpassJsonToGeoJson"

const enhanceDataWitAreaInformation: AreaCallbackProps = (areaKey, geoJson) => {
  console.time(`enhanceData(): Ergänze FMC:Gebiet:${areaKey}=True|False`)

  const file = `./ZESPlus/AreaOfInterest/output/${areaKey}.geojson`
  // Needs to be .readFileSync or otherise all needs to become async
  const area = JSON.parse(fs.readFileSync(file, { encoding: "utf8" }))

  geoJson.features.forEach((feature) => {
    const partOfOrOverlaps = de9im.intersects(area, feature.geometry)
    feature.properties[`FMC:Gebiet:${areaKey}`] = `${partOfOrOverlaps}`
    if (partOfOrOverlaps) {
      feature.properties["FMC:Gebiet"] = [
        areaKey,
        feature.properties["FMC:Gebiet"],
      ].join(",")
    }
  })

  console.timeEnd(`enhanceData(): Ergänze FMC:Gebiet:${areaKey}=True|False`)
}

overpassJsonToGeoJson({
  readFile:
    "./ZESPlus/Highways-PrepareData/1-download-highways/osmRawHighways.json",
  outputFolder: "./ZESPlus/Highways-PrepareData/2-transpose-highways/",
  fileNamePart: "osmHighwaysUnclipped",
  areaCallback: enhanceDataWitAreaInformation,
})
