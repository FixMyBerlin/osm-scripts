#!/usr/bin/env bash

cd ./output

open http://localhost:8080/data/$1/#10.01/53.7174/13.1793
docker run --rm -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl --verbose --mbtiles $1.mbtiles
