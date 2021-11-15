# Initially, prepare the clipping area

1. Run query
   Siehe https://docs.google.com/document/d/1zIXtoB8J7oHosHivZmyyRxKYnLU58dChyKuEavs-ri8/edit#

2. Export into clipboard, paste into raw.json

3. Run transpose

   ```
   npx osmtogeojson ./ZESPlus/0-area/raw.json > ./ZESPlus/0-area/area.geojson
   ```
