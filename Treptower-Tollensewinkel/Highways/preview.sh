#!/usr/bin/env bash

cd ./output/

open http://localhost:8080/data/tt-allhighways-combined/#10.01/53.7174/13.1793
docker run --rm -it -v $(pwd):/data -p 8080:80 maptiler/tileserver-gl
