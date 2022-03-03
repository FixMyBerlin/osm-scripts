# About

All relevant streets, categorized in 4 categories of Highways:

- [Wohnstraße](./filter/typA_Wohnstrasse.ts) (Type A)
- [HauptUndSammelstrasse](./filter/typC_HauptUndSammelstrasse.ts) (Type C)
- [Ausserorts](./filter/typE_Ausserorts.ts) (Type E)
- [FreiGefuert](./filter/typF_FreiGefuehrt.ts) (Type F)

Details about the applied conditions are part of the filter-files linked above. Type F and E have their own condition. Type C filters all streets that where already categorised as type E. And in the same way type A filters all that is type C already.

There is no type B anymore.

## Custom properties

- None

## Download and transpose

```
npx ts-node ./ZESPlus/Highways-HighwayTypeData/process.ts
```
