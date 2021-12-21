# Extract ShopData to visualize busy areas

This data is used on a heatmap to show areas that require a different infrastructure.

The list of amenity values is based on an extract of the reagion, manually filtered to exclude some POI that are not relevant.

```php
[out:json][timeout:25];
(
  area["boundary"="administrative"]["admin_level"="8"]["name"="Zeuthen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Eichwalde"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schulzendorf"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Wildau"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Königs Wusterhausen"];
  area["boundary"="administrative"]["admin_level"="8"]["name"="Schönefeld"];
)->.searchArea;
(
  node["amenity"~"^(atm|bank|bar|cafe|charging_station|childcare|community_centre|dentist|doctors|driving_school|fast_food|fuel|kindergarten|library|marketplace|nightclub|pharmacy|place_of_worship|post_office|public_bookcase|restaurant|social_facility|swingerclub|townhall|vending_machine|veterinary|)$"](area.searchArea);
);
out body;
>;
out skel qt;
```
