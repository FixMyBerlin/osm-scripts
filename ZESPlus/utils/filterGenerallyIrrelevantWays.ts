export const filterGenerallyIrrelevantWays = (feature) => {
  // highway=service wird nicht grundsätzlich ausgeschlossen, da hier möglicherweise service=* Details fehlen und der Weg doch geeignet ist.
  // Kurze Zufahrts- und Zugangswege zu Gebäuden wollen wir ausschließen.
  // Wir prüfen hier aber nicht auf service=driveway, da dieses Attribut manchmal fehlt.
  // Wege zu Grundstücken sind aber meist typischer Weise als serfice oder footway getaggt.
  // Exkurs: Wir dürfen nicht zu offensiv auf Basis der "length" filtern, da klein zerschnittene Straßensegmente sonst gefiltert würden.
  const kurzeGrundstuecksZufahrtenZugaenge =
    ["service", "footway"].includes(feature.properties.highway) &&
    feature.properties["FMC:length"] <= 10.0

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

  return (
    kurzeGrundstuecksZufahrtenZugaenge ||
    privateWays ||
    zufahrten ||
    baustellen ||
    treppen ||
    haltestellen
  )
}
