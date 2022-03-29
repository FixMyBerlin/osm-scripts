# About

## Download and transpose

```
npx ts-node ./ZESPlus/Highways/process.ts
```

## Process the data for Mapbox Studio

We need to prepare the data before uploading it. Uploading it direcly does not give us control over the min/max zoom level of the data and which data to show per zoom level. Using [tippecanoe](https://github.com/mapbox/tippecanoe) ([as recommeded in the MapBox Docs](https://docs.mapbox.com/help/troubleshooting/adjust-tileset-zoom-extent/)) allows us to do just that.

Preparation: You might need to `chmod 755 *.sh`.

1. **Create two mbtiles based on the GeoJSON**

```sh
./tippecanoe.sh
```

1. **Merge the mbtiles back into one file**

```sh
./merge.sh ./output/zesplus-allhighways-detailed.mbtiles ./output/zesplus-allhighways-simplified.mbtiles
```

1. **Cleanup the filename of the merged file**

```sh
mv ./output/zesplus-allhighways-simplified.mbtiles ./output/zesplus-allhighways-combined.mbtiles
```

1. **Preview the merged file** Using the docker image of [tileserve](https://github.com/maptiler/tileserver-gl)). You need to reload the URL after Docker finished starting.

```sh
./preview.sh
```

1. **Upload the merged file** Replace the data at https://studio.mapbox.com/tilesets/hejco.815n378j

## `tippecanoe.sh` – About two tippecanoe-files

## Detailed data set for zoom 16-11

- We try to keep all data, but for zoom 11 tippecanoe needs `drop-smallest-as-needed` ([Docs](https://github.com/mapbox/tippecanoe#dropping-a-fraction-of-features-to-keep-under-tile-size-limits)) to be able to remove data that is less important.
- [Direct link in Mapbox Studio](https://studio.mapbox.com/tilesets/hejco.815n378j/)

### Simplified data set for zoom 11-7

- We tell tippecanoe to reduce nodes in lines with `simplification=5` ([Docs](https://github.com/mapbox/tippecanoe#line-and-polygon-simplification)). We tried `10` which removed too much, `5` looked good.
- We tell tippacanoe to merge small road segments into larger once with `coalesce-smallest-as-needed` (loosing their attributes) ([Docs](https://github.com/mapbox/tippecanoe#dropping-a-fraction-of-features-to-keep-under-tile-size-limits))
- Since this reduces the data quality, we only use this data set when zoomed out.
- [Direct link in Mapbox Studio](https://studio.mapbox.com/tilesets/hejco.07eoj5mg/)

## `merge.sh` - About the merge

We cannot use `tile-join` by tippecanoe (details below). In our case, both mbtiles files have specific zoom level. And since mbtiles are just special Sqlite databases, we can manually move the tiles from one file to the other.

We also need to update the meta data zoom level data.

Both is done in the `merge.sh` script, which is heavily inspired by [mapbox/mbutils/master/path](https://raw.githubusercontent.com/mapbox/mbutil/master/patch), which we discovered [via a blogpost on the topic](https://jeromegagnonvoyer.wordpress.com/2015/08/06/merging-multiple-mbtiles-together/).

## Reminder about Zoom level

- 0 = World
- 7 = country
- 11 = city
- 12 = district
- 16 = neighbourhood

[Docs](https://github.com/mapbox/tippecanoe#zoom-levels)

## Learnings

A list of think we learned while working on this topic…

**Merging/joining mbtiles with tippecanoe:**

- tippecanoe-tile-join is not, what we want. Or at least it does not do, what we want, yet.
  - `tile-join zesplus-allhighways-simplified.mbtiles zesplus-allhighways-detailed.mbtiles -o zesplus-allhighways-detailed-and-simplified.mbtiles --force` would ideally work
  - But it does create a warning ([Commit](https://github.com/mapbox/tippecanoe/pull/656/files)) since about Okt 2018 https://github.com/mapbox/tippecanoe/issues/653
  - It looks like the docs from tippecanoe are wrong since then ([Issue](https://github.com/mapbox/tippecanoe/issues/920))
  - The UseCase of tile-join seems to be to merge layer and data to layer. However, what we want is a process to merge data per zoom-level. This is not supported ATM ([Issue](https://github.com/mapbox/tippecanoe/issues/693#issuecomment-842551751), also [Issue](https://github.com/mapbox/tippecanoe/issues/688)).
- tippecanoe supports manually specified zoom level per feature inside the GeoJON.
  - More at https://github.com/mapbox/tippecanoe#geojson-extension
  - However we don't want to specify all this manually and its less about hiding data but rather using the coalesce-options when zoomed out.
- tippecanoe can create directories with pbf files instead when the "output-folder" feautre is used. [Blogpost](https://geovation.github.io/tippecanoe-directory-support).
  - There is also [a QGIS plugin](https://plugins.qgis.org/plugins/tags/pbf/) that extract the files from a mbtiles File.
- tippecanoe can filter data via the `-f` option
  - We could try to filter the data manually using vector style filter clauses. However, setting specific min/maxzoom seems to be easier.
  - More at https://github.com/mapbox/tippecanoe#filtering-features-by-attributes

**Merging/joining mbtiles with maptiler:**

- maptiler can merge Layers, however …
  - It looks like it is meant for Pixel data(?)
  - It looks like it's only avaliable with the PRO account ([Pricing page](https://www.maptiler.com/pricing/))
  - Following [the docs](https://manual.maptiler.com/en/stable/usage.html#merge-mbtiles-utility) did not work.
  - Following [the installation instructions](https://manual.maptiler.com/en/stable/installation.html) for Mac did not work.
  - I did not try [the Docker version](https://hub.docker.com/r/maptiler/engine/).

**Merging/joining mbtiles with Mabpox Tiling Serfvice:**

- Mapbox Tiling Service / Mapbox Tileset CLI ([reference on the tippecanoe page](https://github.com/mapbox/tippecanoe)) does not look like what we need.
  - The UseCase List does not list out UseCase to just add Zoom Level data.
  - The [CLI-](https://docs.mapbox.com/mapbox-tiling-service/guides/#tilesets-cli) and ["Recipe specification"](https://docs.mapbox.com/mapbox-tiling-service/reference/#basic-example)-Docs look way too complex for what we want to do.

**Merging/joining mbtiles with Sqlite:**

- We could change the `merge.sh` to use Node, possibly with https://github.com/kriasoft/node-sqlite. However, the script works for now…

**Preview mbtiles:**

- We can [use TileServerGL to preview the tiles](https://github.com/maptiler/tileserver-gl)
  - However, the installation requires NodeJS 10, so Docker is easier: `docker run --rm -it -v $(pwd):/data -p 8080:80 maptiler/tileserver-gl` (run vom within `./ZESPlus/Highways/output/`)
  - There is also a tileserver-gl-light but the corresponding Docker is broken
  - The preview is at http://localhost:8080/data/zesplus-allhighways-combined/

**Uploading mbtiles:**

- To automate the upload step, we could use https://docs.mapbox.com/help/tutorials/upload-curl/
  - However, that process is tedious with S3 involved and the docs hint at possible automated changes to the mbtiles after upload.
