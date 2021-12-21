# Extract data for shops (…) to visualize busy areas

This data is used on a heatmap to show areas that require a different infrastructure.

## Steps

1. Run the [Query](#Query) on https://overpass-turbo.eu/

1. 'Export' => Save as GeoJSON

1. Rename to `geschaefte.geojson` in this folder

## Query

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
  node["amenity"]["amenity"!="bench"]["amenity"!="bicycle_parking"]["amenity"!="parking"]["amenity"!="telephone"]["amenity"!="waste_basket"]["amenity"!="parking_entrance"]["amenity"!="shelter"]["amenity"="recycling"]["amenity"="hunting_stand"]["amenity"="post_box"]["access"!="private"](area.searchArea);
  node["shop"](area.searchArea);
);
out center;
>;
out skel qt;

{{style:
  node[amenity] {
    text: amenity
  }
}}
```
