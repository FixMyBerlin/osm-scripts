#!/usr/bin/env bash

tippecanoe \
 --output=./output/Bietigheim-Bissingen-allhighways-detailed.mbtiles \
 --force \
 --layer=allHighwaysLayer \
 --minimum-zoom=11 \
 --maximum-zoom=16 \
 --drop-smallest-as-needed \
 --name="ZES+ AllHighways (Detailed)" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts/tree/main/Bietigheim-Bissingen" \
 ./output/allHighways.geojson

tippecanoe \
 --output=./output/Bietigheim-Bissingen-allhighways-simplified.mbtiles \
 --force \
 --layer=allHighwaysLayer \
 --minimum-zoom=7 \
 --maximum-zoom=10 \
 --simplification=5 \
 --coalesce-smallest-as-needed \
 --name="ZES+ AllHighways" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts/tree/main/Bietigheim-Bissingen" \
 ./output/allHighways.geojson
