import { gehUndRadwegGemeinsam } from "./gehUndRadwegGemeinsam"
import { considerFeature } from "./considerFeature"
import { radwegBaulichAbgesetzt } from "./radwegBaulichAbgesetzt"

// Small pieces of cycleway that are needed to create a routing network.
// We include them as a spearate category to stress their importance.
// The example show a case where the biker needs to cross into traffic in an unsafe way.
// Example:
//    https://www.openstreetmap.org/way/1013743829
//    https://www.mapillary.com/app/?lat=52.368165501442&lng=13.5959584918&z=17&focus=photo&pKey=850047429274697
// Note, that this cannot catch all those connection ways, like https://www.openstreetmap.org/way/901972206,
//    which is categorized differently, but that is all we can do based on the signage (see pictures) and tagging.
export const radwegVerbindungsstueck = (feature) => {
  if (!considerFeature(feature)) return false
  if (radwegBaulichAbgesetzt(feature)) return false
  if (gehUndRadwegGemeinsam(feature)) return false

  return (
    feature.properties.highway === "cycleway" &&
    parseFloat(feature.properties["FMC:length"]) <= 15.0
  )
}
