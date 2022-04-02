# Download OSM Data

```
npx ts-node ./Bietigheim-Bissingen/Highways-PrepareData/1-download-highways/download.ts
```

## Notes

### Length

An alternative approach to add the lenght information is documented at https://github.com/drolbr/Overpass-API/issues/237#issuecomment-927285088, however, that is incompatible with osmtogeojson for now, see https://github.com/tyrasd/osmtogeojson/issues/130.

### As an alternative to `boundardy + admin_level + name`

- …we could also use the `gemeindeschluessel`

  - "Zeuthen" => `de:amtlicher_gemeindeschluessel=12061572` or `de:regionalschluessel=120610572572`
  - "Eichwalde" => `de:amtlicher_gemeindeschluessel=12061112` or `de:regionalschluessel=120610112112`
  - "Schulzendorf" => `de:amtlicher_gemeindeschluessel=12061444` or `de:regionalschluessel=120610444444`
  - "Wildau" => `de:amtlicher_gemeindeschluessel=12061540` or `de:regionalschluessel=120610540540`
  - "Königs Wusterhausen" =>` de:amtlicher_gemeindeschluessel=12061260`
  - "Schönefeld" => `de:amtlicher_gemeindeschluessel=12061433` or `de:regionalschluessel=120610433433`

- …we could use a manually crafted poligon, see https://osm-queries.ldodds.com/tutorial/14-searching-by-polygon.osm.html (not testet yet)
