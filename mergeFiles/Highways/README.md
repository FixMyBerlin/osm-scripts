# Commands GeoJSON

```sh
npx ts-node ./mergeFiles/Highways/mergeAreasWays.ts
```

# Commands Vector Tiles

1. **Open Folder**

   ```sh
   cd ./mergeFiles/Highways/
   ```

1. **Create two mbtiles based on the GeoJSON**

   ```sh
   ./tippecanoe.sh
   ```

1. **Merge the mbtiles back into one file**

   ```sh
   ./merge.sh ./output/zes-bb-tt-allhighways-detailed.mbtiles ./output/zes-bb-tt-allhighways-simplified.mbtiles
   ```

1. **Cleanup the filename of the merged file**

   ```sh
   mv ./output/zes-bb-tt-allhighways-simplified.mbtiles ./output/zes-bb-tt-allhighways-combined.mbtiles
   ```

1. **Preview the merged file**

   Using the docker image of [tileserve](https://github.com/maptiler/tileserver-gl)). You need to reload the URL after Docker finished starting.

   ```sh
   ./preview.sh
   ```

1. **Upload the merged file**

   Replace the data at https://studio.mapbox.com/tilesets/hejco.815n378j
