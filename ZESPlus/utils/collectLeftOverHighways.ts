export let leftOverHighwaysFlat = []
export let leftOverHighwaysGrouped = {}

export const collectLeftOverHighways = (highways, filterMethodName) => {
  if (filterMethodName.startsWith("TODO")) return

  leftOverHighwaysFlat = [
    ...leftOverHighwaysFlat,
    highways.map((feature) => feature.id),
  ]
  leftOverHighwaysGrouped[filterMethodName] = highways.map(
    (feature) => feature.id
  )
}
