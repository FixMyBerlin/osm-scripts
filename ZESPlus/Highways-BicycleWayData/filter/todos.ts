import { fahrradstrasse } from "./fahrradstr"
import { fussgaengerzonenWegFahrradFrei } from "./fussgaengerzonenWegFahrradFrei"
import { gehUndRadwegGemeinsam } from "./gehUndRadwegGemeinsam"
import { gehUndRadwegGetrennt } from "./gehUndRadwegGetrennt"
import { gehwegRadfarerFrei } from "./gehwegRadfarerFrei"
import { irrelevanteWege } from "./irrelevanteWege"
import { radfahrstreifen } from "./radfahrstreifen"
import { radwegBaulichAbgesetzt } from "./radwegBaulichAbgesetzt"
import { radwegFreiGefuehrt } from "./radwegFreiGefuehrt"
import { radwegVerbindungsstueck } from "./radwegVerbindungsstueck"
import { verkehrsberuhigterBereichMitFahrradFrei } from "./verkehrsberuhigterBereichMitFahrradFrei"

export const TODO_VerkehrsberuhigterBereich_AccessPruefen = (feature) => {
  if (irrelevanteWege(feature)) return false

  return (
    feature.properties.highway === "living_street" &&
    !verkehrsberuhigterBereichMitFahrradFrei(feature)
  )
}

export const TODO_FussgaengerzonenWeg_AccessPruefen = (feature) => {
  if (irrelevanteWege(feature)) return false

  return (
    feature.properties.highway === "pedestrian" &&
    !fussgaengerzonenWegFahrradFrei(feature)
  )
}
// Fahrrad frei, Zusatzzeichen 1022-10 alleine an einem Weg.
// https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren
// traffic_sign=DE:1022-10
export const TODO_FahrradFrei_CheckTagging = (feature) => {
  if (irrelevanteWege(feature)) return false

  return (
    feature.properties.traffic_sign === "DE:1022-10" &&
    !gehUndRadwegGemeinsam(feature)
  )
}

// Eigenständiger Radweg (aber nicht als Fahrradstraße, oder Radfahrstreifen)
// https://wiki.openstreetmap.org/wiki/DE:Tag:highway=cycleway
export const TODO_RadwegUnspezifisch = (feature) => {
  if (irrelevanteWege(feature)) return false
  if (gehUndRadwegGemeinsam(feature)) return false
  if (gehUndRadwegGetrennt(feature)) return false
  if (gehwegRadfarerFrei(feature)) return false
  if (radfahrstreifen(feature)) return false
  if (radwegBaulichAbgesetzt(feature)) return false
  if (radwegFreiGefuehrt(feature)) return false
  if (radwegVerbindungsstueck(feature)) return false

  return feature.properties.highway === "cycleway"
}

// Getrennter Geh- und Radweg / Getrennter Rad- und Gehweg muss seggregated=yes haben
// traffic_sign=DE:241-30, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:241-30
// traffic_sign=DE:241-31, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:241-31
export const TODO_TrafficSignRequiresSeggregationYes = (feature) => {
  if (irrelevanteWege(feature)) return false

  return (
    feature.properties.traffic_sign?.startsWith("DE:241") &&
    feature.properties.segregated === "no"
  )
}

// Gemeinsamer Geh- und Radweg
// traffic_sign=DE:240, https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:240
export const TODO_TrafficSignRequiresSeggregationNo = (feature) => {
  if (irrelevanteWege(feature)) return false

  return (
    feature.properties.traffic_sign?.startsWith("DE:240") &&
    feature.properties.segregated === "yes"
  )
}

export const TODO_MissingSeggregationForTrafficSign = (feature) => {
  if (irrelevanteWege(feature)) return false

  return (
    (feature.properties.traffic_sign?.startsWith("DE:240") &&
      !feature.properties.segregated) ||
    (feature.properties.traffic_sign?.startsWith("DE:241") &&
      !feature.properties.segregated)
  )
}

export const TODO_AreaHighwaysCheckIfSeparatelyMappedWaysExist = (feature) => {
  if (irrelevanteWege(feature)) return false

  return feature.properties.highway && feature.properties.area === "yes"
}
