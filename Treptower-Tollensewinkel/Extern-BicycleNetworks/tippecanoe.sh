#!/usr/bin/env bash

tippecanoe \
 --output=./zes-bicycle-networks.mbtiles \
 --force \
 --minimum-zoom=7 \
 --maximum-zoom=16 \
 --simplification=2 \
 --coalesce-smallest-as-needed \
 --name="ZES+ BicycleNetworks" \
 --attribution="Initiativen" \
 --description="https://github.com/FixMyBerlin/osm-scripts/tree/main/ZESPlus" \
 ./zes-bicycle-networks.geojson

tippecanoe \
 --output=./zes-school-routes.mbtiles \
 --force \
 --minimum-zoom=7 \
 --maximum-zoom=16 \
 --simplification=2 \
 --coalesce-smallest-as-needed \
 --name="ZES+ Schulwege" \
 --description="https://github.com/FixMyBerlin/osm-scripts/tree/main/ZESPlus" \
 ./zes-school-routes.geojson
