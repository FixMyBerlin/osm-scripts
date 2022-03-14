# About

A street network with **surface quality** data for all bicycle relevant lanes.

If no `smoothness` is tagged, the script extrapolates a value based on `surface` values ([mapping table](./utils/extrapolatedSmoothnessBasedOnSurface.ts)) or `highway` values ([mapping table](./utils/extrapolatedSmoothnessBasedOnHighway.ts)). Since this lowers the confidence of the data, there are custom properties describing the confidence.

If bicycle infrastracture was mapped as part of the main way, the script will add multiple custom properties with scopes. This way the surface quality of the car centered infrastructure can be evaluated separate from bicycles centered infrastructure even if mapped on one OSM way.

Possible scopes are…

- "MainWay"
- "SidewalkBikeYes:Left"
- "SidewalkBikeYes:Right"
- "Cycleway:Left"
- "Cycleway:Right"

When the sidewalk or cycleway was mapped with `:both`, the scope has both as `:Left` and `:Right` with the same data.

## Custom properties

- `"FMC:Category:SurfaceData:Scope<ScopeName>": "very_bad"` – The smoothness quality. Possible values are…

  - "excellent"
  - "good"
  - "intermediate"
  - "bad"
  - "very_bad"

- `"FMC:Category:SurfaceData:Scope<ScopeName>:Confidence": "High"` – The confidence of the given scope. Possible values are…

  - "High" = `smoothness` mapped explicitly
  - "Medium" = `smoothness` extrapolated based on `surface`
  - "Low" = `smoothness` extrapolated based on `highway` values

- `"FMC:Category:SurfaceData:Scope<ScopeName>:Source": "Based on 'smoothness=excellent'"` – An explanation about how the smoothmess value came to be.

- `"FMC:Category:SurfaceData:AllScopesValues": "MainWay,Cycleway:Left"` – A comma separated list of all scope values.

- `"FMC:Category:SurfaceData:AllScopesValues:Count": "2"` – The number of scopes.

- `"FMC:Category:SurfaceData:AllSmoothnessValues": "very_bad,intermediate"` – A comma separated list of all smoothness values.

- `"FMC:Category:SurfaceData:AllSmoothnessValues:Count": "2"` – The number of smoothness values.

## Download and transpose

```
npx ts-node ./ZESPlus/Highways-SurfaceData/process.ts
npx ts-node ./ZESPlus/Highways-SurfaceData/split.ts
```

## References for the used smoothness categories

- https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/smoothness
- https://docs.google.com/spreadsheets/d/1-JiRgPPSByqyt7qQagFYJ3O7OvVh2DTJY_2-x9oeExs/edit#gid=0
- https://github.com/streetcomplete/StreetComplete/pull/3257
- https://github.com/streetcomplete/StreetComplete/issues/3592
