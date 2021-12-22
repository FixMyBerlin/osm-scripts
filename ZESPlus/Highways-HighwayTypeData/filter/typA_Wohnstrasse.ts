import { irrelevanteWege } from "./irrelevanteWege"
import { typHauptUndSammelstrasse } from "./typC_HauptUndSammelstrasse"

// TYP A + B – Wohnweg/Wohnstraße (Erschließungsstraßen)
// Mindset: Wir müssen hier präzise sein, um eine Abgrenung zu TypHauptUndSammelstrasse zu erreichen
export const typWohnstrasse = (feature) => {
  if (irrelevanteWege(feature)) return false
  if (typHauptUndSammelstrasse(feature)) return false

  const byType = ["residential", "living_street"].includes(
    feature.properties.highway
  )

  const serviceWithName =
    feature.properties.highway === "service" &&
    feature.properties.name &&
    // Which we have in typFreiGefuehrt()
    feature.properties.service !== "drive-through"

  const serviceWithMaxspeed =
    feature.properties.highway === "service" &&
    feature.properties.maxspeed === "30"

  return byType || serviceWithName || serviceWithMaxspeed

  // const includeWohnstrassenMitGeringerGeschwindigkeit =
  //   ["residential", "unclassified"].includes(feature.properties.highway) &&
  //   feature.properties.maxspeed <= 30

  // const includeWohnstrssenMitSchlechterOberflaeche =
  //   feature.properties.highway === "residential" &&
  //   ["unpaved", "ground"].includes(feature.properties.sisurfacedewalk)

  // // TODO OSM: falsches Tagging "none" way/4935070
  // const includeWohnstrassenOhneGehweg =
  //   feature.properties.highway === "residential" &&
  //   ["none", "no"].includes(feature.properties.sidewalk)

  // // kein lane-marking is Indikator für Wohnstraße, ebenso lane=1
  // const includeEinspurig =
  //   feature.properties.highway === "residential" &&
  //   (feature.properties.lane_markings === "no" ||
  //     feature.properties.lane === "1")

  // const includeSpielstrassen = feature.properties.highway === "living_street"

  // // "Nicht" weiter klassifzierte service-straßen die Namen haben verstehen wir als Wohnstraßen
  // const includeSpezielleServiceWege =
  //   feature.properties.highway === "service" &&
  //   !feature.properties.service &&
  //   feature.properties.name &&
  //   feature.properties.tunnel !== "building_passage"

  // return (
  //   !irrelevanteWege(feature) &&
  //   (includeWohnstrassenMitGeringerGeschwindigkeit ||
  //     includeWohnstrssenMitSchlechterOberflaeche ||
  //     includeWohnstrassenOhneGehweg ||
  //     includeEinspurig ||
  //     includeSpielstrassen ||
  //     includeSpezielleServiceWege)
  // )
}
