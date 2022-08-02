# Research: How to collect all highways that are part of our AreaOfInterest but also part of an `landuse=residential`

## Summary

For unknown reasons, the overpass queries do not return all ways. Even those that do work (AKA no timeout), leave gaps in the data.

Therefore, this approach will not work.

(Had it worked, the idea was to iterathe those roads and categorize our main road network with the additinal information "thiis road intersects with a `landuse=residential`.)

## Visualize both areas (`landuse` + `boundary`)

_LEARNINGS:_

1. Parts of 'Eichwalde' are outside of the boundary
1. Some landuse areas touch our boundary by just a bit and therefore are included, eg. 'Falkenhorst'

```php
[out:json][timeout:25];
(
  area["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"];
)->.searchArea;
(
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"];

  nwr["landuse"="residential"](area.searchArea);
);
out geom;

{{style:
relation[boundary=administrative] {
  fill-color: blue;
}
}}
```

## Tutorials for overpass

- Tutorial https://dev.overpass-api.de/overpass-doc/de/full_data/area.html
- Further reading https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#Map_way.2Frelation_to_area_.28map_to_area.29 (and the other area-chapters)

## Results – all don't work

#### ~~Take 1~~

_Removed._

#### Take 2 - same as Take 4

Does not work. Leaves the same gabs as _Take 4_.

```php
[out:json][timeout:25];
(
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"];
)->._;
map_to_area;
nwr["landuse"="residential"](area)->.residentialArea;
way["highway"](area.residentialArea);
out geom;
```

#### Take 3 – broken

Timeout. Even with only one

```php
[out:json][timeout:25];
(
//  area["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
//  area["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
//  area["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"];
//  area["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"];
//  area["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"];
)->.searchArea;
nwr["landuse"="residential"]->.residentialArea;
way["highway"](area.residentialArea)(area.searchArea);
out geom;
```

#### Take 4 – most promising

Does show promising results, but some landuse-relations are not shown. I could not find anything wrong with those relations (eg http://ra.osmsurround.org/analyzeRelation?relationId=361005&_noCache=on)

```php
[out:json][timeout:25];
(
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"];
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"];
)->._;
map_to_area;
nwr["landuse"="residential"](area);
map_to_area;
way["highway"](area);
out geom;
```
