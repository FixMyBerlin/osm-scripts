# About

Point data of places for shopping that represent important destinations for cycling infrastructure.

Areas are tranformed to points by overpass.

[`download.ts` shows which data is included](./download.ts).

## Custom properties

- `"FMC:ShopCategory": Einkauf` – Categorizes OSM shop data in one of 4 categories + fallback. [Show full list](./utils/shopCategories.const.ts)
  - "Besorgungen"
  - "Bildung"
  - "Einkauf"
  - "Freizeit"
  - "No category specified"

## Download and transpose

```
npx ts-node ./Bietigheim-Bissingen/POI-Shopping/download.ts
npx ts-node ./Bietigheim-Bissingen/POI-Shopping/transpose.ts
```
