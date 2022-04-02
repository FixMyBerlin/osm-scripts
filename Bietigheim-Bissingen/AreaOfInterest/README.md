# Initially, prepare the clipping area

## Specifiy the bbox

1. Use QGIS to create the buffer area
2. Export this shape as GeoJson and activate the option to include the bbox in the file.
3. Use those coordinates in [areas.constant.ts](./areas.constant.ts); you need to resort the lat/lng to follow the Overpass requirements
