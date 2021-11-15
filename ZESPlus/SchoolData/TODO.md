[out:json][timeout:25];
(
nwr["amenity"="childcare"]({{bbox}});
nwr["amenity"="college"]({{bbox}});
nwr["amenity"="kindergarten"]({{bbox}});
nwr["amenity"="research_institute"]({{bbox}});
nwr["amenity"="school"]({{bbox}});
nwr["amenity"="university"]({{bbox}});
);
out center;

> ;
> out skel qt;
