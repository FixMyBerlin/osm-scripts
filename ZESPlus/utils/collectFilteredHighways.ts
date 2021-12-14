type FeatureId = `way/${number}` | string

// type FeatureIdWithCategories = {
//   FeatureId: string[]
// }

export let filteredHighwayFeatureIds: FeatureId[] = []

export let filteredHighwayFeatureIdsWithCategories: any = {}

export const collectFilteredHighways = (highways, filterMethodName) => {
  if (filterMethodName.startsWith("TODO")) return

  // A list of FeatureIds ['way/123', 'way/456']
  filteredHighwayFeatureIds = [
    ...filteredHighwayFeatureIds,
    highways.map((feature) => feature.id),
  ]

  // A list of FeatureIds with categories ['way/123': ['highway', 'residential'], 'way/456': ['highway']]
  highways.map((feature) => {
    filteredHighwayFeatureIdsWithCategories[feature.id] = [
      ...(filteredHighwayFeatureIdsWithCategories[feature.id] || []),
      filterMethodName,
    ]
  })
}
