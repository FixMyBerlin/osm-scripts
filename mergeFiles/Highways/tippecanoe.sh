#!/usr/bin/env bash

tippecanoe \
 --output=./output/zes-bb-tt-allhighways-detailed.mbtiles \
 --force \
 --layer=allHighwaysLayer \
 --minimum-zoom=11 \
 --maximum-zoom=16 \
 --drop-smallest-as-needed \
 --name="AllHighways (Detailed)" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts" \
 ./output/allHighways.geojson

tippecanoe \
 --output=./output/zes-bb-tt-allhighways-simplified.mbtiles \
 --force \
 --layer=allHighwaysLayer \
 --minimum-zoom=7 \
 --maximum-zoom=10 \
 --simplification=5 \
 --coalesce-smallest-as-needed \
 --name="AllHighways" \
 --attribution="OpenStreetMap Contributors, FixMyCity" \
 --description="https://github.com/FixMyBerlin/osm-scripts" \
 ./output/allHighways.geojson
