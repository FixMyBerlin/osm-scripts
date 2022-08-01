#!/usr/bin/env bash

cd ./output/

open http://localhost:8080/data/zesplus-allhighways-combined/#9/52.3726/13.5226
docker run --rm -it -v $(pwd):/data -p 8080:80 maptiler/tileserver-gl
