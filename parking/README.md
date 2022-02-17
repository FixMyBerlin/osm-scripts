# TODO

- Daten normalisieren (kein both, immer right, left; auch non-both (root tag) übersetzen)
- Datensatz aller relevanten Straßen + Länge + Parking:lane-Daten
- Cluster nach Datensätzen
- Liste aller Nutzer, die Straße zuletzt bearbeitet haben

- Datensatz Straßen-Ways
- Datensatz Crossings Fußgänger
- Datensatz Einfahrten – TOOD wie?

- Wie gehen wir mit check_date um?

## Tagging

https://wiki.openstreetmap.org/wiki/Key:parking:lane

### Typ `parking:lane:both|right|left=*`

- parallel: es muss parallel zur Straße geparkt werden.
- diagonal: es muss diagonal zur Straße geparkt werden, z.B. schräg angeordnete Parkplätze im 45°-Winkel.
- perpendicular: es muss quer zur Straße geparkt werden, z.B. seitlich an die Straße angegliederte Parkplätze im 90°-Winkel.
- marked: es sind nur einige Parkflächen verfügbar, welche als solches markiert sind, z.B. in verkehrsberuhigten Bereichen.
- no_parking: eingeschränktes Halteverbot. Das Parken ist verboten, jedoch kann zum Be- und Entladen des Fahrzeuges gehalten werden.
- no_stopping: absolutes Halteverbot. An dieser Stelle darf nur verkehrsbedingt gehalten werden, z.B. im Stau oder an einer roten Ampel.
- fire_lane: gesonderte Fahrspur für Rettungsfahrzeuge wie Rettungswagen, Feuerwehr- und Polizeifahrzeuge. Diese Spur darf nur von solchen befahren werden, und das Halten auf solch einer Spur ist ein noch größerer Verstoß als das Halten im absoluten Halteverbot.

### Position `parking:lane:both|right|left:<Typ>=*|on_street`

- on_street Auf der Straße.
- half_on_kerb Mit einer Fahrzeugseite oder -hälfte auf dem Bordstein oder der Bankette (halb auf dem Bürgersteig).
- on_kerb Mit dem gesamten Fahrzeug auf dem Bordstein oder der Bankette (auf dem Bürgersteig).
- street_side In einer Parkbucht.
- painted_area_only Nur in markierten Bereichen, z. B. auf dem Seitenstreifen.

### Light ?? `parking:lane:right:lit=yes`

### Capacity ?? `parking:lane:right:capacity=9 + parking:lane:right:capacity:disabled=2`

### Condition `parking:condition:both|right|left=<ConditionType>`

- free - Keine Zusätze notwendig.
- ticket - (Wird noch diskutiert) Evtl. durch zusätzliche Attribute wie parking:condition:side:fee_per_hour=1 €.
- disc - Durch hinzufügen der Attribute parking:condition:side:maxstay=2 h kann man die erlaubte Parkzeit von 2 Stunden beschreiben.
- residents - Hinzufügen von parking:condition:Seite:residents=A bedeutet, dass an dieser Stelle nur Anwohner mit Parkausweis A parken dürfen. Das A kann durch die Nummer oder Bezeichnung des vor Ort gültigen Parkausweises, ersetzt werden. Anwohnerparkausweis
- customers - Keine Zusätze notwendig. An dieser Stelle dürfen nur Kunden oder Besucher des Parkplatzbetreibers parken.
- private - Keine Zusätze notwendig. Auf diesem Parkplatz darf nur der Parkplatzbesitzer parken.
- no_parking und no_stopping - Keine Zusätze notwendig.

https://wiki.openstreetmap.org/wiki/DE:Key:parking:lane#Definieren_der_Bedingungen_f.C3.BCr_die_Parkplatznutzung
