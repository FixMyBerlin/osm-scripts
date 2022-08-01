export const netlifyFileUrl = (dirnameString: string) => {
  // `dirnameString` looks like `/Users/NAME/FOLDER/osm-scripts/ZESPlus/POI-PublicTransport/output/poiPublicTransport.geojson`

  // Cleanup:
  // `__dirname` inside this file looks like `/Users/NAME/FOLDER/osm-scripts/ZESPlus/utils`
  // … so we have to remove the last two folders:
  const removeString = __dirname.split("/").slice(0, -2).join("/")
  // … and use it to cleanup the dirnameString:
  const path = dirnameString.replace(removeString, "")

  return `https://osm-scripts.netlify.app${path}`
}
