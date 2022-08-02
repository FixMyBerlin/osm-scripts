#!/usr/bin/env bash

# Docs https://github.com/mapbox/tippecanoe#continuous-polygon-features-states-and-provinces-visible-at-all-zoom-levels
# Docs -r1 https://github.com/mapbox/tippecanoe#options

tippecanoe \
 --output=./output/intermediate-steps/bb-poi-areas-ways.mbtiles \
 --force \
 --minimum-zoom=7 \
 --maximum-zoom=16 \
 --simplification=10 \
 --coalesce-densest-as-needed \
 --coalesce-smallest-as-needed \
 --name="Bietigheim-Bissingen POI Area and Way Data" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts" \
 ./output/mergedPoiAreasWays.geojson

tippecanoe \
 --output=./output/intermediate-steps/bb-poi-points.mbtiles \
 --force \
 --minimum-zoom=7 \
 --maximum-zoom=16 \
 -r1 \
 --cluster-distance=1 \
 --name="Bietigheim-Bissingen POI Point Data" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts" \
 ./output/mergedPoiPoints.geojson

tile-join  --force -o ./output/bb-poi-merged.mbtiles ./output/intermediate-steps/bb-poi-areas-ways.mbtiles ./output/intermediate-steps/bb-poi-points.mbtiles
