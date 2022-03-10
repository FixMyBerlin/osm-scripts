# About

A street network with surface quality data for all bicycle relevant lanes.

If no `smoothness` is tagged, the script extrapolates a value based on `surface` values ([mapping table](./utils/extrapolatedSmoothnessBasedOnSurface.ts)) or `highway` values ([mapping table](./utils/extrapolatedSmoothnessBasedOnHighway.ts)). Since this lowers the confidence of the data, there are custom properties describing the confidence.

If bicycle infrastracture was mapped as part of the main way, the script will add multiple custom properties with scopes. This way the surface quality of the car centered infrastructure can be evaluated separate from bicycles centered infrastructure even if mapped on one OSM way.

For legacy reasons and to visualize the data easily on a uMap the resulting `smoothness.geojson` is split into additional files that hold only ways with a given smoothness (in any of the scopes).

## Custom properties

- `"FMC:Category:SurfaceData:Scope<ScopeName>": "very_bad"` – Possible values are…

  - "bad"
  - "excellent"
  - "good"
  - "intermediate"
  - "very_bad"

- `"FMC:Category:SurfaceData:AllSmoothnessValues": ["MainWay", "CyclewayOnMainWay"]` – An array of all smoothness values to easily evaluate the (number of) applied smoothness regardless of their scope

- `"FMC:Category:SurfaceData:Scope<ScopeName>:Confidence": "High"` – A string desribing the confidence of the given "FMC:Category:SurfaceData:…"

  - "High" = `smoothness` mapped explicitly
  - "Medium" = `smoothness` extrapolated based on `surface`
  - "Low" = `smoothness` extrapolated based on `highway` values

- `"FMC:Category:SurfaceData:Scope<ScopeName>:Source": "Based on 'smoothness=excellent'"` – An explanation about how the smoothmess value came to be.

- `"FMC:Category:SurfaceData:AllScopesValues": ["MainWay", "CyclewayOnMainWay"]` – An array of all scopes to easily evaluate the (number of) applied scopes. Possible scopes are…

  - "MainWay"
  - "SidewalkOnMainWay"
  - "CyclewayOnMainWay"

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
