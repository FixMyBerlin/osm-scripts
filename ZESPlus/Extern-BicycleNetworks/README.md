# About

…

## Process the data for Mapbox Studio

(See also [Highway/README](./Highway/README.md).)

1. **Edit the geojson**

   Use VS Code to format the GeoJSON, then Duplicate the properties.layer line and rename it to "tippecanoe.layer".

   BEFORE:

   ```json
      …
      "type": "Feature",
      "properties": { "layer": "NAME" },
      "geometry": {
      …
   ```

   AFTER:

   ```json
      …
      "type": "Feature",
      "tippecanoe": { "layer": "NAME" },
      "properties": { "layer": "NAME" },
      "geometry": {
      …
   ```

1. **Create two mbtiles based on the GeoJSON**

   ```sh
   ./tippecanoe.sh
   ```

1. **Preview the merged file**

   Using the docker image of [tileserve](https://github.com/maptiler/tileserver-gl)). You need to reload the URL after Docker finished starting.

   ```sh
   open http://localhost:8080/data/zes-bicycle-networks/#9/52.3726/13.5226
   docker run --rm -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl --verbose --mbtiles zes-bicycle-networks.mbtiles
   ```

   ```sh
   open http://localhost:8080/data/zes-school-routes/#9/52.3726/13.5226
   docker run --rm -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl --verbose --mbtiles zes-school-routes.mbtiles
   ```

1. **Upload the merged file**

   Replace the data at

   - school-routes https://studio.mapbox.com/tilesets/hejco.9p1g2072
   - bicycle-networks https://studio.mapbox.com/tilesets/hejco.cicz8d7x
