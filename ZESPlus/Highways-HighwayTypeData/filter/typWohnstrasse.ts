import { irrelevanteWege } from "./irrelevanteWege"

// TYP A + B – Wohnweg/Wohnstraße (Erschließungsstraßen)
// Mindset: Wir müssen hier präzise sein, um eine Abgrenung zu TypHauptUndSammelstrasse zu erreichen
export const typWohnstrasse = (feature) => {
  const includeWohnstrassenMitGeringerGeschwindigkeit =
    ["residential", "unclassified"].includes(feature.properties.highway) &&
    feature.properties.maxspeed <= 30

  const includeWohnstrssenMitSchlechterOberflaeche =
    feature.properties.highway === "residential" &&
    ["unpaved", "ground"].includes(feature.properties.sisurfacedewalk)

  // TODO OSM: falsches Tagging "none" way/4935070
  const includeWohnstrassenOhneGehweg =
    feature.properties.highway === "residential" &&
    ["none", "no"].includes(feature.properties.sidewalk)

  // kein lane-marking is indikator für Wohnstraße, ebenso lane=1
  const includeEinspurig =
    feature.properties.highway === "residential" &&
    (feature.properties.lane_markings === "no" ||
      feature.properties.lane === "1")

  const includeSpielstrassen = feature.properties.highway === "living_street"

  // "Nicht" weiter klassifzierte service-straßen die Namen haben verstehen wir als Wohnstraßen
  const includeSpezielleServiceWege =
    feature.properties.highway === "service" &&
    !feature.properties.service &&
    feature.properties.name &&
    feature.properties.tunnel !== "building_passage"

  return (
    !irrelevanteWege(feature) &&
    (includeWohnstrassenMitGeringerGeschwindigkeit ||
      includeWohnstrssenMitSchlechterOberflaeche ||
      includeWohnstrassenOhneGehweg ||
      includeEinspurig ||
      includeSpielstrassen ||
      includeSpezielleServiceWege)
  )
}
