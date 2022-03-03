# About

A list of shopping relevant POIs, transformed to point data by Overpass.

## Custom properties

- None

## Download and transpose

```
npx ts-node ./ZESPlus/POI-Landuse/download.ts
npx ts-node ./ZESPlus/POI-Landuse/transpose.ts
```

## Evaluation of `landuse`-values

- "allotments"
- "basin"
- "brownfield"
- "cemetery"
- "civic"
- "commercial"
- "construction"
- "farmland"
- "farmyard"
- "flowerbed"
- "forest"
- "garages"
- "grass"
- "greenfield"
- "industrial"
- "junction"
- "landfill"
- "meadow"
- "military"
- "orchard"
- "plant_nursery"
- "quarry"
- "railway"
- "recreation_ground"
- "religious"
- "reservoir"
- "residential"
- "retail"
- "scrub"
- "village_green"

Get the list:

```
[out:json][timeout:25];
nwr["landuse"]({{bbox}});
out body;>;out skel qt;
```
