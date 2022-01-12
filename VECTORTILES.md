# A bit of personal documentation

- https://openmaptiles.org/docs/generate/custom-vector-from-shapefile-geojson/
  - https://github.com/mapbox/tippecanoe

```
cd ./osm-scripts/ZESPlus/Highways-SurfaceData/output

ogr2ogr -f GeoJSON collectedHighways_EPSG4326.geojson -t_srs EPSG:4326 collectedHighways.geojson

tippecanoe -o collectedHighways.mbtiles collectedHighways_EPSG4326.geojson
```
