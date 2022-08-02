#!/usr/bin/env bash

cd ./output/

open http://localhost:8080/data/bb-allhighways-combined/#12.33/48.95206/9.11103
docker run --rm -it -v $(pwd):/data -p 8080:80 maptiler/tileserver-gl
