#!/usr/bin/env bash

# Docs https://github.com/mapbox/tippecanoe#continuous-polygon-features-states-and-provinces-visible-at-all-zoom-levels
# Docs -r1 https://github.com/mapbox/tippecanoe#options

tippecanoe \
 --output=./output/intermediate-steps/tt-areas-ways.mbtiles \
 --force \
 --minimum-zoom=7 \
 --maximum-zoom=16 \
 --simplification=10 \
 --coalesce-densest-as-needed \
 --coalesce-smallest-as-needed \
 --name="Treptower Tollensewinkel POI Area and Way Data" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts" \
 --attribute-type=population:int \
 ./output/mergedPoiAreasWays.geojson

tippecanoe \
 --output=./output/intermediate-steps/tt-points.mbtiles \
 --force \
 --minimum-zoom=7 \
 --maximum-zoom=16 \
 -r1 \
 --cluster-distance=1 \
 --name="Treptower Tollensewinkel POI Point Data" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts" \
 --attribute-type=population:int \
 ./output/mergedPoiPoints.geojson

tile-join  --force -o ./output/tt-poi-merged.mbtiles ./output/intermediate-steps/tt-areas-ways.mbtiles ./output/intermediate-steps/tt-points.mbtiles
