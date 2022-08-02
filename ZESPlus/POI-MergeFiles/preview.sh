#!/usr/bin/env bash

cd ./output

open http://localhost:8080/data/$1/#10.03/52.3398/13.5584
docker run --rm -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl --verbose --mbtiles $1.mbtiles
