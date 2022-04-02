# About

…

## Custom properties

…

## Download and transpose

```
npx ts-node ./Bietigheim-Bissingen/POI-MergeFiles/mergePoiAreasWays.ts
npx ts-node ./Bietigheim-Bissingen/POI-MergeFiles/mergePoiPoints.ts
```

## Process the data for Mapbox Studio

We need to prepare the data before uploading it. Uploading it direcly does not give us control over the min/max zoom level of the data and which data to show per zoom level. Using [tippecanoe](https://github.com/mapbox/tippecanoe) ([as recommeded in the MapBox Docs](https://docs.mapbox.com/help/troubleshooting/adjust-tileset-zoom-extent/)) allows us to do just that.

For this set of data, we can use the tippecanoe `tile-join` feature to merge the two layer of data. This way, we can create one mbfiles File for the landuse areas with a set of tippecanoe params that simplifies the geometry. And another set of the point data, which we want to simplify as little as possible (we only use some clustering to optimize low zoom level (zoomed out).

Note, that this approach is complely [different from what we do with the highway data](../Highways/).

Preparation: You might need to `chmod 755 *.sh`.

1. **Create two mbtiles based on the GeoJSON and merge them into our final file**

   ```sh
   cd ./POI-MergedFile
   ./tippecanoe.sh
   ```

1. **Preview the merged file**

   Using the docker image of [tileserve](https://github.com/maptiler/tileserver-gl)). You need to reload the URL after Docker finished starting.

   ```sh
   ./preview.sh Bietigheim-Bissingen-poi-merged
   ```

1. **Upload the merged file**

   Replace the data at https://studio.mapbox.com/tilesets/hejco.8fc6n1xs/
