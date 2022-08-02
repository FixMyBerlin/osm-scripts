# About

## Download and transpose

```
npx ts-node ./Bietigheim-Bissingen/Highways/process.ts
```

## Process the data for Mapbox Studio

We need to prepare the data before uploading it. Uploading it direcly does not give us control over the min/max zoom level of the data and which data to show per zoom level. Using [tippecanoe](https://github.com/mapbox/tippecanoe) ([as recommeded in the MapBox Docs](https://docs.mapbox.com/help/troubleshooting/adjust-tileset-zoom-extent/)) allows us to do just that.

Preparation: You might need to `chmod 755 *.sh`.

1. **Open Folder**

   ```sh
   cd ./Bietigheim-Bissingen/Highways/
   ```

1. **Create two mbtiles based on the GeoJSON**

   ```sh
   ./tippecanoe.sh
   ```

1. **Merge the mbtiles back into one file**

   ```sh
   ./merge.sh ./output/bb-allhighways-detailed.mbtiles ./output/bb-allhighways-simplified.mbtiles
   ```

1. **Cleanup the filename of the merged file**

   ```sh
   mv ./output/bb-allhighways-simplified.mbtiles ./output/bb-allhighways-combined.mbtiles
   ```

1. **Preview the merged file**

   Using the docker image of [tileserve](https://github.com/maptiler/tileserver-gl)). You need to reload the URL after Docker finished starting.

   ```sh
   ./preview.sh
   ```

1. **Upload the merged file**

   Replace the data at https://studio.mapbox.com/tilesets/#TODO
