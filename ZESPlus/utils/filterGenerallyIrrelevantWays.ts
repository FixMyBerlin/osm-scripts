import { Feature } from "./types"

export const filterGenerallyIrrelevantWays = (feature: Feature) => {
  // highway=service wird nicht grundsätzlich ausgeschlossen, da hier möglicherweise service=* Details fehlen und der Weg doch geeignet ist.
  // Kurze Zufahrts- und Zugangswege zu Gebäuden wollen wir ausschließen.
  // Wir prüfen hier aber nicht auf service=driveway, da dieses Attribut manchmal fehlt.
  // Wege zu Grundstücken sind aber meist typischer Weise als serfice oder footway getaggt.
  // Exkurs: Wir dürfen nicht zu offensiv auf Basis der "length" filtern, da klein zerschnittene Straßensegmente sonst gefiltert würden.
  const kurzeGrundstuecksZufahrtenZugaenge =
    ["service", "footway"].includes(feature.properties.highway) &&
    parseFloat(feature.properties["FMC:length"]) <= 10.0

  // Auch 'destination' raus, weil nicht teil der Infrastrutkur
  const privateWays = ["private", "no", "destination"].includes(
    feature.properties.access
  )

  // Grundstückszufahrten ignorieren wir, weil nicht Teil des Netzes
  const zufahrten =
    feature.properties.service === "driveway" ||
    feature.properties.service === "parking_aisle"

  // Construction, Planned ingnorieren wir, weil nicht TEil des Netzes
  const baustellen = ["construction", "planned", "proposed"].includes(
    feature.properties.highway
  )

  // Stufen ignorieren wir, auch wenn sie eine ramp hätten, da sie dann eine Lücke erzeugen und damit eine Planung triggern
  const treppen = feature.properties.highway === "steps"

  // Haltestellen ingorieren wir
  const haltestellen = feature.properties.highway === "platform"

  // A general list of the top40 highway values for BerlinBrandenburg that we do not want to work with.
  // How to get this list:
  // 1. Choose a taginfo instance for your region (Bundesland, Stadt) at https://osm.rlin.eu/geofabrik/
  // 2. Return all values for Key `highway`. The URL filters on 'ways', but the list below does not to cover more edge cases.
  //   https://taginfo.geofabrik.de/europe/germany/brandenburg/keys/highway?filter=ways#values
  //   As JSON: https://taginfo.geofabrik.de/europe/germany/brandenburg/api/4/key/values?key=highway&filter=ways&lang=de&sortname=count&sortorder=desc&page=1&rp=40&qtype=value&format=json_pretty
  const top40FilterList = [
    "street_lamp",
    "bus_stop",
    "traffic_signals",
    "give_way",
    "passing_place",
    "stop",
    "elevator",
    "emergency_access_point",
    "turning_loop",
    "raceway",
    "milestone",
    "speed_camera",
    "corridor",
    "mini_roundabout",
  ].includes(feature.properties.highway)

  return (
    kurzeGrundstuecksZufahrtenZugaenge ||
    privateWays ||
    zufahrten ||
    baustellen ||
    treppen ||
    haltestellen ||
    top40FilterList
  )
}
