# About

All streets with `maxspeed` data (direclty mapped) or derived from `maxspeed:source` (and tagging variations).

## Custom properties

- `"FMC:maxspeed": "50"` – The maxspeed number. For cases where multiple maxspeed values for forward/backward are present, it picks the highest. The raw properties are still present, this is to make filtering easier.
- `"FMC:maxspeed:source": "Innerorts",` – Looks at all the different ways a maxspeed source can be specified and returns an info string.

## Download and transpose

```
npx ts-node ./ZESPlus/Highways-MaxspeedData/process.ts
```
