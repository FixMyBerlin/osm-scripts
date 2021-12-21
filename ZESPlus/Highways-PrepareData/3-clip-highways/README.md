# This step is TODO.

The idea is, to automatically clip the downloaded and transposed data to the AreaOfInterest. However, it does not look like there is a node library that can to this, yet.

https://github.com/anandthakker/geojson-clip-polygon hasn't bee updated since 2015

Ideally, we could specify a clip when we download the data from overpass. There is an issue for that at https://github.com/drolbr/Overpass-API/issues/644.

Alternatives

- Move this step to QGIS
- Use a script based on something like https://giswiki.hsr.ch/HowTo_OGR2OGR https://gdal.org/programs/ogr2ogr.html
