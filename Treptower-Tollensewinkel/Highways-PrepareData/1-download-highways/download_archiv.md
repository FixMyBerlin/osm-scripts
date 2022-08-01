# Archive of the version using `area`

```js
const overpassQuery = `
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
  way["highway"](area.searchArea);
);
out geom;
make stat total_length=sum(length()),way_id_length=set(type() + "/" + id() + ":" + length());
out;
`
```
