# Prototyping

This is the prototype analysis of the data base on an styled https://overpass-turbo.eu/ query which we turned into our filter methods afterwards.

```php
[out:json][timeout:25];
(
  area["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
)->.searchArea;
(
  way["highway"](area.searchArea);
  node["shop"](area.searchArea);
  /*node["amenity"](area.searchArea); -- use this to get a full list of amenity values and filter those that we want for the query below*/
  node["amenity"~"^(atm|bank|bar|cafe|charging_station|childcare|community_centre|dentist|doctors|driving_school|fast_food|fuel|kindergarten|library|marketplace|nightclub|pharmacy|place_of_worship|post_office|public_bookcase|restaurant|social_facility|swingerclub|townhall|vending_machine|veterinary|)$"](area.searchArea);
);
out body;
>;
out skel qt;

{{style:
/* Debug: All that is not ways is red */
/* Red = Error, to be checked */
/*node, relation {
  color: red;
  fill-color: red;
  width: 20;
}*/

/* Default */
way {
  /* Red = TODO, to be treated with a more specific color below */
  color: red;
  fill-color: red;
  width: 10;
}
node[shop] {
  color: black;
  fill-color: black;
  width: 10;
  icon-image: url('icons/maki/shop-18.png');
  icon-width: 18;
}
node[amenity] {
  color: orange;
  fill-color: orange;
  width: 10;
  icon-image: url('icons/maki/shop-18.png');
  icon-width: 18;
}

/* IGNORE */
/* Private Wege ignorieren, weil sie nicht Teil des Netzes sind */
way[access=private],
way[access=no],
way[access=destination], /* destination raus, weil nicht teil der infrastrutkur */
/* Gehwege ignorieren, weil uns die Straße interessiert */
way[footway=sidewalk][is_sidepath=yes],
way[footway=sidewalk],
/* Grundstückszufahrten ignorieren wir, weil nicht Teil des Netzes */
way[service=driveway],
way[service=parking_aisle],
/* Construction, Planned ingnorieren wir, weil nicht TEil des Netzes */
way[highway=construction],
way[highway=planned]
/* Stufen ignorieren wir, auch wenn sie eine ramp hätten, da sie dann eine Lücke erzeugen und damit eine Planung triggern */
way[highway=steps]
{
  color: gray;
  width: 1;
}

/* UNKLAR; https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dunclassified
way[highway=unclassified] {
  color: red;
  width: 20;
}*/

/* TYP A + B – Wohnweg/Wohnstraße (Erschließungsstraßen) */
way[highway=residential][maxspeed=30],
way[highway=unclassified][maxspeed=30],
way[highway=residential][maxspeed=20],
way[highway=residential][surface=unpaved],
/* TODO falsches Tagging "none" way/4935070 */
way[highway=residential][sidewalk=none],
/* kein lane-marking is indikator für Wohnstraße */
way[highway=residential][lane_markings=no],
/* TODO Typ A, B müssen wir besser differenzieren */
way[highway=living_street],
/* Nicht weiter klassifzierte service-straßen die Namen haben verstehen wir als Wohnstraßen */
way[highway=service][!service][name]
{
  color: green;
  width: 2;
}

/* TYP C – Haupt-/Sammel-[Wohn]straße */
/* residential + Radwege links/rechts ist indikator Sammelstraße */
/* TODO: Eine Wohnstraße ohne Gehweg mit maxspeed 50? way/4920400 */
way[highway=residential][cycleway:both=separate],
way[highway=residential][maxspeed=50],
way[highway=unclassified][maxspeed=50],
way[highway=unclassified][surface=asphalt],
way[highway=secondary][maxspeed=50],
/* Spezial Tagging für getrennte Speed Limits in https://www.openstreetmap.org/way/164719884 */
way[highway=secondary][maxspeed:backward=100]
{
  color: purple;
  width: 2;
}


/* TYP D – „Geschäftsstraße“ */



/* TYP E – Landes-/Kreisstraße [Außerorts] */
/* K 6161 ist Landstraße und führt dann in die Stadt;

TODO: Innerhalb der Stadt müssten wir sie manuell umkategorisieren und als Hauptstraße taggen. */
way[highway=tertiary] {
  color: teal;
}

/* TYP F – Frei geführt / Fußgängerweg [Außerorts] */
way[highway=path],
way[highway=track][access!=private],
way[highway=track][access!=no],
/* Fußweg mit Fahrrad frei */
way[highway][footway!=sidewalk][traffic_sign=DE:239,1022-10],
/* TODO: Durchfahrtswege?, https://www.openstreetmap.org/way/672629306 */
way[highway=service][service=drive-through],
/* Radwege */
way[highway=cycleway],
/* Haben Charakter einer Zufahrtsstraße zu Gebäuden; Ähnlich Wohnstraße. Vermutlich als "unclassified" falsch getaggt */
way[highway=unclassified][surface=unpaved],
way[highway=footway][bicycle=yes][footway!=sidewalk],
way[highway=pedestrian],
way[highway=footway][is_sidepath!=yes],
way[highway=footway][footway!=sidewalk]
{
  color: darkblue;
  width: 2;
}

/* TODO: Wenn highway=footway UND länge < 10 meter, dann ignorieren */

}}
```
