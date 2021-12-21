# Extract data for schools (…) to visualize busy areas

This data is used on a heatmap to show areas that require a different infrastructure.

## Steps

1. Run the [Query](#Query) on https://overpass-turbo.eu/

1. 'Export' => Save as GeoJSON

1. Rename to `schools.geojson` in this folder

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
  nwr["amenity"="childcare"](area.searchArea);
  nwr["amenity"="college"](area.searchArea);
  nwr["amenity"="kindergarten"](area.searchArea);
  nwr["amenity"="research_institute"](area.searchArea);
  nwr["amenity"="school"](area.searchArea);
  nwr["amenity"="university"](area.searchArea);
);
out center;
>;
out skel qt;
```
