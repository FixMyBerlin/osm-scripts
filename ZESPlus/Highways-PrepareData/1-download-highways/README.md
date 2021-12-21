# Download OSM Data

1. Run the [Query](#Query) on https://overpass-turbo.eu/

1. 'Export' => Save "OSM Rohdaten" (JSON, not GeoJson)

1. Rename to `osmRawHighways.json` in this folder

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
  way["highway"](area.searchArea);
);
out geom;
make stat total_length=sum(length()),way_id_length=set(type() + "/" + id() + ":" + length());
out;
```

## Notes

- An alternative approach to add the lenght information is documented at https://github.com/drolbr/Overpass-API/issues/237#issuecomment-927285088, however, that is incompatible with osmtogeojson for now, see https://github.com/tyrasd/osmtogeojson/issues/130.

- As an alternative to `boundardy + admin_level + name`, we could also use the `gemeindeschluessel`
  - "Zeuthen" => `de:amtlicher_gemeindeschluessel=12061572` or `de:regionalschluessel=120610572572`
  - "Eichwalde" => `de:amtlicher_gemeindeschluessel=12061112` or `de:regionalschluessel=120610112112`
  - "Schulzendorf" => `de:amtlicher_gemeindeschluessel=12061444` or `de:regionalschluessel=120610444444`
  - "Wildau" => `de:amtlicher_gemeindeschluessel=12061540` or `de:regionalschluessel=120610540540`
  - "Königs Wusterhausen" =>` de:amtlicher_gemeindeschluessel=12061260`
  - "Schönefeld" => `de:amtlicher_gemeindeschluessel=12061433` or `de:regionalschluessel=120610433433`
