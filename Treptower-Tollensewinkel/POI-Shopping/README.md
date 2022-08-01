# About

Point data of places for shopping that represent important destinations for cycling infrastructure.

Areas are tranformed to points by overpass.

[`download.ts` shows which data is included](./download.ts).

## Custom properties

- `"FMC:ShopCategory": Einkauf` – [Learn more …](/utils/POI-Shopping/shopCategories.const.ts)

## Download and transpose

```
npx ts-node ./ZESPlus/POI-Shopping/download.ts
npx ts-node ./ZESPlus/POI-Shopping/transpose.ts
```
