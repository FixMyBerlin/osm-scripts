#!/usr/bin/env bash

cd ./output


# bb
open http://localhost:8080/data/$1/#12.33/48.95206/9.11103

# tt
open http://localhost:8080/data/$1/#10.01/53.7174/13.1793

# zes
open http://localhost:8080/data/$1/#9/52.3726/13.5226

docker run --rm -it -v $(pwd):/data -p 8080:8080 maptiler/tileserver-gl --verbose --mbtiles $1.mbtiles
