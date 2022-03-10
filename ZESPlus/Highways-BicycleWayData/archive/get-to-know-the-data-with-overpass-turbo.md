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
);
out body;
>;
out skel qt;

{{style:
/* Debug: All that is not ways is red */
node, relation {
  /* Red = Error, to be checked */
  color: red;
  fill-color: red;
  width: 20;
}
/* Default */
way {
  /* Red = TODO, to be treated with a more specific color below */
  color: red;
  fill-color: red;
  width: 10;
}

/* Remove private access, driveways */
way[access=private],
way[service=driveway],
way[highway=service],
/* Remove sidewalks without bike rules */
way[footway=sidewalk],
/* Remove path and track */
way[highway=path],
way[highway=track],
/* Remove Fußwege, https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dfootway */
way[highway=footway],
way[highway=steps],
/* Remove Construction, Proposed */
way[highway=construction],
way[highway=proposed],
/* Autobahn und Co */
way[highway=motorway_link],
way[highway=motorway]
{
  /* Grau = Not relevant for our analysis */
  color: gray;
  width: 1;
}

/* Straße ohne Radweg */
way[highway=residential][cycleway:both=no],
way[highway=unclassified][cycleway:both=no],
way[highway=secondary][cycleway:both=no],
way[highway=residential],
way[highway=unclassified],
way[highway=secondary],
way[highway=tertiary],
/* Fußgängerzone benötigt explizite Fahrradfreigabe
https://wiki.openstreetmap.org/wiki/Tag:highway%3Dpedestrian#Vehicle_access */
/* way[highway=pedestrian][bicycle!~.*], this does not work in MapCSS. It says "tag bicycle exists and is not empty" */
way[highway=pedestrian],
way[highway=pedestrian][bicycle=no]
{
  /* Some cycle relevance, but no specific tagging */
  color: lightgray;
  width: 2;
}

/* Straßen mit Radweg, die wir aber ignorieren, weil der Radweg separat gemapped ist */
way[highway][cycleway:right=separate],
way[highway][cycleway:left=separate],
way[highway][cycleway:both=separate],
way[bicycle=use_sidepath]
/* TODO Tagging Frage: Müsste das bicycle=use_sidepath nicht auch an den Cases oben stehen? Oder anders, müsste hier unten nicht auch cycleway:right:separate stehen? https://www.openstreetmap.org/way/38234312 */
{
  /* Grau = Not relevant for our analysis */
  color: darkgrey;
  width: 1;
}

/* Fußgängerzone mit Radfreigabe */
way[highway=pedestrian][bicycle=yes],
/* Spielstraße, die implizit Radfreigabe hat
https://wiki.openstreetmap.org/wiki/DE:Tag:highway%3Dliving_street */
way[highway=living_street][bicycle!=no]
{
  color: purple;
  width: 3;
}

/* Radwege */
way[highway=cycleway] {
  color: green;
  width: 3;
}
/* baulich abgesetzter Radweg
Tagging-Stil: Als Teil einer highway-Geometrie gemapped.
*/
way[cycleway:right=track],
way[cycleway:left=track]
{
  color: indigo;
  width: 3;
}

/* Fußweg, Fahrrad frei
traffic_sign=DE:239,1022-10
https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:239
*/
way[highway=footway][bicycle=yes],
way[sidewalk:right:bicycle=yes],
way[sidewalk:left:bicycle=yes],
way[sidewalk:both:bicycle=yes]
{
  color: navy;
  width: 3;
}
/* Gemeinsamer Geh- und Radweg
traffic_sign=DE:240
https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:240
*/
way[highway][bicycle=designated][foot=designated][segregated=no] {
  color: teal;
  width: 3;
}
/* Getrennter Geh- und Radweg / Rad- und Gehweg
https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:241-30
https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:241-30
*/
way[highway][bicycle=designated][foot=designated][segregated=yes] {
  color: blueviolet;
  width: 3;
}
}}
```
