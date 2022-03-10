import { Feature } from "../../utils/types"
import { highMaxSpeed } from "../utils/highMaxSpeed"
import { considerFeature } from "./considerFeature"
import { typWohnstrasse } from "./typA_Wohnstrasse"

// TYP F – Frei geführt / Fußgängerweg [Außerorts]
export const typFreiGefuehrt = (feature: Feature) => {
  if (!considerFeature(feature)) return false

  const sidepathOrCrossing =
    feature.properties.is_sidepath ||
    feature.properties?.footway === "crossing" ||
    feature.properties?.cycleway === "crossing"

  const includePathTrack =
    ["path", "track", "bridleway", "footway"].includes(
      feature.properties.highway
    ) && !sidepathOrCrossing

  // Fußweg mit Fahrrad frei
  const includeGehwegMitRadwegFrei =
    feature.properties.traffic_sign === "DE:239,1022-10" && !sidepathOrCrossing

  const includeDurchfahrtswege =
    feature.properties.highway === "service" &&
    ["drive-through"].includes(feature.properties.service) &&
    feature.properties.tunnel !== "building_passage"

  const includeServiceWithExplicitAccessYes =
    feature.properties.highway === "service" &&
    feature.properties.access === "yes"

  // We have a few very long service roads that don't fit in any category.
  // Let's treat the as FreiGefuehrt instead of ignoring them.
  // But for simplicity, ignore all typWohnstrasse here.
  const includeVeryLongServiceWays =
    feature.properties.highway === "service" &&
    parseFloat(feature.properties["FMC:length"]) > 600.0 &&
    !typWohnstrasse(feature)

  const includeRadwege =
    feature.properties.highway === "cycleway" &&
    parseFloat(feature.properties["FMC:length"]) > 20.0 &&
    !sidepathOrCrossing

  // Haben Charakter einer Zufahrtsstraße zu Gebäuden; Ähnlich Wohnstraße. Vermutlich als "unclassified" falsch getaggt
  const includeZwischenwege = feature.properties.highway === "pedestrian"

  // We include a few "unclassified" as Sammelstraßen. The rest is FreiGeführt.
  const includeUnclassified =
    !(highMaxSpeed(feature) || feature.properties.surface === "asphalt") &&
    feature.properties.highway === "unclassified"

  return !!(
    includePathTrack ||
    includeGehwegMitRadwegFrei ||
    includeDurchfahrtswege ||
    includeServiceWithExplicitAccessYes ||
    includeVeryLongServiceWays ||
    includeRadwege ||
    includeZwischenwege ||
    includeUnclassified
  )
}
