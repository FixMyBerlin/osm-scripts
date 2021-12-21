import { irrelevanteWege } from "./irrelevanteWege"

// Stufen
// … können in Theorie Rampen-Tags haben, die eine Art Radinfrastruktur darstellen.
// Aber für die Planung wollen wir dies nicht zu fein filtern da jede dieser Situationen einzeln geprüft werden muss
// um eine möglichst gute Lösung für den Radverkehr zufinden.
export const stufen = (feature) => {
  if (irrelevanteWege(feature)) return false

  return feature.properties.highway === "steps"
}
