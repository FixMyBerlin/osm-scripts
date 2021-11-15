# Download OSM Data

1. https://overpass-turbo.eu/
2. export to clipboard as "OSM Rohdaten"
3. paste in .json file

```php
[out:json][timeout:25];
(
  nwr["highway"]({{bbox}});
);
out geom;
make stat total_length=sum(length()),way_id_length=set(type() + "/" + id() + ":" + length());
out;
```

## TODO length bei kurzen Strecken

https://github.com/drolbr/Overpass-API/issues/237

```
[out:json][timeout:25];
(
  area["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
)->.searchArea;
(
  way["highway"](area.searchArea);
);
convert result ::=::,::geom=geom(),length=length();
out geom;
```
