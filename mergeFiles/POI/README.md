# Commands GeoJSON

```
npx ts-node ./mergeFiles/POI/mergePoiAreasWays.ts
npx ts-node ./mergeFiles/POI/mergePoiPoints.ts
```

# Commands Vector Tiles

1. **Open Folder**

   ```sh
   cd ./mergeFiles/POI/
   ```

1. **Create two mbtiles based on the GeoJSON and merge them into our final file**

   ```sh
   ./tippecanoe.sh
   ```

1. **Preview the merged file**

   Using the docker image of [tileserve](https://github.com/maptiler/tileserver-gl)). You need to reload the URL after Docker finished starting.

   ```sh
   ./preview.sh zes-bb-tt-poi-merged
   ```

1. **Upload the merged file**

   Replace the data at https://studio.mapbox.com/tilesets/hejco.8fc6n1xs/
