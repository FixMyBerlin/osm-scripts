# About

Selected landuse data to highlight areas of activity.

## Custom properties

- None

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
