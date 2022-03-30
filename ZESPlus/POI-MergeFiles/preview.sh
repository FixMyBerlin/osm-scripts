#!/usr/bin/env bash

cd ./output

open http://localhost:8080/data/$1/#9/52.3726/13.5226
docker run --rm -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl --verbose --mbtiles $1.mbtiles
