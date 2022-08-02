# About

All streets with `maxspeed` data (direclty mapped) or derived from `maxspeed:source` (and tagging variations).

## Custom properties

- `"FMC:Category:MaxspeedData:MaxspeedValue": "50"` – The maxspeed number. For cases where multiple maxspeed values for forward/backward are present, it picks the highest. The raw properties are still present, this is to make filtering easier.

  - "20"
  - "30"
  - "50"
  - "100"
  - (Other OSM speed values are possible.)
  - "Verkehrsberuhigter Bereich" – Legally not clearly defined, but walking spead
  - "Angabe mit Einschränkungen" – Complex conditional tagging which is not fully supported by the script, so it just gives this indicator.
  - "No maxspeed value found" – Fallback value

- `"FMC:Category:MaxspeedData:Source": "Innerorts",` – Looks at all the different ways a maxspeed source can be specified and returns an info string.

  - "Verkehrsberuhigter Bereich" – Based on highway type living_street.
  - "Fahrradstraße" – Based on source tagging (and not highway type to keep it simpler, for now).
  - "Beschilderung" – Based on source tagging.
  - "Innerorts" – Based on source tagging.
  - "Außerorts" – Based on source tagging.
  - "Zone" – Based on source tagging.
  - "No source given" – Fallback value
