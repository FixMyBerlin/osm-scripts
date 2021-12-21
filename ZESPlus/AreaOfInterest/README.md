# Initially, prepare the clipping area

1. Run the [Query](#Query) on https://overpass-turbo.eu/

1. 'Export' => Save as GeoJSON

1. Rename to `area.geojson` in this folder

## TODOs

- [ ] Create a script to automate this process.
- [ ] Filter nodes that are part of relation like https://www.openstreetmap.org/node/29562985.

## Query

```php
[out:json][timeout:25];
(
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"]({{bbox}});
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"]({{bbox}});
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"]({{bbox}});

  relation["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"]({{bbox}});
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"]({{bbox}});
  relation["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"]({{bbox}});
);
>;
out skel qt;
```
