export const addCustomProperties = (features) => {
  features.forEach((feature) => {
    // Add category to filtered data. We do this here, because we have the methodName here.
    // Add osm-link to data for convenience.
    feature.properties["FMC:highwayCategory"] = features.name;

    feature.properties[
      "FMC:linkToOsmWebsite"
    ] = `https://www.openstreetmap.org/${feature.id}`;

    const latLonInMiddle =
      feature.geometry.coordinates[
      Math.floor(feature.geometry.coordinates.length - 1 / 2)
      ];
    feature.properties[
      "FMC:linkToMapillary"
    ] = `https://www.mapillary.com/app/?lat=${latLonInMiddle[1]}&lng=${latLonInMiddle[0]}&z=16&focus=map`;
  });
}
